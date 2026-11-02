import { ragFailuresLookEmpty } from "@/content/articles/rag-failures-look-empty";
import { rlsConnectionRole } from "@/content/articles/rls-connection-role";
import { zasmateMetaIntegration } from "@/content/articles/zasmate-meta-integration";

/** Article content. `code` spans and blocks keep their text exactly; inline `backticks` render as code. */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; lang: string; code: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  topics: string[];
  readMinutes: number;
  status: "draft" | "published";
  /** ISO date the article went up. */
  date?: string;
  /** The article itself, for posts published on this site. */
  body?: Block[];
  /** Where a published article lives, for posts published elsewhere. */
  url?: string;
};

// Published articles first (written from real Zasmate troubleshooting logs), then drafts.
export const posts: Post[] = [
  zasmateMetaIntegration,
  ragFailuresLookEmpty,
  rlsConnectionRole,
  {
    slug: "realtime-ai-pipelines-langgraph",
    title: "Building real-time AI pipelines with LangGraph and WebSockets",
    excerpt:
      "How I built a streaming agent that runs tool calls concurrently without blocking the UI, and what it taught me about backpressure.",
    topics: ["AI", "LangGraph", "WebSockets"],
    readMinutes: 8,
    status: "draft",
  },
  {
    slug: "nestjs-rabbitmq-patterns",
    title: "NestJS microservices: RabbitMQ patterns that hold up in production",
    excerpt:
      "Dead-letter queues, retry strategies and circuit breakers, the parts most tutorials leave out.",
    topics: ["NestJS", "RabbitMQ"],
    readMinutes: 6,
    status: "draft",
  },
  {
    slug: "clean-architecture-typescript",
    title: "Clean architecture in TypeScript: start with the domain",
    excerpt:
      "Why I write the domain layer first, and how it keeps large codebases from collapsing under their own weight.",
    topics: ["TypeScript", "Architecture"],
    readMinutes: 10,
    status: "draft",
  },
  {
    slug: "postgres-fts-vs-pgvector",
    title: "PostgreSQL full-text search or pgvector: when to use which",
    excerpt:
      "A practical comparison for AI-assisted search, with the tradeoffs and a hybrid approach that handles both keyword and semantic queries.",
    topics: ["PostgreSQL", "Search"],
    readMinutes: 7,
    status: "draft",
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
