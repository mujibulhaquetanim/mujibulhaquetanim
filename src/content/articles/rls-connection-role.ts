import type { Post } from "@/content/posts";

export const rlsConnectionRole: Post = {
  slug: "postgres-rls-connection-role",
  title: "One connection string turned off our tenant isolation",
  excerpt:
    "Zasmate keeps every vendor apart with Postgres row-level security. Then the dashboard showed me another tenant's workspace, with no error anywhere. The cause was one word in DATABASE_URL.",
  topics: ["PostgreSQL", "Multi-tenant SaaS", "Security"],
  readMinutes: 5,
  status: "published",
  date: "2026-11-03",
  body: [
    {
      type: "p",
      text: "Zasmate is multi-tenant. Every vendor's conversations, catalogue and settings live in the same Postgres database, and row-level security keeps them apart. Each request runs inside a transaction that sets the tenant id, and the policies do the filtering.",
    },
    {
      type: "p",
      text: "We made a deliberate choice here: queries don't add `where tenantId = ...` themselves. RLS is the one place isolation is enforced, so nobody can forget it in a new query.",
    },
    {
      type: "code",
      lang: "ts",
      code: "return this.db.withTenant(tenantId, (tx) =>\n  tx.tenant.findFirstOrThrow({ select: { id: true, name: true } }),\n);",
    },
    {
      type: "p",
      text: "I still think that's a good design. It just has one condition, and I learned it the hard way.",
    },
    { type: "h2", text: "The bug" },
    {
      type: "p",
      text: "I was clicking through the dashboard to check some UI work, signed in as a brand-new test vendor. The header showed a different vendor's workspace name. My login was right. The JWT had the right tenant id. But `GET /tenant` returned another tenant's row.",
    },
    {
      type: "p",
      text: "Nothing errored and nothing was logged at request time. If I hadn't happened to know the other tenant's name, I would have scrolled straight past it.",
    },
    { type: "h2", text: "The cause" },
    {
      type: "p",
      text: "My local `DATABASE_URL` pointed at Neon's owner role. Owner roles have `BYPASSRLS`. With that attribute, every policy is silently ignored, so `findFirstOrThrow` with no `where` just returned whichever tenant row came first.",
    },
    {
      type: "p",
      text: "`.env.example` had the right role, a restricted runtime role. My `.env` didn't. The API even noticed at startup and logged a warning that tenant isolation wasn't being enforced, then carried on serving. A warning thousands of lines above the first request isn't a guardrail.",
    },
    { type: "h2", text: "The fix" },
    {
      type: "p",
      text: "The application connects as a role that is `NOSUPERUSER` and `NOBYPASSRLS`. Migrations still run as the owner, because they need to. Only the connection that serves requests is restricted.",
    },
    {
      type: "p",
      text: "Then, so it can't happen quietly again, our setup check asks Postgres what the role can actually do instead of trusting its name:",
    },
    {
      type: "code",
      lang: "sql",
      code: "select rolbypassrls, rolsuper\nfrom pg_roles\nwhere rolname = current_user;",
    },
    {
      type: "p",
      text: "If either is true, that's a failure, not a warning. If the database can't be reached, the check falls back to guessing from the role name (`postgres`, `*_owner` and so on) and says clearly that it couldn't confirm.",
    },
    { type: "h2", text: "What I'd tell anyone using RLS" },
    {
      type: "list",
      items: [
        "If one mechanism is your whole security boundary, check its precondition. Don't assume it.",
        "Check the property, not the name. A role called `app` can still have `BYPASSRLS`.",
        "Make it loud. A misconfigured role in production should stop the app from starting, not leave a line in a log nobody reads.",
        "If you ever move away from RLS-only isolation, add the `where tenantId` clauses in the same change. Not later.",
      ],
    },
    {
      type: "p",
      text: "I found this by accident, while looking at something else entirely. That's the part that stays with me. The scary bugs in multi-tenant systems don't throw. They return a perfectly normal-looking row that belongs to someone else.",
    },
  ],
};
