export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  topics: string[];
  readMinutes: number;
  status: "draft" | "published";
  /** Where a published article lives. */
  url?: string;
};

export const posts: Post[] = [
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
