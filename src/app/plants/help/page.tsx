import type { Metadata } from "next";
import { PlantHelp } from "@/components/sections/PlantHelp";
import { Animations } from "@/components/shared/Animations";

const TITLE = "Plant S.O.S. — Send Me Your Sick Plants";
const DESCRIPTION =
  "Upload a photo of your struggling plant, answer a few quick diagnostic questions, and Bart will help you figure out what's going on.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/plants/help/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://bartbudak.io/plants/help/",
    siteName: "Bart Budak",
    locale: "en_US",
    type: "website",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://bartbudak.io",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Plants",
      item: "https://bartbudak.io/plants/",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Plant S.O.S.",
      item: "https://bartbudak.io/plants/help/",
    },
  ],
};

export default function PlantHelpPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Animations />
      <PlantHelp />
    </>
  );
}
