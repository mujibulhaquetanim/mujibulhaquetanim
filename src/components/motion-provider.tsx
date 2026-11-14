"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

// Visitors who ask for reduced motion get no movement from motion components (tabs,
// copy feedback, the message trace); opacity fades still run, as the library intends.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
