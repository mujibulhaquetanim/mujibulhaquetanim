"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme";
import { useHydratedReducedMotion } from "@/lib/use-reduced-motion";

const INTERACTIVE = "a, button, [role='tab'], summary";
const MAGNETIC = ".btn, .btn-press, header a, header button";
// Cards that open a page: the ring becomes a solid "Open" disc over them.
const OPENS = "a.group";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// One block's entrance. Slow on purpose, and time-based rather than scroll-linked, so a
// fast scroll doesn't fast-forward it. Fill "backwards" holds the first frame through the
// delay and leaves nothing behind afterwards, so hover effects keep working.
function enter(el: Element, delay: number) {
  const play = (target: Element | null, keyframes: Keyframe[], duration: number, offset = 0) =>
    target?.animate(keyframes, { duration, delay: delay + offset, easing: EASE, fill: "backwards" });

  play(el, [{ opacity: 0, transform: "translateY(64px)" }, {}], 1300);
  // Section titles wipe in from the left just after their column rises.
  play(el.querySelector(".section-title"), [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 -1em 0 0)" }], 1100, 200);
  // The featured screenshot uncovers from the bottom while it settles from a slight zoom.
  const media = el.querySelector(".featured-media");
  play(media, [{ clipPath: "inset(100% 0 0 0 round 6px)" }, { clipPath: "inset(0 0 0 0 round 6px)" }], 1500, 150);
  play(media?.querySelector("img") ?? null, [{ transform: "scale(1.18)" }, {}], 1800, 150);
}

/*
  Kinetic theme only, without reduced motion:
    - scroll reveals: each .reveal rises in once when it comes into view, staggered with
      whatever enters alongside it
  and for a fine pointer:
    - a soft glow that trails the pointer
    - a ring cursor in difference blend mode that swells over anything clickable
    - magnetic buttons and header links that lean toward the pointer
  The native cursor stays, so nothing about pointing or text selection changes.
*/
export function KineticFx() {
  const theme = useTheme();
  const reduceMotion = useHydratedReducedMotion();
  const pathname = usePathname();
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const active = theme === "kinetic" && !reduceMotion;

  // Scroll reveals, played with the Web Animations API: this runs before the page's own
  // content has hydrated, and attributes set on that markup would break hydration.
  // On first arming, whatever is already on screen stays as it is; after a client-side
  // navigation the new page's blocks all enter. Layout effect, so nothing flashes first.
  const armed = useRef(false);
  useLayoutEffect(() => {
    if (!active) {
      armed.current = false;
      return;
    }
    const firstRun = !armed.current;
    armed.current = true;
    const holds = new Map<Element, Animation>();
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          holds.get(entry.target)?.cancel();
          holds.delete(entry.target);
          enter(entry.target, n++ * 120);
        }
      },
      // Any part inside the lower edge less 10%: a ratio threshold could never be met by a
      // block much taller than the screen (a stretched section header), leaving it hidden.
      { rootMargin: "0px 0px -10% 0px" },
    );
    for (const el of document.querySelectorAll(".reveal")) {
      const r = el.getBoundingClientRect();
      if (firstRun && r.top < innerHeight && r.bottom > 0) continue;
      holds.set(el, el.animate([{ opacity: 0 }], { fill: "forwards" }));
      io.observe(el);
    }
    return () => {
      io.disconnect();
      for (const hold of holds.values()) hold.cancel();
    };
  }, [active, pathname]);

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
      if (target.closest(OPENS)) {
        ringEl.dataset.open = "";
        delete ringEl.dataset.hover;
      } else {
        delete ringEl.dataset.open;
        if (target.closest(INTERACTIVE)) ringEl.dataset.hover = "";
        else delete ringEl.dataset.hover;
      }

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

    // The ring follows a little behind, the glow lazily; both ease toward the pointer each frame.
    const loop = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      gx += (tx - gx) * 0.05;
      gy += (ty - gy) * 0.05;
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
