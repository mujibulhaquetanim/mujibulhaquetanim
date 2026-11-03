import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { FaFileExport } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { LocalTime } from "@/components/bento/local-time";
import { ProfilePhoto } from "@/components/profile-photo";
import { SpotlightGrid } from "@/components/bento/spotlight-grid";
import { FeaturedTile } from "@/components/bento/featured-tile";
import { GithubTile } from "@/components/bento/github-tile";
import { ImpactTile } from "@/components/bento/impact-tile";
import { CareerTile } from "@/components/bento/career-tile";
import { TechTile } from "@/components/bento/tech-tile";
import { ContactTile } from "@/components/bento/contact-tile";
import { coreStack } from "@/content/profile";
import { site } from "@/content/site";

const HIRE_MAILTO = `mailto:${site.email}?subject=Salam%20Mujibul%20Haque%20Tanim&body=I%20would%20like%20to%20connect%20with%20you!`;

// Staggered entrance, as on the original site.
function Cell({ delay, className, children }: { delay: number; className: string; children: ReactNode }) {
  return (
    <div className={`bento-in h-full w-full ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/*
  The original one-screen bento grid. At lg it fills the viewport under the header (3.5rem plus its 1px border):
    row 1: intro | featured project
    row 2: GitHub activity | numbers | career path
    row 3: tech stack | contact
  A minimum height, not a fixed one, and rows no shorter than their content: on a short
  window the grid grows and the page scrolls, instead of clipping the bottom row.
  Only row 2 is flexible. Several fr rows would be scaled from each other's content
  whenever the grid outgrows the screen, making it taller than needed; so row 1 takes
  its content height and row 3 grows to 10% of the screen, close to its share in the
  original 3fr/2fr/0.8fr split. It grows before the grid checks the fit, so a bigger cap
  pushes a screen whose content just fits (1440x900) into scrolling.
*/
export function BentoHome() {
  return (
    <div
      data-bento-home
      className="w-full overflow-x-hidden bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px]"
    >
      <SpotlightGrid className="mx-auto grid h-auto max-w-[90rem] auto-rows-auto grid-cols-1 gap-2 px-3 py-2 sm:gap-3 sm:px-4 md:grid-cols-2 lg:min-h-[calc(100dvh-3.5rem-1px)] lg:grid-cols-12 lg:grid-rows-[auto_minmax(min-content,1fr)_minmax(min-content,10dvh)] lg:gap-2 lg:px-4 xl:gap-4">
        <Cell delay={0} className="col-span-full md:col-span-2 lg:col-span-6">
          <div className="tile flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-5 lg:gap-2 lg:p-4 xl:gap-4 xl:p-6 2xl:gap-6 2xl:p-8 short:gap-2 short:p-4">
            {/* Status and greeting on the left; a large tilted portrait on the right. */}
            <div className="mt-2 flex items-start justify-between gap-4 lg:mt-1 xl:mt-4 short:mt-1">
              <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:gap-2 xl:gap-4 short:gap-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a
                    href={HIRE_MAILTO}
                    className="btn-press group relative w-fit bg-transparent px-3 py-1.5 text-sm lg:px-3 lg:py-1 lg:text-xs xl:px-4 xl:py-2 xl:text-sm"
                  >
                    <span className="absolute -right-1 -top-1 flex size-2.5 xl:size-3">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal/60" />
                      <span className="relative inline-flex size-full rounded-full bg-signal" />
                    </span>
                    <MdEmail aria-hidden size={16} className="transition-transform duration-300 ease-out-quint group-hover:-rotate-12" />
                    Open to opportunities
                  </a>
                  <LocalTime />
                </div>

                <h1 className="text-3xl font-medium leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-3xl xl:text-5xl 2xl:text-6xl short:text-3xl">
                  Salam, I&apos;m Mujibul Haque{" "}
                  <span className="bg-gradient-to-r from-white via-sky-300 to-white bg-[length:200%_auto] bg-clip-text font-extrabold text-transparent text-sheen">
                    Tanim
                  </span>
                </h1>
              </div>

              <div className="group/photo relative shrink-0">
                <span
                  aria-hidden
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-sky-400/45 via-signal/25 to-transparent blur-2xl"
                />
                <ProfilePhoto
                  size={160}
                  className="relative size-20 rotate-3 rounded-[1.4rem] border-2 border-white/25 shadow-2xl shadow-black/40 group-hover/photo:rotate-0 group-hover/photo:scale-[1.04] sm:size-24 lg:size-24 xl:size-32 2xl:size-36 short:size-20"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-1 -right-1 size-4 rounded-full border-[3px] border-slate-600 bg-signal xl:size-5"
                />
              </div>
            </div>

            <p className="max-w-[62ch] text-sm leading-relaxed text-slate-300 sm:text-base lg:text-xs xl:text-sm 2xl:text-base">
              <b className="font-semibold text-white">{site.role}</b> building production web applications with
              TypeScript, Node.js, and Next.js. I work across backend services, real-time systems, and AI features
              such as agents and RAG, from API design to deployment.
            </p>

            <p className="text-sm text-slate-300 lg:text-xs xl:text-sm">
              <span className="mr-1.5 rounded-md bg-signal/15 px-1.5 py-0.5 text-[11px] font-semibold text-signal lg:text-[10px] xl:text-xs">
                Now
              </span>
              Working at{" "}
              <a
                href={site.employer.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                MeshEver
              </a>
              , building{" "}
              <a
                href="https://zasmate.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              >
                Zasmate
              </a>
              , an AI customer messaging SaaS.
            </p>

            <ul className="flex flex-wrap gap-1" aria-label="Core stack">
              {coreStack.map((item, i) => (
                <li
                  key={item}
                  className="chip chip-in text-[11px] transition-colors duration-200 hover:border-white/30 hover:bg-white/10 lg:text-[10px] xl:text-sm short:py-0 short:text-[11px]"
                  style={{ animationDelay: `${200 + i * 50}ms` }}
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-4 pt-2 short:pt-1">
              <Link href="/about" className="btn-press group px-3 py-1.5 text-sm lg:px-3 lg:py-1 lg:text-xs xl:px-4 xl:py-2 xl:text-sm">
                About me
                <LuArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={site.resume}
                download
                className="btn-press group px-3 py-1.5 text-sm lg:px-3 lg:py-1 lg:text-xs xl:px-4 xl:py-2 xl:text-sm"
              >
                <FaFileExport aria-hidden size={16} className="transition-transform duration-300 ease-out-quint group-hover:translate-y-0.5" />
                Download resume
              </a>
            </div>
          </div>
        </Cell>

        <Cell delay={90} className="col-span-full min-h-[16rem] md:col-span-2 lg:col-span-6 lg:min-h-0">
          <FeaturedTile />
        </Cell>

        <Cell delay={180} className="col-span-full min-h-0 md:col-span-2 lg:col-span-6">
          <Suspense fallback={<div className="tile h-full min-h-[13.5rem]" />}>
            <GithubTile />
          </Suspense>
        </Cell>

        <Cell delay={240} className="col-span-full min-h-0 md:col-span-1 lg:col-span-3">
          <ImpactTile />
        </Cell>

        <Cell delay={300} className="col-span-full min-h-0 md:col-span-1 lg:col-span-3">
          <CareerTile />
        </Cell>

        <Cell delay={360} className="col-span-full min-h-0 md:col-span-2 lg:col-span-6">
          <TechTile />
        </Cell>

        <Cell delay={420} className="col-span-full min-h-0 md:col-span-2 lg:col-span-6">
          <ContactTile />
        </Cell>
      </SpotlightGrid>
    </div>
  );
}
