import type { Metadata } from "next";
import { Animations } from "@/components/shared/Animations";
import {
  SectionWrapper,
  SectionHeading,
} from "@/components/shared/SectionWrapper";

const TITLE = "Plants";
const DESCRIPTION =
  "Bart Budak's plant corner — a Platycerium catalog, care resources, and a plant-help hotline for friends and family.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/plants/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://bartbudak.io/plants/",
    siteName: "Bart Budak",
    locale: "en_US",
    type: "website",
  },
};

const CARDS = [
  {
    href: "/plants/platycerium/",
    title: "Platycerium Catalog",
    description:
      "All 18 species of staghorn fern — care difficulty, native origin, propagation, and notable hybrids.",
    label: "Catalog",
  },
  {
    href: "/plants/help/",
    title: "Plant S.O.S.",
    description:
      "Something dying? Upload a photo, answer a few quick questions, and I'll take a look.",
    label: "S.O.S.",
  },
] as const;

export default function PlantsPage() {
  return (
    <>
      <Animations />
      <SectionWrapper id="plants">
        <SectionHeading>Plants</SectionHeading>
        <p className="mb-12 max-w-2xl text-muted-foreground">
          A small but growing corner of the site dedicated to the green things I
          keep alive (mostly). Browse the catalog or send an S.O.S. if your
          plant needs help.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {CARDS.map((card) => (
            <a
              key={card.href}
              href={card.href}
              className="group rounded-lg border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/60"
            >
              <div className="mb-4 font-mono text-3xl font-medium uppercase tracking-tight text-primary">
                {card.label}
              </div>
              <h3 className="mb-2 font-heading text-xl font-medium transition-colors group-hover:text-primary">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
              <span className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.1em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                View &rarr;
              </span>
            </a>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
