"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { LuArrowRight, LuArrowUpRight } from "react-icons/lu";
import { getProject, projects, showcase } from "@/content/projects";

const items = showcase.map((slug) => getProject(slug)!);
const thumbs = projects.filter((p) => !showcase.includes(p.slug)).slice(0, 3);

const fade = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
};

const tabId = (slug: string) => `showcase-tab-${slug}`;

// Tabbed showcase: the featured product first, then client work across the range.
export function FeaturedTile() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const project = items[index];

  // Arrow keys move between tabs, as the ARIA tab pattern expects.
  function onKeyDown(e: KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + items.length) % items.length;
    setIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <article aria-label="Selected work" className="tile group flex h-full w-full flex-col overflow-hidden sm:flex-row">
      <div className="relative z-10 flex min-w-0 flex-col gap-2.5 p-4 sm:w-[54%] sm:p-5 lg:gap-2 lg:p-4 xl:gap-3 xl:p-6 short:gap-2 short:p-4">
        <div role="tablist" aria-label="Selected projects" onKeyDown={onKeyDown} className="-ml-1.5 flex flex-wrap gap-1">
          {items.map((p, i) => (
            <button
              key={p.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={tabId(p.slug)}
              aria-selected={i === index}
              aria-controls="showcase-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`rounded-lg px-1.5 py-0.5 text-[11px] font-semibold transition-colors duration-200 xl:px-2 xl:text-xs ${
                i === index ? "bg-white/15 text-white ring-1 ring-white/30" : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div role="tabpanel" id="showcase-panel" aria-labelledby={tabId(project.slug)} className="flex flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={project.slug} {...fade} className="flex flex-1 flex-col gap-2.5 lg:gap-2 xl:gap-3 short:gap-2">
              <p className="flex flex-wrap items-center gap-2 text-[11px] xl:text-xs">
                {project.featured && (
                  <span className="rounded-md bg-signal/15 px-1.5 py-0.5 font-semibold text-signal">Featured</span>
                )}
                <span className="text-slate-300">{project.kind}</span>
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-white xl:text-4xl short:text-2xl">{project.title}</h2>

              <p className="text-sm leading-relaxed text-slate-300 lg:text-xs xl:text-sm">{project.summary}</p>

              <ul className="flex flex-wrap gap-1" aria-label={`${project.title} stack`}>
                {project.stack.slice(0, 4).map((tag, i) => (
                  <li
                    key={tag}
                    className="chip chip-in text-[11px] lg:text-[10px] xl:text-xs"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <Link
                  href={`/work/${project.slug}`}
                  className="group/case inline-flex items-center gap-1.5 text-sm font-semibold text-white lg:text-xs xl:text-sm"
                >
                  Case study
                  <LuArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 ease-out-quint group-hover/case:translate-x-1"
                  />
                </Link>
                {(project.live ?? project.source) && (
                  <a
                    href={project.live ?? project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/live inline-flex items-center gap-0.5 border-b border-slate-300/30 pb-0.5 text-xs text-slate-200 transition-colors hover:border-white hover:text-white xl:text-[13px]"
                  >
                    {project.live ? "Live site" : "Source"}
                    <LuArrowUpRight
                      aria-hidden
                      className="size-3.5 transition-transform duration-300 ease-out-quint group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Product shot: tilted in 3D at rest, straightens on hover. */}
      <div
        aria-hidden
        className="relative mx-4 mb-4 [perspective:1000px] sm:absolute sm:inset-y-0 sm:right-[-14%] sm:m-0 sm:flex sm:w-[60%] sm:items-center"
      >
        <span className="absolute inset-[15%] rounded-full bg-sky-400/25 blur-3xl [animation:float_7s_ease-in-out_infinite]" />
        <div className="shine relative w-full overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/40 transition-transform duration-700 ease-out-quint sm:[transform:rotateY(-14deg)_rotateX(6deg)_rotateZ(-2deg)] sm:group-hover:[transform:rotateY(-4deg)_rotateX(2deg)_scale(1.03)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={project.slug} {...fade}>
              <Image
                src={project.image}
                alt=""
                sizes="(min-width: 1024px) 420px, 100vw"
                className="block aspect-[1280/760] w-full bg-white object-cover object-left-top"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Link
        href="/work"
        className="group/all relative z-10 mx-4 mb-4 inline-flex w-fit items-center gap-2 self-start rounded-full text-xs font-semibold text-white sm:absolute sm:bottom-3 sm:right-4 sm:m-0 sm:bg-slate-900/55 sm:py-1 sm:pl-1 sm:pr-3 xl:text-[13px]"
      >
        <span className="flex -space-x-2" aria-hidden>
          {thumbs.map((p) => (
            <Image
              key={p.slug}
              src={p.image}
              alt=""
              sizes="28px"
              className="size-6 rounded-full border-2 border-slate-600 bg-white object-cover object-top"
            />
          ))}
        </span>
        All {projects.length} projects
        <LuArrowRight aria-hidden className="size-3.5 transition-transform duration-300 ease-out-quint group-hover/all:translate-x-1" />
      </Link>
    </article>
  );
}
