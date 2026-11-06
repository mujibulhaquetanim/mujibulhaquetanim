import type { StaticImageData } from "next/image";

import zasmate from "../../public/projects/zasmate.png";
import shopmart from "../../public/projects/shopmart.png";
import pharma from "../../public/projects/pharma.png";
import aatbazar from "../../public/projects/aatbazar.png";
import vanillaAmazon from "../../public/projects/VanillaAmazon.webp";
import scrollfeed from "../../public/projects/instafeed.webp";
import yumDispatch from "../../public/projects/YumDispatch.webp";
import tinderClone from "../../public/projects/tinderClone.webp";

export type Project = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  description: string;
  stack: string[];
  image: StaticImageData;
  imageAlt: string;
  /** Crop anchor for list thumbnails; tall screenshots read best from the top. */
  imagePosition?: "top" | "center";
  live?: string;
  source?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "zasmate",
    title: "Zasmate",
    kind: "AI customer messaging SaaS",
    summary:
      "Answers customer messages for businesses across seven channels, in Bangla, Banglish and English.",
    description:
      "Multi-tenant SaaS that answers customer messages for businesses across WhatsApp, Messenger, Instagram, web chat, email, Telegram and SMS. Replies are generated from each business's own catalogue and policies, in Bangla, Banglish or English. It also replies to Facebook comments, hands sensitive requests such as refunds to a person, and keeps an audit log of every action. Teams share one inbox, and usage is limited per plan.",
    stack: [
      "Next.js",
      "AI agents",
      "RAG",
      "Multi-tenant SaaS",
      "Meta Messaging APIs",
      "Human handoff",
    ],
    image: zasmate,
    imageAlt: "Zasmate landing page: The AI teammate that reads your catalogue",
    imagePosition: "top",
    live: "https://zasmate.com/",
    featured: true,
  },
  {
    slug: "shopmart",
    title: "Shopmart",
    kind: "Multi-vendor e-commerce",
    summary:
      "Multi-vendor store with vendor and admin dashboards, delivery tracking and tenant isolation in PostgreSQL.",
    description:
      "Multi-vendor e-commerce platform with a Next.js 16 frontend and a modular NestJS backend. Tenant data is isolated in PostgreSQL with row-level security, and orders run in database transactions so payment, inventory and the order record always agree. Vendors and admins get separate dashboards with attribute-based access control (CASL), real-time delivery tracking and notifications on several channels. Payments go through Cryptomus.",
    stack: [
      "TypeScript",
      "Next.js 16",
      "NestJS",
      "PostgreSQL (RLS)",
      "Drizzle ORM",
      "CASL",
      "JWT auth",
      "Cryptomus",
    ],
    image: shopmart,
    imageAlt: "Shopmart admin dashboard",
    imagePosition: "top",
    live: "https://shopmart.mujibulhaquetanim.dev/",
  },
  {
    slug: "social-matchmaking",
    title: "Social match-making",
    kind: "Video chat, reels and swipe matching",
    summary:
      "Meet people through live video chat, video reels and swiping, with matches drawn from a Neo4j graph.",
    description:
      "Social match-making app built as a monorepo: live video chat, video reels and Tinder-style swiping. Calls run on WebRTC and scale horizontally with Socket.io, NATS and Redis, and a NATS-to-PostgreSQL pipeline acknowledges messages in under 100 ms. Reels are transcoded to HLS with FFmpeg on AWS ECS. Discovery and matching read relationships from a Neo4j graph. Sessions use JWT, rate limiting is backed by Redis, database writes are batched, and an OpenAI SDK chatbot is built in.",
    stack: ["WebRTC", "Socket.io", "NATS", "Redis", "PostgreSQL", "Neo4j", "FFmpeg and HLS", "AWS ECS"],
    image: tinderClone,
    imageAlt: "Swiping through profile cards in the match-making app",
  },
  {
    slug: "aatbaazar",
    title: "AatBaazar",
    kind: "Marketplace",
    summary:
      "Production marketplace with search and filtering, accounts, a cart and Stripe checkout.",
    description:
      "Production marketplace with product listings, filtering and search, user authentication, a cart, and Stripe checkout.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "JWT auth"],
    image: aatbazar,
    imageAlt: "AatBaazar marketplace product listing",
    imagePosition: "top",
    live: "https://aat-baazar.mujibulhaquetanim.dev/",
  },
  {
    slug: "pharmacms",
    title: "PharmaCMS",
    kind: "Pharmacy management",
    summary:
      "Inventory, prescriptions, analytics and Stripe payments for day-to-day pharmacy work.",
    description:
      "Pharmacy management system with inventory tracking, an analytics dashboard, prescription records, quick product management, a cart, and Stripe one-time payments. Built for day-to-day pharmacy operations with a simple admin interface.",
    stack: ["Next.js", "shadcn/ui", "Node.js", "Express", "MongoDB", "Stripe", "REST API"],
    image: pharma,
    imageAlt: "PharmaCMS inventory dashboard",
    source:
      "https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/Payment%20Gateways/Stripe/One-time%20Payment",
  },
  {
    slug: "vanilla-amazon",
    title: "Vanilla Amazon",
    kind: "Storefront without a framework",
    summary:
      "An Amazon-style storefront in plain JavaScript: DOM rendering, cart state and checkout with browser APIs only.",
    description:
      "Amazon storefront clone built with plain JavaScript and no frameworks or bundlers. Covers DOM rendering, event handling, cart state in localStorage, and a simulated checkout using only browser APIs.",
    stack: ["JavaScript", "HTML", "CSS", "DOM API", "localStorage"],
    image: vanillaAmazon,
    imageAlt: "Vanilla Amazon storefront product grid",
    imagePosition: "top",
    source:
      "https://github.com/mujibulhaquetanim/Frontend-Functionalities/tree/main/E-commerce/Amazon-vanilajs",
  },
  {
    slug: "scrollfeed",
    title: "ScrollFeed",
    kind: "Social feed",
    summary:
      "Infinite feed with cursor-based pagination, built to stay smooth with large, changing lists.",
    description:
      "Social feed inspired by Instagram and X, with infinite scroll using cursor-based pagination, post interactions, story previews, and a responsive masonry layout. Focused on scroll performance with large, dynamic lists.",
    stack: ["Next.js", "TanStack Query", "Cursor pagination", "Infinite scroll"],
    image: scrollfeed,
    imageAlt: "ScrollFeed scrolling through a social feed",
    imagePosition: "top",
  },
  {
    slug: "yumdispatch",
    title: "YumDispatch",
    kind: "Food delivery interface",
    summary:
      "Mobile-first food ordering for the Bangladeshi market, from menu browsing to dispatch.",
    description:
      "Mobile-first food delivery interface for the Bangladeshi market, with restaurant and menu browsing, a cart, and an order dispatch flow.",
    stack: ["React", "Tailwind CSS", "Context API", "Netlify"],
    image: yumDispatch,
    imageAlt: "YumDispatch restaurant menu",
    imagePosition: "top",
    live: "https://yumdispatchbd.netlify.app/",
  },
];

export const codeSamples = [
  {
    name: "NestJS",
    note: "Modules, guards, queues and microservice patterns",
    url: "https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/NestJs",
  },
  {
    name: "Go",
    note: "Services, CLIs and concurrency practice",
    url: "https://github.com/mujibulhaquetanim/GoLang",
  },
  {
    name: "Authentication",
    note: "OAuth, JWT, sessions and role-based access",
    url: "https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/Authentication",
  },
  {
    name: "Databases",
    note: "PostgreSQL, MongoDB, Redis and Neo4j",
    url: "https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/Databases",
  },
  {
    name: "LangChain.js",
    note: "Chains, retrieval and tool calling",
    url: "https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/LangChain-js",
  },
  {
    name: "AWS and DevOps",
    note: "Deployment, containers and CI",
    url: "https://github.com/mujibulhaquetanim/Backend-Functionalities/tree/main/DevOps",
  },
  {
    name: "Everything else",
    note: "The full backend experiments repository",
    url: "https://github.com/mujibulhaquetanim/Backend-Functionalities",
  },
];

// Bento home showcase tabs: AI SaaS through e-commerce to business systems.
export const showcase = ["zasmate", "shopmart", "aatbaazar", "pharmacms"];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
