import "server-only";
import { headers } from "next/headers";

/*
  Best-effort limit on form submissions per visitor: a fixed window kept in memory. On
  serverless each instance has its own memory, so this slows a script down rather than
  stopping a determined one; the honeypot, timing check and double opt-in do the rest.
*/
const hits = new Map<string, { count: number; reset: number }>();

export async function rateLimited(bucket: string, limit: number, windowMs: number) {
  const h = await headers();
  const ip =
    h.get("x-nf-client-connection-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  if (hits.size > 5000) hits.clear();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

// Bots fill forms instantly; people take at least a couple of seconds. `startedAt` is set
// when the form renders. Missing or odd values are treated as a bot.
export function filledTooFast(startedAt: FormDataEntryValue | null, minMs = 2500) {
  const t = Number(startedAt);
  return !Number.isFinite(t) || Date.now() - t < minMs || Date.now() - t > 86_400_000;
}
