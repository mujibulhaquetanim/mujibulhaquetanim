import { timingSafeEqual } from "node:crypto";
import { posts } from "@/content/posts";
import { site } from "@/content/site";
import { emailConfig, emailHtml, escapeHtml, resend } from "@/lib/email";

// Articles older than this are never announced, so a lost broadcast history can't
// email every subscriber about the whole archive.
const MAX_AGE_DAYS = 14;

const broadcastName = (slug: string) => `New article: ${slug}`;

function authorized(request: Request) {
  const secret = process.env.NOTIFY_SECRET;
  if (!secret || secret.length < 32) return false;
  const given = Buffer.from(request.headers.get("authorization")?.replace(/^Bearer /, "") ?? "");
  const expected = Buffer.from(secret);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/*
  Announces new articles to confirmed subscribers. Called after each production deploy
  (.github/workflows/notify-subscribers.yml) and safe to call any number of times: an
  article whose broadcast already exists in Resend is skipped. Resend queues the actual
  sending, respects its rate limits and adds the unsubscribe link.
*/
export async function POST(request: Request) {
  if (!authorized(request)) return Response.json({ error: "unauthorized" }, { status: 401 });
  const client = resend();
  if (!client || !emailConfig.segmentId) return Response.json({ error: "email not configured" }, { status: 503 });

  const listed = await client.broadcasts.list({ limit: 100 });
  if (listed.error) return Response.json({ error: listed.error.message }, { status: 502 });
  const sent = new Set(listed.data.data.map((b) => b.name));

  const cutoff = Date.now() - MAX_AGE_DAYS * 86_400_000;
  const due = posts.filter(
    (p) => p.body && p.date && new Date(p.date).getTime() >= cutoff && !sent.has(broadcastName(p.slug)),
  );

  const results = [];
  for (const post of due) {
    const url = `${site.url}/writing/${post.slug}`;
    const { data, error } = await client.broadcasts.create({
      name: broadcastName(post.slug),
      segmentId: emailConfig.segmentId,
      from: emailConfig.from,
      subject: post.title,
      previewText: post.excerpt,
      html: emailHtml(`
        <p style="font-size:13px;color:#64748b;margin:0 0 8px">New article, ${post.readMinutes} minute read</p>
        <h1 style="font-size:22px;line-height:1.3;margin:0 0 12px">${escapeHtml(post.title)}</h1>
        <p style="line-height:1.6;margin:0 0 20px">${escapeHtml(post.excerpt)}</p>
        <p style="margin:0 0 24px"><a href="${url}" style="display:inline-block;background:#0f172a;color:#ffffff;
        padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Read it</a></p>
        <p style="font-size:12px;color:#64748b;margin:0">You get this because you subscribed to new articles.
        <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#64748b">Unsubscribe</a>.</p>`),
      text: `${post.title}\n\n${post.excerpt}\n\nRead it: ${url}\n\nUnsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}`,
      send: true,
    });
    results.push({ slug: post.slug, ok: !error, id: data?.id, error: error?.message });
  }

  return Response.json({ announced: results, skipped: posts.length - due.length });
}
