"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "@/lib/theme";

const INTERACTIVE = "a, button, [role='tab'], summary";
const MAGNETIC = ".btn, .btn-press, header a, header button";

/*
  Kinetic theme only, and only for a fine pointer without reduced motion:
    - a soft glow that trails the pointer
    - a ring cursor in difference blend mode that swells over anything clickable
    - magnetic buttons and header links that lean toward the pointer
  The native cursor stays, so nothing about pointing or text selection changes.
*/
export function KineticFx() {
  const theme = useTheme();
  const reduceMotion = useReducedMotion();
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const active = theme === "kinetic" && !reduceMotion;

  useEffect(() => {
    if (!active || !matchMedia("(pointer: fine)").matches) return;
    const glowEl = glow.current;
    const ringEl = ring.current;
    if (!glowEl || !ringEl) return;

    let x = innerWidth / 2;
    let y = innerHeight / 3;
    let gx = x;
    let gy = y;
    let tx = x;
    let ty = y;
    let raf = 0;
    let pulled: HTMLElement | null = null;

    const release = () => {
      if (pulled) pulled.style.translate = "";
      pulled = null;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as Element;
      if (target.closest(INTERACTIVE)) ringEl.dataset.hover = "";
      else delete ringEl.dataset.hover;

      const magnet = target.closest<HTMLElement>(MAGNETIC);
      if (magnet !== pulled) release();
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.style.translate = `${dx * 0.22}px ${dy * 0.3}px`;
        pulled = magnet;
      }
    };
    const onLeave = () => {
      release();
      ringEl.style.opacity = "0";
    };
    const onEnter = () => (ringEl.style.opacity = "1");

    // The ring follows closely, the glow lazily; both ease toward the pointer each frame.
    const loop = () => {
      x += (tx - x) * 0.3;
      y += (ty - y) * 0.3;
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      ringEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      glowEl.style.transform = `translate3d(${gx - 200}px, ${gy - 200}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    glowEl.style.opacity = "1";
    ringEl.style.opacity = "1";
    addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    document.documentElement.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(raf);
      release();
    };
  }, [active]);

  if (!active) return null;
  return (
    <>
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-10 size-[400px] rounded-full opacity-0 blur-3xl transition-opacity duration-500"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 65%)" }}
      />
      <div ref={ring} aria-hidden className="kinetic-cursor opacity-0" />
    </>
  );
}
