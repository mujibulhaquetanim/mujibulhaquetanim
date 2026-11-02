import Link from "next/link";
import type { IconType } from "react-icons";
import { FaAws, FaGolang } from "react-icons/fa6";
import { LuArrowUpRight } from "react-icons/lu";
import { RiOpenaiFill } from "react-icons/ri";
import {
  SiApachekafka,
  SiCloudflare,
  SiDocker,
  SiDrizzle,
  SiFastapi,
  SiGithubactions,
  SiGraphql,
  SiLangchain,
  SiMongodb,
  SiNestjs,
  SiNeo4J,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiWebrtc,
  SiZod,
} from "react-icons/si";

const ICONS: [string, IconType][] = [
  ["TypeScript", SiTypescript],
  ["NestJS", SiNestjs],
  ["Next.js", SiNextdotjs],
  ["React", SiReact],
  ["PostgreSQL", SiPostgresql],
  ["Redis", SiRedis],
  ["WebRTC", SiWebrtc],
  ["Kafka", SiApachekafka],
  ["LangChain", SiLangchain],
  ["OpenAI", RiOpenaiFill],
  ["Docker", SiDocker],
  ["AWS", FaAws],
  ["GitHub Actions", SiGithubactions],
  ["Cloudflare", SiCloudflare],
  ["Go", FaGolang],
  ["Python", SiPython],
  ["FastAPI", SiFastapi],
  ["GraphQL", SiGraphql],
  ["MongoDB", SiMongodb],
  ["Neo4j", SiNeo4J],
  ["Drizzle", SiDrizzle],
  ["Zod", SiZod],
  ["TanStack Query", SiReactquery],
  ["Tailwind CSS", SiTailwindcss],
];

// Each copy scrolls its own width plus the gap, so repeated copies loop seamlessly.
const COPIES = 3;

export function TechTile() {
  return (
    <Link
      href="/about#toolbox"
      className="tile tile-link group flex h-full items-center gap-2 overflow-hidden py-2 pl-4 pr-1 xl:pl-5"
    >
      <h2 className="flex shrink-0 items-center gap-1 text-lg font-bold tracking-tight text-white lg:text-base xl:text-xl">
        Tech stack
        <LuArrowUpRight
          aria-hidden
          className="size-4 opacity-60 transition-all duration-300 ease-out-quint group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 xl:size-5"
        />
      </h2>
      <span className="sr-only">{ICONS.map(([name]) => name).join(", ")}</span>
      {/* Mask-based edge fade works on any tile colour, including hover. */}
      <div
        aria-hidden
        className="flex min-w-0 flex-1 overflow-hidden p-2 [--duration:45s] [--gap:2rem] [gap:var(--gap)] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
      >
        {Array.from({ length: COPIES }, (_, copy) => (
          <div key={copy} className="marquee-track flex shrink-0 [gap:var(--gap)]">
            {ICONS.map(([name, Icon]) => (
              <Icon key={name} className="size-10 text-white sm:size-12 lg:size-8 xl:size-11 short:size-8" />
            ))}
          </div>
        ))}
      </div>
    </Link>
  );
}
