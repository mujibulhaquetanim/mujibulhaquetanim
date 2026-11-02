import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/section";
import { experience, focusAreas, principles, research } from "@/content/profile";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Mujibul Haque Tanim works: backend architecture, real-time systems, AI workflows and cloud delivery, plus education and research.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro title="I like the parts of software that have to keep working.">
        <p>
          I design and ship production software end to end: multi-tenant backends, real-time
          features, AI workflows, and the interface on top. I care most about security,
          performance, and code the next person can change without fear.
        </p>
        <p className="mt-4">
          I&apos;m based in {site.location} and work as a {site.role.toLowerCase()} at{" "}
          <a href={site.employer.url} className="link text-ink" target="_blank" rel="noopener noreferrer">
            {site.employer.name}
          </a>
          , where I&apos;m building Zasmate.
        </p>
      </PageIntro>

      <Section id="focus" title="What I focus on">
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {focusAreas.map(({ title, text }) => (
            <div key={title} className="border-t border-line pt-4">
              <dt className="text-lg font-bold">{title}</dt>
              <dd className="mt-1 text-ink-2">{text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="principles" title="How I work" intro="Three rules I keep coming back to.">
        <ul className="space-y-4">
          {principles.map((line) => (
            <li
              key={line}
              className="text-[clamp(1.375rem,2.6vw,2rem)] font-bold leading-snug tracking-tight"
            >
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="experience" title="Experience">
        <ol className="border-t border-line">
          {experience.map((item) => (
            <li
              key={`${item.year}-${item.title}`}
              className="grid gap-1 border-b border-line py-5 sm:grid-cols-[6rem_1fr] sm:gap-6"
            >
              <p className="text-[0.9375rem] tabular-nums text-ink-2">{item.year}</p>
              <div>
                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                <p className="mt-1 max-w-[62ch] text-ink-2">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="research" title="Research" intro="Machine learning work from my degrees.">
        <ul className="space-y-6">
          {research.map((paper) => (
            <li key={paper.title} className="border-t border-line pt-4">
              <h3 className="max-w-[60ch] text-lg font-bold leading-snug">
                {paper.url ? (
                  <a href={paper.url} target="_blank" rel="noopener noreferrer" className="link">
                    {paper.title}
                  </a>
                ) : (
                  paper.title
                )}
              </h3>
              <p className="mt-1 text-[0.9375rem] text-ink-2">{paper.where}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
