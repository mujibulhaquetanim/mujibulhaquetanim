import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, Instrument_Serif, JetBrains_Mono, Syne } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { KineticFx } from "@/components/kinetic-fx";
import { site } from "@/content/site";
import { jsonLd, siteJsonLd } from "@/lib/seo";
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

// Paper's editorial headings and Kinetic's display face. Like the Bento fonts, they are
// only fetched when a page in that theme uses them.
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  preload: false,
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}, ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  // Defaults for pages without their own; pages set full blocks via pageMetadata().
  openGraph: { type: "website", locale: "en_US", siteName: site.name },
  twitter: { card: "summary_large_image", creator: "@mmhtanim" },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "technology",
  keywords: [
    site.name,
    site.shortName,
    "Full-Stack AI Engineer",
    "Full-stack developer Bangladesh",
    "NestJS developer",
    "Next.js developer",
    "TypeScript",
    "Multi-tenant SaaS",
    "AI agents",
    "RAG",
    "WebRTC",
    "Chattogram",
  ],
  // Indexing is the default; stating it here would contradict the noindex Next adds to 404s.
  robots: { "max-image-preview": "large", "max-snippet": -1 },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  // Matches the default (Bento) page colour.
  themeColor: "#334155",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-theme is set by the boot script before React hydrates, hence suppressHydrationWarning.
    <html
      lang="en"
      className={`${jetbrains.variable} ${plex.variable} ${bricolage.variable} ${instrument.variable} ${syne.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <div aria-hidden className="theme-fx" />
        <KineticFx />
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
          dangerouslySetInnerHTML={{ __html: jsonLd(siteJsonLd) }}
        />
      </body>
    </html>
  );
}
