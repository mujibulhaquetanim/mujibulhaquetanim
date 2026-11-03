import { cacheLife } from "next/cache";
import { site } from "@/content/site";
// Build workers fetch the calendar too and don't run instrumentation; see the module.
import "@/lib/network";

export type Day = { date: string; count: number; level: number };

export type Activity = {
  weeks: Day[][];
  totalLastYear: number;
  streak: { days: number; since: string | null };
};

const DAY_MS = 86_400_000;
const isoDay = (d: Date) => d.toISOString().slice(0, 10);

// "TypeError: fetch failed" alone says little; the network reason is in its cause, which
// is an AggregateError (one error per address tried) when every address fails.
function describe(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const parts = (e: unknown): string[] => {
    if (e instanceof AggregateError) return e.errors.flatMap(parts);
    if (!(e instanceof Error)) return [];
    const code = (e as Error & { code?: string }).code;
    return [code ? `${code} ${e.message}`.trim() : e.message];
  };
  const reasons = parts(error.cause).filter(Boolean);
  return `${error.name}: ${error.message}${reasons.length ? ` (${reasons.join("; ")})` : ""}`;
}

// One request to the contributions API; null on any failure, never throws. Failures are
// logged with their reason, since the page itself only shows a generic fallback.
async function fetchContributions(user: string, range: "all" | "last"): Promise<Day[] | null> {
  const started = Date.now();
  const fail = (reason: string) => {
    console.warn(`[github] y=${range} failed after ${Date.now() - started} ms: ${reason}`);
    return null;
  };
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=${range}`,
      { signal: AbortSignal.timeout(8000) },
    );
    if (!res.ok) return fail(`HTTP ${res.status}`);
    const data: { contributions?: Day[] } = await res.json();
    return Array.isArray(data.contributions) && data.contributions.length > 0 ? data.contributions : fail("no contributions in the response");
  } catch (error) {
    return fail(describe(error));
  }
}

// Full public history, so a streak longer than a year is measured correctly. That
// response is large and the API (a free community service) sometimes times out on it,
// so the last year alone is the fallback: enough for the calendar and the total. Both
// are requested at once (at most one 8 s wait, not two in a row). A full result is
// cached for a day, a last-year-only one for hours so the streak comes back soon, and a
// failure for minutes, so the page shows a fallback without hammering the API, and
// without failing the build.
export async function getActivity(user: string): Promise<Activity | null> {
  "use cache";

  const [all, last] = await Promise.all([fetchContributions(user, "all"), fetchContributions(user, "last")]);
  const contributions = all ?? last;
  if (!contributions) {
    cacheLife("minutes");
    return null;
  }
  if (all) cacheLife("days");
  else cacheLife("hours");

  // The API pads the current year with future dates; "today" is in the profile's time zone.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: site.timeZone }).format(new Date());
  const byDate = new Map(
    contributions.filter((d) => d.date <= today).map((d) => [d.date, d]),
  );
  const end = new Date(`${today}T00:00:00Z`);
  const countOn = (t: number) => byDate.get(isoDay(new Date(t)))?.count ?? 0;

  // 53 Sunday-first weeks ending today.
  const start = new Date(end.getTime() - 364 * DAY_MS);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());
  const days: Day[] = [];
  for (let t = start.getTime(); t <= end.getTime(); t += DAY_MS) {
    const date = isoDay(new Date(t));
    days.push(byDate.get(date) ?? { date, count: 0, level: 0 });
  }
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  let totalLastYear = 0;
  for (let t = end.getTime() - 364 * DAY_MS; t <= end.getTime(); t += DAY_MS) {
    totalLastYear += countOn(t);
  }

  // Today may simply not have a commit yet, so a streak can end today or yesterday.
  let cursor = end.getTime();
  if (countOn(cursor) === 0) cursor -= DAY_MS;
  let streak = 0;
  let since: string | null = null;
  while (countOn(cursor) > 0) {
    streak += 1;
    since = isoDay(new Date(cursor));
    cursor -= DAY_MS;
  }
  // With only the last year, a streak that runs back past the first day of data has an
  // unknown length; leave it out rather than show a number that's too small.
  const earliest = contributions.reduce((min, d) => (d.date < min ? d.date : min), today);
  if (!all && isoDay(new Date(cursor)) < earliest) {
    streak = 0;
    since = null;
  }

  return { weeks, totalLastYear, streak: { days: streak, since } };
}
