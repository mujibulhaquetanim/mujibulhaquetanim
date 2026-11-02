import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/*
  Short signed tokens for links in emails (double opt-in confirmation). Stateless: the
  email, purpose and expiry are inside the token, and the HMAC proves we issued it.
  SUBSCRIBE_SECRET must be a long random string; without it no token is issued or accepted.
*/
type Payload = { email: string; purpose: "subscribe"; exp: number };

const secret = () => {
  const s = process.env.SUBSCRIBE_SECRET;
  return s && s.length >= 32 ? s : null;
};

const sign = (data: string, key: string) => createHmac("sha256", key).update(data).digest("base64url");

export function issueToken(email: string, purpose: Payload["purpose"], ttlHours = 48): string | null {
  const key = secret();
  if (!key) return null;
  const data = Buffer.from(JSON.stringify({ email, purpose, exp: Date.now() + ttlHours * 3_600_000 })).toString("base64url");
  return `${data}.${sign(data, key)}`;
}

export function readToken(token: string, purpose: Payload["purpose"]): string | null {
  const key = secret();
  if (!key || token.length > 1024) return null;
  const [data, mac] = token.split(".");
  if (!data || !mac) return null;
  const expected = Buffer.from(sign(data, key));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as Payload;
    if (payload.purpose !== purpose || typeof payload.email !== "string" || payload.exp < Date.now()) return null;
    return payload.email;
  } catch {
    return null;
  }
}
