# Mujibul Haque Tanim

Full-stack AI engineer in Chattogram, Bangladesh. I build multi-tenant backends, real-time
systems and AI agents, mostly in TypeScript.

Right now I'm at [MeshEver](https://meshever.com) building [Zasmate](https://zasmate.com), an AI
agent that answers customer messages for businesses on WhatsApp, Messenger, Instagram, web chat,
email, Telegram and SMS. It replies in Bangla, Banglish or English from each business's own
catalogue, and hands refunds and other sensitive requests to a person.

**Portfolio:** [mujibulhaquetanim.dev](https://www.mujibulhaquetanim.dev)<br>
**Email:** [info@mujibulhaquetanim.dev](mailto:info@mujibulhaquetanim.dev)<br>
**LinkedIn:** [in/mujibulhaquetanim](https://www.linkedin.com/in/mujibulhaquetanim/)

## What I work on

- **Backend architecture.** NestJS and Node.js services, PostgreSQL with row-level security for
  tenant isolation, and queues with RabbitMQ and Kafka.
- **Real-time systems.** WebRTC, Socket.io and Redis for messaging, calls and live video.
- **AI in production.** Agents and retrieval-augmented generation with LangGraph, MCP servers and
  the OpenAI SDK, with human handoff and audit logs for the decisions a model shouldn't make alone.
- **Delivery.** Docker, AWS and GitHub Actions, shipping small changes often.

At 3Zero Digital I improved backend throughput by 45% and shipped an agentic RAG system on MCP
servers.

## Selected work

| Project | What it is | Built with |
| --- | --- | --- |
| [Zasmate](https://zasmate.com) | Multi-channel AI customer messaging SaaS | Next.js, AI agents, RAG, Meta Messaging APIs |
| [Shopmart](https://shopmart.mujibulhaquetanim.dev) | Multi-vendor store with role-based admin and per-tenant data isolation | NestJS, Next.js, PostgreSQL (RLS), CASL |
| [AatBaazar](https://aat-baazar.mujibulhaquetanim.dev) | Marketplace with search, accounts and Stripe checkout | Next.js, PostgreSQL, Stripe |
| [PharmaCMS](https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/Payment%20Gateways/Stripe/One-time%20Payment) | Pharmacy inventory, prescriptions and payments | Next.js, Express, MongoDB, Stripe |

More projects and write-ups are on [the portfolio](https://www.mujibulhaquetanim.dev). Smaller
experiments live in [Backend-Functionalities](https://github.com/mujibulhaquetanim/Backend-Functionalities)
and [Frontend-Functionalities](https://github.com/mujibulhaquetanim/Frontend-Functionalities).

## Stack

**Every day:** TypeScript, Node.js, NestJS, Next.js, React, PostgreSQL, Redis, Docker, AWS<br>
**Real-time and messaging:** WebRTC, Socket.io, RabbitMQ, Kafka<br>
**AI:** LangGraph, LangChain, MCP, OpenAI SDK, n8n<br>
**Also shipped with:** Go, Python, FastAPI, GraphQL, gRPC, tRPC, MongoDB, Neo4j, Drizzle, NGINX,
Kubernetes, Grafana, Tailwind CSS

## Research

M.Sc. in Computer Science and Engineering, International Islamic University Chittagong (2026).
B.Sc. from Port City International University (2023).

- [Leakage-aware multi-class detection of AI-generated phishing emails](https://github.com/mujibulhaquetanim/Multi-Class-Detection-of-AI-Generated-Phishing)
  using stylometric features and stacked ensembles
- E-commerce demand forecasting compared across ML models, with explainable AI
- Gender prediction of Bengali names with ensembles and BERT

## Consistency

I've pushed code every day since 1 January 2024.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com?user=mujibulhaquetanim&theme=dark&hide_border=true&border_radius=6" />
  <img src="https://streak-stats.demolab.com?user=mujibulhaquetanim&theme=default&hide_border=true&border_radius=6" height="180" alt="GitHub contribution streak for mujibulhaquetanim" />
</picture>

## Open to

Full-stack and backend roles, remote or on-site, and project collaborations. Email is the fastest
way to reach me.

---

<details>
<summary><strong>About this repository</strong></summary>

Besides this profile, the repo holds the source of
[mujibulhaquetanim.dev](https://www.mujibulhaquetanim.dev):

- Next.js 16 (App Router, Cache Components, Partial Prefetching, React Compiler)
- Tailwind CSS 4, `motion`, JetBrains Mono
- Three switchable themes: **paper** (calm), **terminal** (green phosphor, typed headings) and
  **kinetic** (scrambled headings, scroll reveals)
- An interactive hero that traces one customer message through Zasmate
- GitHub activity and streak fetched on the server and cached for a day

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build and type check
```

All copy and project data live in `src/content/`. Design rules are in `CLAUDE.md`.

</details>
