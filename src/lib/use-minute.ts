"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}
// Rounded to the minute so the snapshot stays stable between ticks.
const getSnapshot = () => Math.floor(Date.now() / 60_000);
// Null on the server, so prerendering never reads the clock.
const getServerSnapshot = () => null;

// The current time to the minute, updated while the page is open; null until hydrated.
export function useMinute(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date(minute * 60_000);
}
