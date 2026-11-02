import type { Post } from "@/content/posts";

export const ragFailuresLookEmpty: Post = {
  slug: "rag-failures-look-empty",
  title: "When retrieval fails, the AI agent should stop talking",
  excerpt:
    "Two bugs from Zasmate's AI agent: an embeddings outage that made it publish made-up prices on public posts, and a separator row that quietly switched off human handoff.",
  topics: ["AI agents", "RAG", "pgvector"],
  readMinutes: 6,
  status: "published",
  date: "2026-11-03",
  body: [
    {
      type: "p",
      text: "Zasmate's agent answers customers from each vendor's own catalogue and policies. That's retrieval-augmented generation: find the relevant chunks in the vendor's knowledge base, then let the model answer from them. If it isn't sure, it hands the conversation to a person.",
    },
    {
      type: "p",
      text: "Both bugs below came from the same mistake. A failure looked exactly like an empty result, and the code was polite to empty results.",
    },
    { type: "h2", text: "The outage that looked like an empty knowledge base" },
    {
      type: "p",
      text: "Our embeddings provider had a short outage. During it, comment automation kept replying to Facebook and Instagram comments, confident and in the vendor's voice, with delivery times, prices and policies the model made up. These were public threads, under the vendor's name, with nobody approving them. The only trace was a warning in the logs.",
    },
    {
      type: "p",
      text: "The retrieval step caught the error and returned the same value as \"nothing found\":",
    },
    {
      type: "code",
      lang: "ts",
      code: "} catch (err) {\n  this.logger.warn(\"Comment KB retrieval failed\", err);\n  return { kbContext: \"\" }; // same as \"this vendor has no KB\"\n}",
    },
    {
      type: "p",
      text: "The drafting step then looked at that empty string and used the instruction for vendors with no knowledge base: keep the reply general and don't invent specifics. That's right for a new vendor. For a vendor with a full catalogue we just couldn't reach, \"keep it general\" on a question like \"how much is the blue kurti?\" is an open invitation to guess.",
    },
    {
      type: "p",
      text: "The annoying part is that the chat path already had a guard for exactly this. It checks whether the vendor actually has embedded content before deciding an empty result is fine. The comment path was written later, copied the shape and skipped the guard. The code comment even said a failed lookup was fine because replies are held for approval anyway. They weren't. Vendors inside their auto-reply allowance post without approval. That's the whole point of the allowance.",
    },
    {
      type: "p",
      text: "Now the failure travels as its own flag, and if the vendor has a real knowledge base the reply is held for a person with the reason `grounding_unavailable`. We don't even spend an LLM call drafting it.",
    },
    {
      type: "code",
      lang: "ts",
      code: "// retrieval step\nreturn { kbContext: \"\", retrievalFailed: true };\n\n// before drafting\nif (s.retrievalFailed && (await this.retrieval.hasEmbeddedContent(s.tenantId))) {\n  return { outcome: { ...s.outcome, requiresApproval: true,\n    reasons: [...s.outcome.reasons, \"grounding_unavailable\"] } };\n}",
    },
    { type: "h2", text: "The separator row that switched off handoff" },
    {
      type: "p",
      text: "The agent hands off to a person when its best retrieval score is below the vendor's threshold. For some vendors that simply stopped happening. It kept answering questions it should have passed on, and changing the threshold did nothing.",
    },
    {
      type: "p",
      text: "It took a chain of three reasonable things to break it:",
    },
    {
      type: "list",
      items: [
        "A chunk with no letters or digits, like a `-----` separator row or an emoji-only line, normalises to a vector of all zeros in our local embedding mode.",
        "Ingest stored that zero vector without complaint.",
        "pgvector's cosine distance against a zero vector is `NaN`.",
      ],
    },
    {
      type: "code",
      lang: "ts",
      code: "const best = chunks.reduce((m, c) => Math.max(m, c.score), 0); // NaN\nif (best < profile.escalationMinScore) escalate();              // NaN < x is false",
    },
    {
      type: "p",
      text: "`Math.max` with a `NaN` gives `NaN`, and every comparison with `NaN` is false. So one junk row in a vendor's spreadsheet could switch off a safety gate for any question that pulled it in. The query side already refused zero vectors, with a comment explaining the NaN problem. Ingest never got the same guard.",
    },
    {
      type: "p",
      text: "Now ingest doesn't store zero vectors. The chunk row is still saved so keyword search can find the text, it just has no embedding, and vector search already skips rows without one. I didn't want to reject the whole upload over a separator row, and fixing `NaN` at read time would have left bad data for the next person to trip on.",
    },
    { type: "h2", text: "What I took from both" },
    {
      type: "list",
      items: [
        "\"Found nothing\" and \"couldn't look\" have to be different values. One empty string for both is how you build a confident liar.",
        "Write safety checks so the strange case escalates. `!(best >= min)` hands off on `NaN`; `best < min` doesn't.",
        "Public replies need a stricter path than private chat. A wrong DM is seen by one customer. A wrong comment is seen by everyone reading that post.",
        "When you copy a pattern into a new code path, copy its guards too. Both bugs were guards that existed one file away.",
      ],
    },
  ],
};
