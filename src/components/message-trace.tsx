"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Step = { title: string; detail: string };
type Scenario = {
  label: string;
  incoming: { text: string; gloss: string };
  steps: Step[];
  outcome:
    | { kind: "reply"; text: string; gloss: string }
    | { kind: "handoff"; text: string; gloss: string };
};

// Illustrative only: the shop, order number and price are made up.
const SCENARIOS: Record<"question" | "refund", Scenario> = {
  question: {
    label: "Product question",
    incoming: {
      text: "Apu, blue kurti ta XL e ache? Dam koto?",
      gloss: "Is the blue kurti available in XL? How much is it?",
    },
    steps: [
      { title: "Receive", detail: "POST /webhooks/whatsapp, queued" },
      { title: "Find the business", detail: "tenant rangdhanu-fashion, RLS on" },
      { title: "Search the catalogue", detail: "\"blue kurti\" 3 matches, XL in stock" },
      { title: "Check policy", detail: "product question, safe to answer" },
      { title: "Reply and log", detail: "sent on WhatsApp, audit entry written" },
    ],
    outcome: {
      kind: "reply",
      text: "Ji apu, blue kurti ta XL e stock e ache. Dam 1,450 taka. Order korte address ta diben?",
      gloss: "Yes, it's in stock in XL for 1,450 taka. Can you share your address to order?",
    },
  },
  refund: {
    label: "Refund request",
    incoming: {
      text: "Kalke je order ta pelam oita damaged. Refund chai.",
      gloss: "The order I got yesterday is damaged. I want a refund.",
    },
    steps: [
      { title: "Receive", detail: "POST /webhooks/messenger, queued" },
      { title: "Find the business", detail: "tenant rangdhanu-fashion, RLS on" },
      { title: "Look up the order", detail: "order #4821, delivered yesterday" },
      { title: "Check policy", detail: "refund request, needs a person" },
      { title: "Hand off and log", detail: "assigned to team inbox, audit entry written" },
    ],
    outcome: {
      kind: "handoff",
      text: "Dukkhito apu. Order ta amader team ke pathiye dilam, ekjon kichukkhon er moddhe janabe.",
      gloss: "Sorry about that. I've passed it to the team; someone will reply shortly.",
    },
  },
};

const STEP_MS = 720;

export function MessageTrace() {
  const reduceMotion = useReducedMotion();
  const [scenarioKey, setScenarioKey] = useState<keyof typeof SCENARIOS>("question");
  const [run, setRun] = useState(0);
  // -1 = message just arrived; steps.length = finished.
  const [progress, setProgress] = useState(-1);

  const scenario = SCENARIOS[scenarioKey];
  const total = scenario.steps.length;
  const shown = reduceMotion ? total : progress;
  const finished = shown >= total;

  useEffect(() => {
    if (reduceMotion) return;
    let i = -1;
    const id = window.setInterval(() => {
      i += 1;
      setProgress(i);
      if (i >= total) window.clearInterval(id);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [scenarioKey, run, total, reduceMotion]);

  return (
    <figure className="rounded-[10px] border border-line bg-paper-2/60 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <figcaption className="text-sm font-semibold sm:text-[0.9375rem]">
          One message through Zasmate
        </figcaption>
        <button
          type="button"
          onClick={() => {
            setProgress(-1);
            setRun((n) => n + 1);
          }}
          disabled={!finished}
          className="rounded-md px-2 py-1 text-sm text-ink-2 transition-colors hover:text-ink disabled:opacity-40"
        >
          Replay
        </button>
      </div>

      <div className="mt-3 flex gap-1 rounded-lg bg-paper p-1 text-sm" role="group" aria-label="Choose a message">
        {(Object.keys(SCENARIOS) as (keyof typeof SCENARIOS)[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={scenarioKey === key}
            onClick={() => {
              setScenarioKey(key);
              setProgress(-1);
              setRun((n) => n + 1);
            }}
            className={`flex-1 rounded-md px-3 py-1.5 font-medium transition-colors ${
              scenarioKey === key ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
            }`}
          >
            {SCENARIOS[key].label}
          </button>
        ))}
      </div>

      {/* Incoming customer message */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${scenarioKey}-${run}-in`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-4 max-w-[88%]"
        >
          <p className="rounded-2xl rounded-bl-sm bg-paper px-3.5 py-2.5 text-[0.9375rem] leading-snug">
            {scenario.incoming.text}
          </p>
          <p className="mt-1 pl-1 text-xs text-ink-2">{scenario.incoming.gloss}</p>
        </motion.div>
      </AnimatePresence>

      {/* The pipeline: each stage lights up as the message reaches it */}
      <ol className="mt-4 space-y-0">
        {scenario.steps.map((step, i) => {
          const state = i < shown ? "done" : i === shown ? "active" : "pending";
          const isHandoff = scenario.outcome.kind === "handoff" && i >= total - 2;
          return (
            <li key={step.title} className="relative flex gap-3 pb-3 last:pb-0">
              {i < total - 1 && (
                <span
                  aria-hidden
                  className={`absolute left-[7px] top-5 bottom-0 w-px transition-colors duration-300 ${
                    state === "done" ? "bg-accent" : "bg-line"
                  }`}
                />
              )}
              <span
                aria-hidden
                className={`relative mt-1 grid size-[15px] shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
                  state === "done"
                    ? isHandoff
                      ? "border-marigold bg-marigold"
                      : "border-accent bg-accent"
                    : state === "active"
                      ? "border-marigold bg-paper"
                      : "border-line bg-paper"
                }`}
              >
                {state === "active" && (
                  <span className="absolute inset-[-5px] animate-ping rounded-full border border-marigold" />
                )}
              </span>
              <div className={`min-w-0 transition-opacity duration-300 ${state === "pending" ? "opacity-45" : ""}`}>
                <p className="text-[0.9375rem] font-medium leading-tight">
                  {step.title}
                  <span className="sr-only">{state === "done" ? ", done" : state === "active" ? ", in progress" : ""}</span>
                </p>
                <p
                  className={`mt-0.5 truncate font-mono text-[0.75rem] ${
                    isHandoff && state !== "pending" ? "text-marigold-ink" : "text-ink-2"
                  }`}
                >
                  {step.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Outcome: an automatic reply, or a handoff to a person */}
      <div className="mt-4 min-h-[5.5rem]" aria-live="polite">
        <AnimatePresence>
          {finished && (
            <motion.div
              key={`${scenarioKey}-${run}-out`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="ml-auto max-w-[88%]"
            >
              {scenario.outcome.kind === "handoff" && (
                <p className="mb-1.5 text-right text-xs font-medium text-ink-2">
                  Sent to a person in the team inbox
                </p>
              )}
              <p className="rounded-2xl rounded-br-sm bg-accent px-3.5 py-2.5 text-[0.9375rem] leading-snug text-paper">
                {scenario.outcome.text}
              </p>
              <p className="mt-1 pr-1 text-right text-xs text-ink-2">{scenario.outcome.gloss}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-3 border-t border-line pt-3 text-xs text-ink-2">
        A simplified view of the real flow. The shop, order and price are made up.
      </p>
    </figure>
  );
}
