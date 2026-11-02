import "server-only";
import { Resend } from "resend";
import { site } from "@/content/site";

/*
  Email goes through Resend. Configuration lives in environment variables (see
  .env.example); without them the forms say email isn't set up rather than failing.
*/
export const emailConfig = {
  apiKey: process.env.RESEND_API_KEY,
  // The Resend segment that holds confirmed subscribers.
  segmentId: process.env.RESEND_SEGMENT_ID,
  from: process.env.EMAIL_FROM ?? `${site.name} <hello@mujibulhaquetanim.dev>`,
  // Where contact-form messages are delivered.
  to: process.env.EMAIL_TO ?? site.email,
};

let client: Resend | null = null;
export function resend() {
  if (!emailConfig.apiKey) return null;
  client ??= new Resend(emailConfig.apiKey);
  return client;
}

// Escape user input before it goes into an HTML email.
export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// One shared shell for every email, so they look like they come from the same place.
export function emailHtml(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a">
<div style="max-width:560px;margin:0 auto;padding:32px 20px">
<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:14px;padding:28px">${body}</div>
<p style="font-size:12px;color:#64748b;margin-top:16px">${escapeHtml(site.name)}, ${escapeHtml(site.role)} &middot; <a href="${site.url}" style="color:#64748b">${site.url.replace("https://", "")}</a></p>
</div></body></html>`;
}
