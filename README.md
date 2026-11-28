# Mujibul Haque Tanim

Full-stack AI engineer in Chattogram, Bangladesh. I build multi-tenant backends, real-time
systems and AI agents, mostly in TypeScript.

**Portfolio:** [mujibulhaquetanim.dev](https://mujibulhaquetanim.dev)<br>
**Resume:** [PDF](https://mujibulhaquetanim.dev/Mujibulhaquetanim-resume.pdf)<br>
**Email:** [info@mujibulhaquetanim.dev](mailto:info@mujibulhaquetanim.dev)<br>
**LinkedIn:** [in/mujibulhaquetanim](https://www.linkedin.com/in/mujibulhaquetanim/)

## Now

I'm at [MeshEver](https://meshever.com) building [Zasmate](https://zasmate.com), an AI agent that
answers customer messages for businesses on WhatsApp, Messenger, Instagram, web chat, email,
Telegram and SMS. It replies in Bangla, Banglish or English from each business's own catalogue.

My part of it:

- Tenant isolation with PostgreSQL row-level security, plus a startup check that fails if the
  database connection could bypass it.
- The RAG agent (pgvector plus keyword search), which hands the conversation to a person when it
  isn't confident and always hands over refunds and other sensitive requests.
- Meta Graph API webhooks for messages and replies to Facebook comments.

## Writing

Write-ups of bugs I hit while building Zasmate:

- [One connection string turned off our tenant isolation](https://mujibulhaquetanim.dev/writing/postgres-rls-connection-role).
  Another tenant's workspace showed up on the dashboard with no error anywhere, and the cause
  was one word in `DATABASE_URL`.
- [When retrieval fails, the AI agent should stop talking](https://mujibulhaquetanim.dev/writing/rag-failures-look-empty).
  An embeddings outage got the agent posting made-up prices, and a separator row quietly
  switched off human handoff.
- [Connecting Zasmate to Meta: five times everything worked and nothing happened](https://mujibulhaquetanim.dev/writing/zasmate-meta-integration).
  Every step of the Facebook and Instagram integration reported success, and the feature still
  did nothing.

## Experience

- **2026 to now: Full-Stack AI Engineer, MeshEver.** Building Zasmate, described above.
- **2025: Full-Stack Developer, 3Zero Digital.** Designed a worker pool with batched writes
  that raised backend throughput by 45% and cut latency in half. Shipped agentic RAG on MCP
  servers for support triage, which cut support tickets by about 25%.
- **2023 to 2024: Freelance.** Backends, frontends and database schemas for clients, mostly
  authentication, real-time APIs and performance tuning.

## Selected work

| Project | What it is | Built with |
| --- | --- | --- |
| [Zasmate](https://zasmate.com) | Multi-channel AI customer messaging SaaS | Next.js, AI agents, RAG, Meta Messaging APIs |
| [Shopmart](https://shopmart.mujibulhaquetanim.dev) | Multi-vendor store with vendor and admin dashboards and per-tenant data isolation | NestJS, Next.js, PostgreSQL (RLS), Drizzle, CASL |
| [Social match-making](https://github.com/mujibulhaquetanim/Chatgaiya-Video-Chat) | Live video chat, video reels and swipe matching drawn from a graph | WebRTC, Socket.io, NATS, Redis, Neo4j, FFmpeg/HLS, AWS ECS |
| [AatBaazar](https://aat-baazar.mujibulhaquetanim.dev) | Marketplace with search, accounts and Stripe checkout | Next.js, PostgreSQL, Stripe |
| [PharmaCMS](https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/Payment%20Gateways/Stripe/One-time%20Payment) | Pharmacy inventory, prescriptions and payments | Next.js, Express, MongoDB, Stripe |

More projects, with screenshots, are on [the portfolio](https://mujibulhaquetanim.dev/work).
Smaller experiments live in [Backend-Functionalities](https://github.com/mujibulhaquetanim/Backend-Functionalities)
and [Frontend-Functionalities](https://github.com/mujibulhaquetanim/Frontend-Functionalities).

## Stack

**Every day:** TypeScript, Node.js, NestJS, Next.js, React, PostgreSQL, Redis, Docker, AWS<br>
**Real-time and messaging:** WebRTC, Socket.io, NATS, RabbitMQ, Kafka<br>
**AI:** LangGraph, LangChain, MCP, OpenAI SDK, pgvector, n8n<br>
**Also shipped with:** Go, Python, FastAPI, GraphQL, gRPC, tRPC, MongoDB, Neo4j, Drizzle, NGINX,
Terraform, Kubernetes, Grafana, Tailwind CSS

## Research

M.Sc. in Computer Science and Engineering, International Islamic University Chittagong (2026).
B.Sc. in Computer Science and Engineering, Port City International University (2023).

- [Leakage-aware multi-class detection of AI-generated phishing emails](https://github.com/mujibulhaquetanim/Multi-Class-Detection-of-AI-Generated-Phishing)
  using stylometric features and stacked ensembles (M.Sc. research)
- E-commerce demand forecasting compared across machine learning models, with explainable AI
- Gender prediction of Bengali names with ensembles and BERT (B.Sc. research)

## Consistency

I've pushed code every day since 1 January 2024.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com?user=mujibulhaquetanim&theme=dark&hide_border=true&border_radius=6" />
  <img src="https://streak-stats.demolab.com?user=mujibulhaquetanim&theme=default&hide_border=true&border_radius=6" height="180" alt="GitHub contribution streak for mujibulhaquetanim" />
</picture>

## Open to

Full-stack and backend roles, remote or on-site, and project collaborations. Reach me by
[email](mailto:info@mujibulhaquetanim.dev) or on [LinkedIn](https://www.linkedin.com/in/mujibulhaquetanim/).
