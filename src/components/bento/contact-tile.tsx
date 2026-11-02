"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FaGithub, FaKaggle, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrArticle } from "react-icons/gr";
import { LuCheck, LuCopy } from "react-icons/lu";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

const SOCIALS = [
  { icon: FaLinkedin, label: "LinkedIn profile", url: "https://www.linkedin.com/in/mujibulhaquetanim/" },
  { icon: FaGithub, label: "GitHub profile", url: "https://github.com/mujibulhaquetanim" },
  { icon: FaXTwitter, label: "X (Twitter) profile", url: "https://twitter.com/mmhtanim" },
  { icon: FaKaggle, label: "Kaggle profile", url: "https://www.kaggle.com/mujibulhaque" },
];

const iconButton =
  "group/icon grid size-10 place-items-center rounded-xl border border-white/10 bg-black/15 text-white transition-all duration-300 ease-out-quint hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 active:scale-95 xl:size-11 short:size-9";
const iconClass = "size-5 transition-transform duration-300 ease-out-quint group-hover/icon:scale-110 xl:size-6";

export function ContactTile() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; fall back to the mail client.
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <section aria-label="Contact" className="tile flex h-full flex-wrap items-center justify-between gap-3 px-4 py-3 lg:py-2 xl:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight tracking-tight text-white lg:text-base xl:text-xl">
            <Link href="/contact" className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
              Let&apos;s talk
            </Link>
          </h2>
          <p className="truncate text-[11px] text-slate-300 xl:text-xs">{site.email}</p>
        </div>
        <button
          type="button"
          onClick={copyEmail}
          aria-label={`Copy email address ${site.email}`}
          className="btn-press shrink-0 px-3 py-1.5 text-xs xl:text-sm"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "done" : "copy"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1.5"
            >
              {copied ? <LuCheck aria-hidden className="size-4 text-signal" /> : <LuCopy aria-hidden className="size-4" />}
              {copied ? "Copied" : "Copy email"}
            </motion.span>
          </AnimatePresence>
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? "Email address copied" : ""}
        </span>
      </div>

      <ul className="flex items-center gap-2">
        {SOCIALS.map(({ icon: Icon, label, url }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={iconButton}>
              <Icon aria-hidden className={iconClass} />
            </a>
          </li>
        ))}
        <li>
          <Link href="/writing" aria-label={`Writing: ${posts.filter((p) => p.body).length} articles`} title="Writing" className={iconButton}>
            <GrArticle aria-hidden className={`${iconClass} group-hover/icon:-rotate-6`} />
          </Link>
        </li>
      </ul>
    </section>
  );
}
