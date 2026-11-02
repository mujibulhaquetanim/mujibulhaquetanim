"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { confirmSubscription, type FormState } from "@/app/actions";

/*
  Confirming takes a button press, not just opening the link: mail scanners open every
  link in an email, and a plain GET would subscribe people who never clicked.
*/
export function ConfirmSubscription() {
  const token = useSearchParams().get("token") ?? "";
  const [result, setResult] = useState<FormState | null>(null);
  const [pending, startTransition] = useTransition();

  if (!token) {
    return (
      <p>
        This page needs the link from your confirmation email.{" "}
        <Link href="/writing" className="link text-ink">
          Subscribe on the writing page
        </Link>{" "}
        to get one.
      </p>
    );
  }

  if (result) {
    return (
      <div role="status">
        <p className={result.status === "error" ? "text-marigold-ink" : "text-ink"}>{result.message}</p>
        <Link href="/writing" className="btn btn-quiet mt-6">
          Read the latest writing
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>Press the button to start getting an email when I publish a new article.</p>
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(async () => setResult(await confirmSubscription(token)))}
        className="btn btn-solid mt-6 disabled:opacity-60"
      >
        {pending ? "Confirming…" : "Confirm subscription"}
      </button>
    </div>
  );
}
