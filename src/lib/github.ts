import { cacheLife } from "next/cache";
import { site } from "@/content/site";

export type Day = { date: string; count: number; level: number };

export type Activity = {
  weeks: Day[][];
  totalLastYear: number;
  streak: { days: number; since: string | null };
};

const DAY_MS = 86_400_000;
const isoDay = (d: Date) => d.toISOString().slice(0, 10);

// Full public history; the whole history is needed so a streak longer than a year is
// measured correctly. Success is cached for a day. A failure (the API is a free
// community service and does time out) is cached for minutes, so the page shows a
// fallback without hammering the API, and without failing the build.
export async function getActivity(user: string): Promise<Activity | null> {
  "use cache";

  let data: { contributions?: Day[] };
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=all`,
      { signal: AbortSignal.timeout(8000) },
    );
    data = res.ok ? await res.json() : {};
  } catch {
    data = {};
  }
  if (!Array.isArray(data.contributions) || data.contributions.length === 0) {
    cacheLife("minutes");
    return null;
  }
  cacheLife("days");

  // The API pads the current year with future dates; "today" is in the profile's time zone.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: site.timeZone }).format(new Date());
  const byDate = new Map(
    data.contributions.filter((d) => d.date <= today).map((d) => [d.date, d]),
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

  return { weeks, totalLastYear, streak: { days: streak, since } };
}
