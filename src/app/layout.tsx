import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CursorGlow } from "@/components/cursor-glow";
import { site, socials } from "@/content/site";
import { themeBootScript } from "@/lib/theme-config";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// The Bento theme keeps the original site's typefaces. Not preloaded: browsers only
// fetch them when a bento-themed page actually uses them.
const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  // Optical sizing tightens the big headings, as on the original site.
  axes: ["opsz"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name}, ${site.role}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", creator: "@mmhtanim" },
};

export const viewport: Viewport = {
  // Matches the default (Bento) page colour.
  themeColor: "#334155",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  worksFor: { "@type": "Organization", ...site.employer },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chattogram",
    addressCountry: "BD",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "International Islamic University Chittagong" },
    { "@type": "CollegeOrUniversity", name: "Port City International University" },
  ],
  sameAs: socials.map((s) => s.url),
  knowsAbout: ["TypeScript", "NestJS", "Next.js", "PostgreSQL", "WebRTC", "LangGraph", "AWS"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set by the boot script before React hydrates, hence suppressHydrationWarning.
    <html
      lang="en"
      className={`${jetbrains.variable} ${plex.variable} ${bricolage.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <div aria-hidden className="theme-fx" />
        <CursorGlow />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static site data only; "<" is escaped so the JSON can never close the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
