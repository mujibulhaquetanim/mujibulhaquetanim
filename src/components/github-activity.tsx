import { getActivity } from "@/lib/github";
import { site } from "@/content/site";

const LEVELS = [
  "bg-line",
  "bg-cobalt/30",
  "bg-cobalt/55",
  "bg-cobalt/80",
  "bg-cobalt",
];

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const fmt = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

export async function GithubActivity() {
  const activity = await getActivity(site.githubUser);
  const profile = `https://github.com/${site.githubUser}`;

  if (!activity) {
    return (
      <p className="text-ink-2">
        The contribution calendar couldn&apos;t be loaded. It&apos;s always on{" "}
        <a href={profile} className="link text-ink" target="_blank" rel="noopener noreferrer">
          my GitHub profile
        </a>
        .
      </p>
    );
  }

  const { weeks, totalLastYear, streak } = activity;
  // Only mention the streak once it's long enough to mean something.
  const showStreak = streak.days >= 7 && streak.since;

  return (
    <div>
      <p className="max-w-[60ch] text-lg">
        {totalLastYear.toLocaleString("en-US")} contributions in the last year
        {showStreak ? (
          <>
            , and at least one every day for {streak.days.toLocaleString("en-US")} days, since{" "}
            {fmt(streak.since!)}.
          </>
        ) : (
          "."
        )}
      </p>

      <div
        role="img"
        aria-label={`Contribution calendar: ${totalLastYear} contributions in the last year`}
        className="mt-6 grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
      >
        {weeks.flatMap((week) =>
          week.map((day) => (
            <span
              key={day.date}
              title={`${day.count} on ${fmt(day.date)}`}
              className={`aspect-square rounded-[2px] ${LEVELS[Math.min(Math.max(day.level, 0), 4)]}`}
            />
          )),
        )}
      </div>

      <p className="mt-3 text-sm text-ink-2">
        From{" "}
        <a href={profile} className="link" target="_blank" rel="noopener noreferrer">
          github.com/{site.githubUser}
        </a>
        , refreshed daily.
      </p>
    </div>
  );
}
