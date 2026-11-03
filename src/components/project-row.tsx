import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-row reveal group grid gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6"
    >
      {/* The alt text is for search; screen readers skip the thumbnail, the title says it all. */}
      <div aria-hidden className="hidden overflow-hidden rounded-[4px] border border-line sm:block">
        <Image
          src={project.image}
          alt={project.imageAlt}
          sizes="144px"
          className={`thumb aspect-[4/3] w-full bg-white object-cover ${
            project.imagePosition === "top" ? "object-top" : "object-center"
          }`}
        />
      </div>
      <div className="min-w-0">
        <h3 className="text-lg font-bold leading-snug decoration-2 underline-offset-[0.2em] group-hover:underline">
          {project.title}
        </h3>
        <p className="text-[0.9375rem] text-ink-2">{project.kind}</p>
        <p className="mt-2 max-w-[62ch]">{project.summary}</p>
        <p className="mt-2 text-[0.875rem] text-ink-2">{project.stack.join(", ")}</p>
      </div>
    </Link>
  );
}
