import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedHeading } from "@/components/animated-heading";
import { MessageTrace } from "@/components/message-trace";
import { VelocityMarquee } from "@/components/velocity-marquee";
import { ProfilePhoto } from "@/components/profile-photo";
import { LayoutSwitch } from "@/components/bento/layout-switch";
import { BentoHome } from "@/components/bento/bento-home";
import { Section } from "@/components/section";
import { GithubActivity } from "@/components/github-activity";
import { ProjectRow } from "@/components/project-row";
import { projects } from "@/content/projects";
import { experience, toolbox } from "@/content/profile";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

const featured = projects.find((p) => p.featured)!;
const selected = projects.filter((p) => !p.featured).slice(0, 4);

export default function HomePage() {
  return <LayoutSwitch bento={<BentoHome />} standard={<StandardHome />} />;
}

function StandardHome() {
  return (
    <>
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 pt-14 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-24">
        <div className="lg:col-span-7 lg:pr-6">
          <ProfilePhoto size={160} className="mb-7 size-24 rounded-[1.75rem] border border-line shadow-xl shadow-black/10 sm:size-28" />
          <p aria-hidden className="only-terminal mb-4 text-sm text-ink-2">
            <span className="text-accent">tanim@chattogram</span>:~$ cat about.txt
          </p>
          {/* Non-breaking hyphens (U+2011) keep "multi-tenant" and "real-time" on one line. */}
          <AnimatedHeading
            text="I build multi‑tenant backends, real‑time systems and AI agents."
            className="text-[clamp(2rem,4.1vw,3.3rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          />
          <p className="mt-6 max-w-[56ch] text-lg text-ink-2">
            I&apos;m Tanim, a full-stack AI engineer at{" "}
            <a href={site.employer.url} className="link text-ink" target="_blank" rel="noopener noreferrer">
              MeshEver
            </a>{" "}
            in Chattogram, Bangladesh. Right now I&apos;m building Zasmate, which answers
            customer messages for businesses on seven channels. The trace shows how one of
            those replies gets made.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-solid">
              Email me
            </a>
            <a href={site.resume} download className="btn btn-quiet">
              Download résumé
            </a>
          </div>
          <p className="mt-5 text-[0.9375rem] text-ink-2">
            Open to new roles, remote or on-site.
          </p>
        </div>
        <div className="lg:col-span-5">
          <MessageTrace />
        </div>
      </div>

      <VelocityMarquee />

      <Section id="work" title="Selected work" intro="Products I've built and shipped, most recent first.">
        <article className="reveal grid gap-6 md:grid-cols-[1.25fr_1fr] md:items-end">
          <Link href={`/work/${featured.slug}`} className="group block overflow-hidden rounded-md border border-line">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              sizes="(min-width: 1024px) 480px, (min-width: 768px) 55vw, 100vw"
              className="aspect-[16/10] w-full bg-white object-cover object-top transition-transform duration-500 ease-out-quint group-hover:scale-[1.02]"
            />
          </Link>
          <div>
            <p className="text-[0.9375rem] text-ink-2">{featured.kind}, current</p>
            <h3 className="mt-1 text-[1.75rem] font-extrabold tracking-tight">{featured.title}</h3>
            <p className="mt-2 text-ink-2">{featured.summary}</p>
            <p className="mt-3 text-[0.9375rem]">{featured.stack.join(", ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] font-medium">
              <Link href={`/work/${featured.slug}`} className="link">
                Read about Zasmate
              </Link>
              {featured.live && (
                <a href={featured.live} className="link" target="_blank" rel="noopener noreferrer">
                  zasmate.com
                </a>
              )}
            </div>
          </div>
        </article>

        <ul className="mt-12 border-t border-line">
          {selected.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
        <Link href="/work" className="link mt-6 inline-block font-medium">
          See all {projects.length} projects and code samples
        </Link>
      </Section>

      <Section id="experience" title="Experience" intro="Where I've worked and studied.">
        <ol className="border-t border-line">
          {experience.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              className="reveal grid gap-1 border-b border-line py-5 sm:grid-cols-[6rem_1fr] sm:gap-6"
            >
              <p className="text-[0.9375rem] tabular-nums text-ink-2">
                {item.year}
                {item.current && <span className="sr-only">, current</span>}
              </p>
              <div>
                <h3 className="text-lg font-bold leading-snug">
                  {item.title}
                  {item.current && (
                    <span className="ml-2 align-middle text-[0.8125rem] font-semibold text-accent">
                      Now
                    </span>
                  )}
                </h3>
                <p className="mt-1 max-w-[62ch] text-ink-2">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <Link href="/about" className="link mt-6 inline-block font-medium">
          More about how I work
        </Link>
      </Section>

      <Section id="toolbox" title="What I work with" intro="Grouped by the problems they solve, not by logo.">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {toolbox.map(({ group, items }) => (
            <div key={group} className="reveal border-t border-line pt-4">
              <dt className="font-bold">{group}</dt>
              <dd className="mt-1 text-ink-2">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="activity" title="On GitHub" intro="I write code most days, in public where I can.">
        <div className="reveal">
          <Suspense fallback={<p className="text-ink-2">Loading the contribution calendar.</p>}>
          <GithubActivity />
          </Suspense>
        </div>
      </Section>
    </>
  );
}
