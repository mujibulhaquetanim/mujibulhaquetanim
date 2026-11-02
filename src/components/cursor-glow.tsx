"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/lib/theme";

// Kinetic theme only: a soft glow that trails the mouse. Skipped for touch and reduced motion.
export function CursorGlow() {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const active = theme === "kinetic" && !reduceMotion;

  useEffect(() => {
    if (!active || !matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = innerWidth / 2;
    let y = innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    // Ease toward the pointer each frame so the glow lags behind it.
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    el.style.opacity = "1";
    addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      el.style.opacity = "0";
    };
  }, [active]);

  if (!active) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 -z-10 size-[400px] rounded-full opacity-0 blur-3xl transition-opacity duration-500"
      style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)" }}
    />
  );
}
