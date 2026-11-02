"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      // Clipboard is blocked in some contexts; open the mail client instead.
      window.location.href = `mailto:${site.email}`;
    }
  }

  return (
    <button type="button" onClick={copy} className="btn btn-quiet min-w-[8.5rem] justify-center">
      <span aria-live="polite">{copied ? "Copied" : "Copy address"}</span>
    </button>
  );
}
