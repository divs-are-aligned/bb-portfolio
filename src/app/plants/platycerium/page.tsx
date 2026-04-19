import type { Metadata } from "next";
import { Platycerium } from "@/components/sections/Platycerium";
import { Animations } from "@/components/shared/Animations";
import { platyceriums, difficultyLabel } from "@/data/platycerium";

const SITE_URL = "https://bartbudak.io";
const PAGE_URL = `${SITE_URL}/plants/platycerium/`;

const TITLE = "Platycerium Catalog — Staghorn Fern Care Guide";
const DESCRIPTION =
  "A growing catalog of 18 Platycerium species (staghorn ferns), dedicated to Herb Halling. Care difficulty, native origin, propagation, biogeographical region, and notable hybrids for each species.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/plants/platycerium/",
  },
  keywords: [
    "Platycerium",
    "staghorn fern",
    "elkhorn fern",
    "fern care",
    "Platycerium bifurcatum",
    "Platycerium andinum",
    "Platycerium ridleyi",
    "Platycerium coronarium",
    "Platycerium grande",
    "Platycerium wandae",
    "fern propagation",
    "Herb Halling",
    "halling.com",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Bart Budak",
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  inLanguage: "en-US",
  about: {
    "@type": "Thing",
    name: "Platycerium",
    sameAs: "https://en.wikipedia.org/wiki/Platycerium",
  },
  isBasedOn: {
    "@type": "CreativeWork",
    name: "halling.com Platyceriums",
    url: "https://www.halling.com/Platyceriums/",
    author: { "@type": "Person", name: "Herb Halling" },
  },
  hasPart: platyceriums.map((p) => ({
    "@type": "Thing",
    name: p.scientificName,
    identifier: p.slug,
    alternateName: p.commonNames ?? [],
    description: p.summary ?? p.notes ?? undefined,
    additionalType: "https://schema.org/Species",
    url: `${PAGE_URL}#platycerium-${p.slug}`,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Plants",
      item: `${SITE_URL}/plants/`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Platycerium",
      item: PAGE_URL,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: platyceriums
    .filter((p) => p.difficultyReason)
    .map((p) => ({
      "@type": "Question",
      name: `Why is ${p.scientificName} care difficulty level ${p.difficulty} (${difficultyLabel[p.difficulty]})?`,
      acceptedAnswer: {
        "@type": "Answer",
        text: p.difficultyReason,
      },
    })),
};

export default function PlatyceriumPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Animations />
      <Platycerium />
    </>
  );
}
