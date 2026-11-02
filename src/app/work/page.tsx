import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/section";
import { ProjectRow } from "@/components/project-row";
import { codeSamples, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Projects by Mujibul Haque Tanim: Zasmate, multi-tenant e-commerce, marketplaces and more, plus backend code samples.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageIntro title="Work">
        <p>
          Products I&apos;ve built, from multi-tenant SaaS to storefronts written without a
          framework. Each one links to a short write-up with the stack and where to see it.
        </p>
      </PageIntro>

      <Section id="projects" title="Projects" intro={`${projects.length} projects, most recent first.`}>
        <ul className="border-t border-line">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="code"
        title="Code samples"
        intro="Smaller, focused repositories where I work through a pattern or a tool."
      >
        <ul className="grid gap-x-10 sm:grid-cols-2">
          {codeSamples.map((sample) => (
            <li key={sample.url} className="border-t border-line">
              <a
                href={sample.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-4"
              >
                <span className="font-bold decoration-2 underline-offset-[0.2em] group-hover:underline">
                  {sample.name}
                </span>
                <span className="mt-0.5 block text-[0.9375rem] text-ink-2">{sample.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
