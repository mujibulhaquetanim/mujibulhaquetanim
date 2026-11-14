import { LuArrowUpRight } from "react-icons/lu";
import { getActivity } from "@/lib/github";
import { site } from "@/content/site";

// Contribution levels 0-4; colours and cell styles are .gh-cell in globals.css.
const LEVELS = [0, 1, 2, 3, 4];
const level = (n: number) => Math.min(Math.max(n, 0), 4);

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const fmt = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
const plural = (n: number) => `${n.toLocaleString("en-US")} ${n === 1 ? "contribution" : "contributions"}`;

export async function GithubTile() {
  const activity = await getActivity(site.githubUser);
  const profile = `https://github.com/${site.githubUser}`;
  const busiest = activity?.weeks.flat().reduce((best, d) => (d.count > best.count ? d : best));
  // Only mention the streak once it's long enough to mean something.
  const streak = activity && activity.streak.days >= 7 ? activity.streak.days : 0;

  return (
    <section
      aria-label="GitHub activity"
      className="tile flex h-full w-full flex-col overflow-hidden p-4 text-slate-100 [--cell:10px] xl:p-5 xl:[--cell:12px] 2xl:[--cell:14px]"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="min-w-0 text-base font-bold leading-tight text-white xl:text-lg">GitHub activity</h2>
        <div className="flex shrink-0 items-center gap-3">
          {/* The legend only means something next to a calendar; the failure note below explains itself. */}
          <div className={`hidden items-center gap-1 text-[11px] text-slate-300 ${activity ? "sm:flex" : ""}`} aria-hidden>
            <span>Less</span>
            {LEVELS.map((l) => (
              <span key={l} className="gh-cell" data-l={l} />
            ))}
            <span>More</span>
          </div>
          <a
            href={profile}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-0.5 border-b border-slate-300/30 pb-0.5 text-xs text-slate-200 transition-colors hover:border-white hover:text-white xl:text-[13px]"
          >
            View profile
            <LuArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 ease-out-quint group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        </div>
      </div>

      {/* The year in three figures, above the calendar they summarise. */}
      {activity && (
        <dl className="mb-3 grid grid-cols-3 gap-2 short:mb-2">
          {[
            { term: "Contributions in the last year", value: activity.totalLastYear.toLocaleString("en-US") },
            ...(streak > 0 ? [{ term: "Day streak", value: streak.toLocaleString("en-US"), signal: true }] : []),
            ...(busiest && busiest.count > 0
              ? [{ term: `Busiest day, ${shortDate.format(new Date(`${busiest.date}T00:00:00Z`))}`, value: busiest.count.toLocaleString("en-US") }]
              : []),
          ].map(({ term, value, signal }) => (
            <div key={term} className="flex min-w-0 flex-col-reverse gap-1 border-l border-white/10 pl-3">
              <dt className="text-[10px] leading-tight text-slate-300 xl:text-xs">{term}</dt>
              <dd
                className={`font-[family-name:var(--font-bricolage)] text-xl font-bold leading-none tracking-tight xl:text-3xl short:text-xl ${
                  signal ? "text-signal" : "text-white"
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {activity ? (
        <div className="mt-auto min-h-0 overflow-x-auto py-0.5 [direction:rtl]">
          {/* rtl keeps the most recent weeks in view when the calendar is wider than the tile */}
          <div
            role="img"
            aria-label={`Contribution calendar: ${plural(activity.totalLastYear)} in the last year`}
            className="grid w-max grid-flow-col gap-[3px] [direction:ltr]"
          >
            {activity.weeks.map((week, i) => (
              <div
                key={week[0].date}
                className="cell-in grid grid-rows-[repeat(7,var(--cell))] gap-[3px]"
                style={{ animationDelay: `${i * 12}ms` }}
              >
                {week.map((day) => (
                  <span key={day.date} title={`${plural(day.count)} on ${fmt(day.date)}`} className="gh-cell" data-l={level(day.level)} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="my-auto rounded-xl border border-dashed border-white/15 p-4 text-center text-sm text-slate-200">
          GitHub didn&apos;t respond. The calendar is always on{" "}
          <a href={profile} className="underline underline-offset-4" target="_blank" rel="noopener noreferrer">
            my profile
          </a>
          .
        </p>
      )}

    </section>
  );
}
