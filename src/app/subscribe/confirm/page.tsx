import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmSubscription } from "./confirm-subscription";

export const metadata: Metadata = {
  title: "Confirm subscription",
  robots: { index: false, follow: false },
};

export default function ConfirmPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-20 sm:px-8 lg:pt-32">
      <h1 className="max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
        Confirm your subscription
      </h1>
      <div className="mt-6 max-w-[56ch] text-lg text-ink-2">
        {/* The token is in the URL, so it's read on the client; the page itself stays static. */}
        <Suspense fallback={<p>Checking your link…</p>}>
          <ConfirmSubscription />
        </Suspense>
      </div>
    </div>
  );
}
