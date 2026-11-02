import type { Post } from "@/content/posts";

export const zasmateMetaIntegration: Post = {
  slug: "zasmate-meta-integration",
  title: "Connecting Zasmate to Meta: five times everything worked and nothing happened",
  excerpt:
    "The worst bugs I hit wiring Zasmate into Facebook, Instagram and Meta's app review weren't crashes. Every step said success and the feature still did nothing.",
  topics: ["Zasmate", "Meta Graph API", "Integrations"],
  readMinutes: 7,
  status: "published",
  date: "2026-11-03",
  body: [
    {
      type: "p",
      text: "Zasmate answers customer messages and comments for small businesses in Bangladesh, mostly on Facebook, Instagram and WhatsApp. That means most of the product sits on top of Meta's Graph API. I expected the hard part to be the AI. It wasn't. The hard part was a set of bugs where every request returned 200, every log line was green, and the feature still did nothing.",
    },
    {
      type: "p",
      text: "These are the five that cost me the most time, and what I check first now.",
    },
    { type: "h2", text: "1. The webhook passed verification and never fired" },
    {
      type: "p",
      text: "OAuth completed, the Page token was stored, Meta's \"Verify and save\" went green and the challenge request came back fine. Then someone commented on the Page and we got nothing. No log line, no row, no error anywhere.",
    },
    {
      type: "p",
      text: "Setting webhook fields on the app is not the same as subscribing a Page to the app. You also have to call `POST /{page-id}/subscribed_apps` for every Page you connect, and that call needs `pages_manage_metadata`, which is not in the \"Manage everything on your Page\" bundle. A token issued before you add the scope won't pick it up later either. The vendor has to connect again.",
    },
    {
      type: "list",
      items: [
        "Subscribe one field per call. If you send `feed,comments` together and one is refused, the whole call fails and you lose both.",
        "Meta's reference shows the response as `{\"success\":\"true\"}` with a string. The API actually returns a boolean. A strict `=== true` check would have marked every working subscription as failed, so accept both.",
        "Record which Pages failed to subscribe. A Page that connected but isn't subscribed has no other symptom.",
      ],
    },
    { type: "h2", text: "2. An empty list is not an answer" },
    {
      type: "p",
      text: "A new vendor signed up, clicked Connect, went through Facebook's whole consent dialog and came back to zero connected Pages. `me/accounts` had answered `{ \"data\": [] }` with a 200, and every step after it handled an empty list correctly.",
    },
    {
      type: "p",
      text: "That empty list can mean two things. Either the person really has no Page, or the app only has Standard Access to the Page permissions. Standard Access only works for people with a role on the app: admins, developers, testers. A real customer has no role, so Meta returns an empty list instead of an error. Advanced Access needs App Review, and App Review needs Business Verification. So the \"bug\" was partly paperwork.",
    },
    {
      type: "p",
      text: "The code fix was to stop treating the empty list as the end of the story. When it comes back empty, we read `me/permissions` and save which required scopes were not granted on the connect's audit row, which the vendor can see on their activity page. The check never throws, because a diagnosis that fails shouldn't fail the connect it's diagnosing.",
    },
    { type: "h2", text: "3. A private reply is messaging, not commenting" },
    {
      type: "p",
      text: "Public replies to comments worked. Private replies, where you DM the person who commented, failed. Our comment flow asked for comment scopes: `pages_read_engagement`, `pages_manage_engagement`, `instagram_manage_comments`. But a private reply is `POST /{page-id}/messages` with the comment id as the recipient. That's a messaging call, so it needs `pages_messaging` and a Page token with the messaging task. Obvious once you see it, but nothing in the error pointed there.",
    },
    { type: "h2", text: "4. The data deletion URL Meta's own crawler rejected" },
    {
      type: "p",
      text: "Meta requires a data deletion callback URL. Ours accepted `POST` and returned 404 for `GET`, and I had even written down why that was correct: no person should ever open it in a browser. Then the App Dashboard refused to save the URL.",
    },
    {
      type: "p",
      text: "The API logs showed `facebookexternalhit/1.1` sending a `GET` to it every time we pressed save. The dashboard checks the URL with a crawler and rejects anything that isn't a 2xx. I had reasoned about a human visitor, but the only caller that mattered was Meta. The endpoint now answers `GET` with a 200.",
    },
    { type: "h2", text: "5. A default that outlived its reason" },
    {
      type: "p",
      text: "In production, Instagram showed \"Not connected\" for a Page whose Instagram account was linked correctly. Reconnecting changed nothing.",
    },
    {
      type: "p",
      text: "An environment flag had the Instagram scopes switched off. It came from `.env.example`, where `false` was the right value back when Meta kept refusing `instagram_manage_comments`. Meta started accepting it, we updated the docs to say \"stop setting this to false\", and nobody changed the example file. Every new environment, production included, shipped with Instagram off. The dashboard made it worse: its only hint was \"link Instagram and connect again\", which could never help in that state.",
    },
    {
      type: "p",
      text: "The fix was small: flip the default, add an endpoint so the dashboard knows whether Instagram is available at all, and show the real reason instead of a retry hint.",
    },
    { type: "h2", text: "What I check first now" },
    {
      type: "list",
      items: [
        "A 200 with nothing in it is a state to name, not a success. If an empty result can mean \"none\" or \"not allowed\", find out which.",
        "Every Meta step gets an audit entry per Page. With this platform the common failure is silence, so the trail is the only evidence.",
        "I trust Meta's behaviour in the logs over Meta's docs, and over what I think a person would do.",
        "When the reason for a default goes away, the default changes in the same pull request as the docs.",
      ],
    },
    {
      type: "p",
      text: "None of this was clever. It was mostly reading logs carefully and refusing to accept \"it says connected\" as proof that something works.",
    },
  ],
};
