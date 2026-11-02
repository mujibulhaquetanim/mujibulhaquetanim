"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

const noop = () => () => {};

/*
  motion's useReducedMotion reads the media query on the first client render, so markup
  that depends on it differs from the server's and breaks hydration. This reports false
  until hydration is done, then the real preference.
*/
export function useHydratedReducedMotion() {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  return hydrated && !!reduce;
}
