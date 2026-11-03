import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";

/*
  Node gives each address of a host only 250 ms to connect before moving on. Without an
  IPv6 route that attempt fails at once, and a TCP handshake from Bangladesh to the GitHub
  contributions API (in Germany) often takes longer than 250 ms, so fetch failed outright
  ("fetch failed", ETIMEDOUT) and the calendar fell back to its message.
  Imported for its side effect: by instrumentation.ts for the running server, and by
  lib/github.ts for build workers, which don't run instrumentation.
*/
setDefaultAutoSelectFamilyAttemptTimeout(2000);
