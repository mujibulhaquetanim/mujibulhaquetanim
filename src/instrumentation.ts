// Runs once when a Next.js server starts.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // A longer per-address connect time for outgoing requests; see lib/network.ts.
    await import("@/lib/network");
  }
}
