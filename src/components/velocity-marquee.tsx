"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { coreStack, focusAreas } from "@/content/profile";
import { useTheme } from "@/lib/theme";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// One row of giant type. It drifts on its own, speeds up and skews with scroll speed,
// and flips direction when the visitor scrolls back up.
function Row({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(velocity, [-2500, 2500], [10, -10]);
  // Two copies of the row; moving one copy's width (50%) loops seamlessly.
  const translate = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduceMotion) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    if (boost.get() < 0) direction.current = -1;
    else if (boost.get() > 0) direction.current = 1;
    move += direction.current * Math.abs(move) * Math.abs(boost.get());
    x.set(x.get() + move);
  });

  return (
    <div className="overflow-hidden">
      <motion.div className="flex w-max" style={{ x: translate, skewX: reduceMotion ? 0 : skewX }}>
        {[0, 1].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={item} className="flex items-center">
                <span className={i % 2 ? "marquee-outline" : undefined}>{item}</span>
                <span className="mx-[0.35em] text-accent">✳</span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// Kinetic theme only: a tilted band of what I work on, between the hero and the work.
export function VelocityMarquee() {
  const theme = useTheme();
  if (theme !== "kinetic") return null;
  return (
    // Clipped so the tilted band's corners never cause sideways scrolling.
    <div aria-hidden className="mt-16 overflow-x-clip py-6 lg:mt-24">
      <div className="marquee-band -mx-4 -rotate-2 select-none border-y border-line py-4 text-[clamp(2.5rem,7.5vw,6.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em]">
        <Row items={focusAreas.map((f) => f.title)} baseVelocity={-3} />
        <Row items={coreStack} baseVelocity={3} />
      </div>
    </div>
  );
}
