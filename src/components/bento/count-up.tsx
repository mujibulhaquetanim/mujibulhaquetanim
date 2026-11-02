"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Counts from 0 to `to` the first time it scrolls into view.
export function CountUp({ to, suffix = "", duration = 1.1 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // Reduced motion jumps straight to the number. Rendering `to` directly instead would
    // differ from the server's 0 and break hydration.
    const controls = animate(0, to, {
      duration: reduceMotion ? 0 : duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}
