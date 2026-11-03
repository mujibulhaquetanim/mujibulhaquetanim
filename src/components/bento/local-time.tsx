"use client";

import { LuMapPin, LuMoon, LuSun } from "react-icons/lu";
import { site } from "@/content/site";
import { useMinute } from "@/lib/use-minute";

const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: site.timeZone });
const hourFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: site.timeZone });

// Location plus a live local clock, so remote teams can see the time-zone overlap.
export function LocalTime() {
  const now = useMinute();
  const hour = now ? Number(hourFormat.format(now)) : 12;
  const isDay = hour >= 6 && hour < 18;
  const DayIcon = isDay ? LuSun : LuMoon;

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-300 xl:text-xs">
      <span className="inline-flex items-center gap-1">
        <LuMapPin aria-hidden className="size-3.5" />
        Chattogram, BD
      </span>
      <span aria-hidden className="text-slate-500">
        ·
      </span>
      <span className="inline-flex items-center gap-1">
        <DayIcon aria-hidden className={`size-3.5 ${isDay ? "text-amber-300" : "text-sky-300"}`} />
        <time dateTime={now?.toISOString()} className="tabular-nums">
          {now ? timeFormat.format(now) : "--:--"}
        </time>
        <span className="text-slate-400">(UTC+6)</span>
      </span>
    </p>
  );
}
