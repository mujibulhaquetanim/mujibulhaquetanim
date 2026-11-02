import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedHeading } from "@/components/animated-heading";
import { getProject, projects, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { jsonLd, pageMetadata, personId } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title}, ${project.kind}`,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: {
      url: project.image.src,
      width: project.image.width,
      height: project.image.height,
      alt: project.imageAlt,
    },
  });
}

// Project and breadcrumb structured data, so results can show the trail and the work's author.
function projectJsonLd(project: Project) {
  const url = `${site.url}/work/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        genre: project.kind,
        description: project.description,
        url,
        image: new URL(project.image.src, site.url).href,
        keywords: project.stack.join(", "),
        author: { "@id": personId },
        ...(project.live && { sameAs: project.live }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

  return (
    <article className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8 lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(projectJsonLd(project)) }} />
      <Link href="/work" className="link text-[0.9375rem] text-ink-2">
        All work
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <header className="lg:col-span-7">
          <p className="text-ink-2">{project.kind}</p>
          <AnimatedHeading
            text={project.title}
            className="mt-1 text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em]"
          />
          <p className="mt-6 max-w-[62ch] text-lg leading-relaxed">{project.description}</p>
        </header>

        <dl className="grid content-start gap-6 text-[0.9375rem] lg:col-span-4 lg:col-start-9">
          <div className="border-t border-line pt-3">
            <dt className="font-bold">Built with</dt>
            <dd className="mt-1 text-ink-2">{project.stack.join(", ")}</dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="font-bold">See it</dt>
            <dd className="mt-1 space-y-1 text-ink-2">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="link block text-ink">
                  Live at {host(project.live)}
                </a>
              )}
              {project.source && (
                <a href={project.source} target="_blank" rel="noopener noreferrer" className="link block text-ink">
                  Source on GitHub
                </a>
              )}
              {!project.live && !project.source && <p>Not public yet. Ask me for a walkthrough.</p>}
            </dd>
          </div>
        </dl>
      </div>

      <figure className="mt-12 overflow-hidden rounded-md border border-line bg-paper-2">
        <Image
          src={project.image}
          alt={project.imageAlt}
          sizes="(min-width: 1180px) 1116px, 100vw"
          className="mx-auto max-h-[80vh] w-auto bg-white object-contain"
          preload
        />
      </figure>

      <nav aria-label="Next project" className="mt-16 border-t border-line pt-6">
        <p className="text-[0.9375rem] text-ink-2">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="mt-1 inline-block text-[1.75rem] font-extrabold tracking-tight decoration-2 underline-offset-[0.15em] hover:underline"
        >
          {next.title}
        </Link>
      </nav>
    </article>
  );
}
