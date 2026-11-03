"use client";

import { site } from "@/content/site";
import { useMinute } from "@/lib/use-minute";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

export function LocalTime() {
  const now = useMinute();
  const time = now && formatter.format(now);

  return (
    <span className="tabular-nums">
      {time ?? "--:--"} in Chattogram (UTC+6)
    </span>
  );
}
