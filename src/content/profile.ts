// Career, education and working style. Shown in short form on the home page and in full on /about.

export const experience = [
  {
    year: "2026",
    title: "Full-Stack AI Engineer, MeshEver",
    detail:
      "Building Zasmate, a multi-channel AI customer messaging SaaS, from the multi-tenant backend to the agent and the team inbox.",
    current: true,
  },
  {
    year: "2026",
    title: "M.Sc. in Computer Science and Engineering",
    detail: "International Islamic University Chittagong.",
  },
  {
    year: "2025",
    title: "Full-Stack Developer, 3Zero Digital",
    detail:
      "Designed a worker-pool architecture with batched writes that raised backend throughput by 45% and cut latency by half. Shipped agentic RAG on MCP servers for support triage, which cut support tickets by about 25%, and added structured logging, tracing and rate limiting.",
  },
  {
    year: "2024",
    title: "Freelance full-stack development",
    detail:
      "Built backends, frontends and database schemas for clients, with a focus on authentication, real-time APIs and performance tuning.",
  },
  {
    year: "2023",
    title: "B.Sc. in Computer Science and Engineering",
    detail: "Port City International University. Started freelancing the same year.",
  },
];

export const research = [
  {
    title:
      "Leakage-Aware Multi-Class Detection of AI-Generated Phishing Emails Using Stylometric Features and Stacked Ensemble Learning",
    where: "M.Sc. research, International Islamic University Chittagong",
    url: "https://github.com/mujibulhaquetanim/Multi-Class-Detection-of-AI-Generated-Phishing.git",
  },
  {
    title:
      "A Comparative Study of Machine Learning Models for E-Commerce Demand Forecasting with Explainable AI",
    where: "International Islamic University Chittagong",
  },
  {
    title:
      "Gender Predictions of Bengali Names: An Ensemble and BERT-based Approach",
    where: "B.Sc. research, Port City International University",
  },
];

export const focusAreas = [
  {
    title: "Backend architecture",
    text: "Secure APIs, modular services, and multi-tenant data isolation with PostgreSQL row-level security.",
  },
  {
    title: "Real-time systems",
    text: "WebRTC, Socket.io, Kafka and Redis for low-latency messaging, live calls and video streaming.",
  },
  {
    title: "AI workflows",
    text: "LangGraph, MCP servers, the OpenAI SDK and n8n for agents, retrieval-augmented generation and automation.",
  },
  {
    title: "Cloud delivery",
    text: "AWS, Docker, GitHub Actions and monitoring so releases are small, frequent and boring.",
  },
];

export const principles = [
  "Model the domain before the database.",
  "Make the secure option the default one.",
  "Ship small changes often, and watch them in production.",
];

export const toolbox = [
  {
    group: "Backend",
    items: ["TypeScript", "NestJS", "Node.js", "Fastify", "GraphQL", "Go", "Python", "Zod"],
  },
  {
    group: "Real-time",
    items: ["WebRTC", "Socket.io", "NATS", "RabbitMQ", "Kafka", "Redis", "FFmpeg", "HLS"],
  },
  {
    group: "AI",
    items: ["LangGraph", "LangChain", "MCP", "OpenAI SDK", "A2A", "n8n"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Drizzle", "MongoDB", "Neo4j", "Redis", "Qdrant", "Pandas"],
  },
  {
    group: "Delivery",
    items: ["AWS", "Docker", "Terraform", "GitHub Actions", "Cloudflare", "NGINX", "Linux"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "React", "React Native", "TanStack Query", "Redux", "Tailwind CSS", "shadcn/ui"],
  },
  {
    group: "Auth and access",
    items: ["OAuth", "JWT", "RBAC", "ABAC", "CASL", "Better Auth", "Passport"],
  },
];

// Bento theme tiles. Same facts as above, in the short form the original tile grid used.
export const stats = [
  { to: 3, suffix: "+", label: "Years of experience" },
  { to: 20, suffix: "+", label: "Projects shipped since 2023" },
  { to: 45, suffix: "%", label: "Backend throughput gain" },
  {
    to: 60,
    suffix: "+",
    label: "Typing speed (WPM)",
    href: "https://monkeytype.com/profile/mujibtanim",
  },
];

export const milestones = [
  { year: "2026", title: "MeshEver", detail: "Full-Stack AI Engineer, building Zasmate", current: true },
  { year: "2026", title: "M.Sc. in CSE", detail: "IIUC, research on AI-written phishing detection" },
  { year: "2025", title: "3Zero Digital", detail: "+45% backend throughput, agentic RAG on MCP" },
  { year: "2023", title: "Freelance full-stack", detail: "B.Sc. in CSE, real-time client systems" },
];

export const coreStack = ["TypeScript", "NestJS", "Next.js", "PostgreSQL", "WebRTC", "AWS", "LangGraph", "Docker"];
