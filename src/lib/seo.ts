import type { Metadata } from "next";
import { site, socials } from "@/content/site";

type OgImage = { url: string; width?: number; height?: number; alt?: string };

export const defaultImage: OgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}, ${site.role}`,
};

/*
  Next.js replaces nested metadata objects (openGraph, twitter) per segment instead of
  merging them, so every page builds its complete set here. Without a title the page
  keeps the root default ("Name, Role").
*/
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: OgImage;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name}, ${site.role}`;
  // The root opengraph-image only attaches to "/", so other pages point at it explicitly.
  const images = { images: [image ?? defaultImage] };
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      siteName: site.name,
      title: fullTitle,
      description,
      ...images,
    },
    twitter: { card: "summary_large_image", creator: "@mmhtanim", title: fullTitle, description, ...images },
  };
}

export const personId = `${site.url}/#person`;
const websiteId = `${site.url}/#website`;

const person = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  image: site.photo,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.description,
  worksFor: { "@type": "Organization", ...site.employer },
  address: { "@type": "PostalAddress", addressLocality: "Chattogram", addressCountry: "BD" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "International Islamic University Chittagong" },
    { "@type": "CollegeOrUniversity", name: "Port City International University" },
  ],
  sameAs: socials.map((s) => s.url),
  knowsAbout: [
    "TypeScript",
    "NestJS",
    "Next.js",
    "PostgreSQL",
    "Multi-tenant SaaS",
    "WebRTC",
    "Real-time systems",
    "LangGraph",
    "Retrieval-augmented generation",
    "AI agents",
    "AWS",
    "Docker",
  ],
};

// Site-wide structured data: who the site is about, and the site itself.
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    person,
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
  ],
};

// The home page is a profile page about one person; Google can show it as such in results.
export const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: site.url,
  name: `${site.name}, ${site.role}`,
  inLanguage: "en",
  isPartOf: { "@id": websiteId },
  mainEntity: person,
};

// JSON for a <script type="application/ld+json">; "<" is escaped so it can never close the tag.
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
