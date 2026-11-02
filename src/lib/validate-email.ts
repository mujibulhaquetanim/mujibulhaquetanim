import "server-only";
import { resolveMx } from "node:dns/promises";

// Practical address shape: one @, a dotted domain, no spaces. RFC 5321 caps the length at 254.
const SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/*
  Checks that an address is well formed and that its domain accepts mail (has MX records),
  so typos like gmial.com are caught before anything is sent. A DNS timeout counts as
  "can't tell" and lets the address through: double opt-in is the real proof.
*/
export async function checkEmail(raw: string): Promise<{ ok: true; email: string } | { ok: false; reason: string }> {
  const email = raw.trim().toLowerCase();
  if (!email || email.length > 254 || !SHAPE.test(email)) {
    return { ok: false, reason: "That doesn't look like an email address." };
  }
  const domain = email.split("@")[1];
  try {
    const records = await Promise.race([
      resolveMx(domain),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);
    if (records && records.length === 0) {
      return { ok: false, reason: `${domain} doesn't accept email. Is there a typo?` };
    }
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOTFOUND" || code === "ENODATA") {
      return { ok: false, reason: `${domain} doesn't accept email. Is there a typo?` };
    }
  }
  return { ok: true, email };
}
