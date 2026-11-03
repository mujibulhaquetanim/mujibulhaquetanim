"use server";

import { site } from "@/content/site";
import { emailConfig, emailHtml, escapeHtml, resend } from "@/lib/email";
import { filledTooFast, rateLimited } from "@/lib/rate-limit";
import { issueToken, readToken } from "@/lib/signed-token";
import { checkEmail } from "@/lib/validate-email";

export type FormState = { status: "idle" | "ok" | "error"; message: string };

const NOT_SET_UP: FormState = {
  status: "error",
  message: `Email isn't set up on this site yet. Write to me directly at ${site.email}.`,
};
// Shown to anything that trips the bot checks. Deliberately looks like success.
const QUIET_OK: FormState = { status: "ok", message: "Thanks. Check your inbox." };

/*
  Subscribe, step 1: nothing is stored yet. We only send a confirmation link; the address
  joins the list when its owner clicks it (double opt-in), which proves it is real and theirs.
*/
export async function subscribe(_: FormState, form: FormData): Promise<FormState> {
  if (form.get("website") || filledTooFast(form.get("startedAt"))) return QUIET_OK;
  if (await rateLimited("subscribe", 5, 3_600_000)) {
    return { status: "error", message: "Too many tries from here. Please wait a while and try again." };
  }

  const checked = await checkEmail(String(form.get("email") ?? ""));
  if (!checked.ok) return { status: "error", message: checked.reason };

  const client = resend();
  const token = issueToken(checked.email, "subscribe");
  if (!client || !token || !emailConfig.segmentId) return NOT_SET_UP;

  const link = `${site.url}/subscribe/confirm?token=${encodeURIComponent(token)}`;
  const { error } = await client.emails.send({
    from: emailConfig.from,
    to: checked.email,
    subject: "Confirm your subscription",
    html: emailHtml(`
      <h1 style="font-size:20px;margin:0 0 12px">One click to confirm</h1>
      <p style="line-height:1.6;margin:0 0 20px">You asked to hear when I publish something new on
      ${escapeHtml(site.url.replace("https://", ""))}. Confirm and you'll get an email when a new
      article goes up, nothing else.</p>
      <p style="margin:0 0 20px"><a href="${link}" style="display:inline-block;background:#0f172a;color:#ffffff;
      padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Confirm subscription</a></p>
      <p style="font-size:13px;color:#64748b;line-height:1.6;margin:0">The link works for 48 hours. If this
      wasn't you, ignore this email and nothing happens.</p>`),
    text: `Confirm your subscription to ${site.name}'s writing: ${link}\n\nThe link works for 48 hours. If this wasn't you, ignore this email.`,
  });
  if (error) return { status: "error", message: "The confirmation email couldn't be sent. Please try again later." };

  return { status: "ok", message: `Almost done. I sent a confirmation link to ${checked.email}.` };
}

// Subscribe, step 2: the link was clicked and the button pressed, so the address is real.
export async function confirmSubscription(token: string): Promise<FormState> {
  const email = readToken(token, "subscribe");
  if (!email) {
    return { status: "error", message: "This link has expired or isn't valid. Subscribe again for a fresh one." };
  }
  const client = resend();
  if (!client || !emailConfig.segmentId) return NOT_SET_UP;

  const existing = await client.contacts.get({ email });
  if (existing.data) {
    // Someone who unsubscribed and came back: switch them on and make sure they're in the list.
    await client.contacts.update({ email, unsubscribed: false });
    await client.contacts.segments.add({ email, segmentId: emailConfig.segmentId });
  } else {
    const { error } = await client.contacts.create({ email, unsubscribed: false, segments: [{ id: emailConfig.segmentId }] });
    if (error) return { status: "error", message: "Something went wrong saving your subscription. Please try again." };
  }
  return { status: "ok", message: `You're subscribed. New articles will go to ${email}.` };
}

const LIMITS = { name: 100, message: 5000 };

export async function sendMessage(_: FormState, form: FormData): Promise<FormState> {
  if (form.get("website") || filledTooFast(form.get("startedAt"))) return { status: "ok", message: "Thanks, your message is on its way." };
  if (await rateLimited("contact", 3, 3_600_000)) {
    return { status: "error", message: `Too many messages from here. Please email me at ${site.email} instead.` };
  }

  const name = String(form.get("name") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  if (!name || name.length > LIMITS.name) return { status: "error", message: "Please add your name." };
  if (message.length < 10) return { status: "error", message: "Please write a little more so I can help." };
  if (message.length > LIMITS.message) return { status: "error", message: "That message is too long. Please keep it under 5,000 characters." };

  const checked = await checkEmail(String(form.get("email") ?? ""));
  if (!checked.ok) return { status: "error", message: checked.reason };

  const client = resend();
  if (!client) return NOT_SET_UP;

  const { error } = await client.emails.send({
    from: emailConfig.from,
    to: emailConfig.to,
    replyTo: checked.email,
    subject: `Portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
    html: emailHtml(`
      <p style="margin:0 0 4px;font-weight:600">${escapeHtml(name)}</p>
      <p style="margin:0 0 16px;color:#64748b">${escapeHtml(checked.email)}</p>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(message)}</p>`),
    text: `${name} <${checked.email}>\n\n${message}`,
  });
  if (error) return { status: "error", message: `The message couldn't be sent. Please email me at ${site.email}.` };

  return { status: "ok", message: "Thanks, your message is on its way." };
}
