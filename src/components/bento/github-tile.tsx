import { LuArrowUpRight } from "react-icons/lu";
import { getActivity } from "@/lib/github";
import { site } from "@/content/site";

const LEVEL_COLORS = ["#1e293b", "#0e4429", "#006d32", "#26a641", "#39d353"];

const dateFormat = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
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
        <div className="min-w-0">
          <h2 className="text-base font-bold leading-tight text-white xl:text-lg">GitHub activity</h2>
          <p className="mt-1 text-xs text-slate-300 xl:text-[13px]">
            {activity ? `${plural(activity.totalLastYear)} in the last year` : "Activity couldn't be loaded"}
            {streak > 0 && (
              <>
                , with a{" "}
                <span className="font-semibold text-signal">{streak.toLocaleString("en-US")}-day streak</span>
              </>
            )}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden items-center gap-1 text-[11px] text-slate-400 sm:flex" aria-hidden>
            <span>Less</span>
            {LEVEL_COLORS.map((c) => (
              <span key={c} className="size-[var(--cell)] rounded-[3px] border border-white/5" style={{ background: c }} />
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

      {activity ? (
        <div className="my-auto min-h-0 overflow-x-auto py-0.5 [direction:rtl]">
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
                  <span
                    key={day.date}
                    title={`${plural(day.count)} on ${fmt(day.date)}`}
                    className="size-[var(--cell)] rounded-[3px] border border-white/5 transition-transform duration-150 hover:scale-[1.35] hover:border-white/60"
                    style={{ background: LEVEL_COLORS[Math.min(Math.max(day.level, 0), 4)] }}
                  />
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

      <p className="mt-2 truncate text-[11px] text-slate-400 xl:text-xs">
        {activity && busiest && busiest.count > 0
          ? `Busiest day was ${fmt(busiest.date)} with ${plural(busiest.count)}.`
          : `Matches the public calendar on @${site.githubUser}'s GitHub profile.`}
      </p>
    </section>
  );
}
