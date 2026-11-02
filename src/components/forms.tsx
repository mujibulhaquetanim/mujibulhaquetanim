"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, subscribe, type FormState } from "@/app/actions";

const idle: FormState = { status: "idle", message: "" };

const field =
  "w-full rounded-md border border-line bg-paper px-3 py-2 text-ink placeholder:text-ink-2/70 focus:border-accent focus:outline-none";

// Hidden from people, tempting to bots. Filled in means the submission is dropped.
function BotTraps() {
  // When the form became usable, read by the server to reject instant submissions. Set
  // after mount: reading the clock while rendering would differ between server and client.
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);
  return (
    <>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="" />
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
    </>
  );
}

function Status({ state }: { state: FormState }) {
  return (
    <p
      role={state.status === "error" ? "alert" : "status"}
      aria-live="polite"
      className={`text-[0.9375rem] ${state.status === "error" ? "text-marigold-ink" : "text-ink-2"}`}
    >
      {state.message}
    </p>
  );
}

export function SubscribeForm({ title = "Get new articles by email", note }: { title?: string; note?: string }) {
  const [state, action, pending] = useActionState(subscribe, idle);
  return (
    <section aria-label={title} className="rounded-md border border-line p-5 sm:p-6">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-1 text-[0.9375rem] text-ink-2">
        {note ?? "One email when a new article goes up. Nothing else, and you can leave any time."}
      </p>
      {state.status === "ok" ? (
        <div className="mt-4">
          <Status state={state} />
        </div>
      ) : (
        <form action={action} className="relative mt-4 flex flex-col gap-3 sm:flex-row">
          <BotTraps />
          <label className="sr-only" htmlFor="subscribe-email">
            Email address
          </label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            placeholder="you@example.com"
            className={`${field} sm:max-w-sm`}
          />
          <button type="submit" disabled={pending} className="btn btn-solid shrink-0 disabled:opacity-60">
            {pending ? "Sending…" : "Subscribe"}
          </button>
        </form>
      )}
      {state.status === "error" && (
        <div className="mt-3">
          <Status state={state} />
        </div>
      )}
    </section>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, idle);
  if (state.status === "ok") return <Status state={state} />;
  return (
    <form action={action} className="relative grid max-w-[640px] gap-4">
      <BotTraps />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-[0.9375rem] font-bold">
          Name
          <input name="name" required maxLength={100} autoComplete="name" className={`${field} font-normal`} />
        </label>
        <label className="grid gap-1.5 text-[0.9375rem] font-bold">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={`${field} font-normal`}
          />
        </label>
      </div>
      <label className="grid gap-1.5 text-[0.9375rem] font-bold">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="What are you working on, and how can I help?"
          className={`${field} resize-y font-normal`}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn btn-solid disabled:opacity-60">
          {pending ? "Sending…" : "Send message"}
        </button>
        {state.status === "error" && <Status state={state} />}
      </div>
    </form>
  );
}
