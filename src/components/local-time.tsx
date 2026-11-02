"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: site.timeZone,
});

// Ticks once a minute. The server snapshot is null so prerendering never reads the clock.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}
const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => null;

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <span className="tabular-nums">
      {time ?? "--:--"} in Chattogram (UTC+6)
    </span>
  );
}
