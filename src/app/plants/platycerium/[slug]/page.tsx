import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platyceriums, difficultyLabel, regionLabel } from "@/data/platycerium";
import { speciesCareCards } from "@/data/platyceriumCare";
import { speciesImages, platyceriumImageUrl } from "@/data/platyceriumImages";
import { Animations } from "@/components/shared/Animations";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { EnrichedText } from "@/components/shared/EnrichedText";
import { SpeciesGallery } from "@/components/shared/SpeciesGallery";
import { CollapsibleSections } from "@/components/shared/CollapsibleReferenceSections";

const SITE_URL = "https://bartbudak.io";

export function generateStaticParams() {
  return platyceriums
    .filter((p) => p.dataFilled)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = platyceriums.find((s) => s.slug === slug);
  if (!p) return {};
  const title = `${p.scientificName} — Platycerium Care Guide`;
  const description =
    p.summary ??
    `Care guide for ${p.scientificName}, a ${difficultyLabel[p.difficulty].toLowerCase()} staghorn fern.`;
  return {
    title,
    description,
    alternates: { canonical: `/plants/platycerium/${slug}/` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/plants/platycerium/${slug}/`,
      siteName: "Bart Budak",
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function SpeciesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = platyceriums.find((s) => s.slug === slug);
  if (!p) notFound();

  const care = speciesCareCards.find((c) => c.slug === slug);
  const images = speciesImages[slug] ?? [];

  const propagationLabel = {
    pups: "Pups",
    spore: "Spore",
    both: "Pups & spore",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Plants", item: `${SITE_URL}/plants/` },
      { "@type": "ListItem", position: 3, name: "Platycerium", item: `${SITE_URL}/plants/platycerium/` },
      { "@type": "ListItem", position: 4, name: p.scientificName, item: `${SITE_URL}/plants/platycerium/${slug}/` },
    ],
  };

  /* ── Related species cards ───────────────────────────── */
  const relatives = (p.closestRelatives ?? [])
    .map((r) => {
      const relSlug = r.replace(/^P\.\s*/, "").toLowerCase().trim();
      return platyceriums.find((s) => s.slug === relSlug && s.dataFilled);
    })
    .filter(Boolean) as typeof platyceriums;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Animations />
      <SectionWrapper id={`species-${slug}`}>
        {/* ── Back link ────────────────────────────────── */}
        <a
          href="/plants/platycerium/"
          className="mb-4 inline-block font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          &larr; Back to catalog
        </a>

        {/* ── Header ───────────────────────────────────── */}
        <h1 className="font-heading text-4xl font-medium italic leading-tight sm:text-5xl">
          {p.scientificName}
        </h1>
        {p.commonNames && p.commonNames.length > 0 && (
          <p className="mt-2 text-lg text-muted-foreground">
            {p.commonNames.join(" / ")}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <DifficultyBadge level={p.difficulty} />
          {p.isBigFive && (
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-primary">
              Big Five
            </span>
          )}
          {p.isHybrid && (
            <span className="rounded-full border border-border/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Named hybrid
            </span>
          )}
        </div>

        {/* ── Images ───────────────────────────────────── */}
        {images.length > 0 && <SpeciesGallery images={images} />}

        {/* ── Summary ──────────────────────────────────── */}
        {p.summary && (
          <p className="mt-8 mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {p.summary}
          </p>
        )}

        <div className="space-y-10">
          {/* ── Physical description ───────────────────── */}
          {p.physicalDescription && (
            <Section title="Physical description">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                <EnrichedText text={p.physicalDescription} currentSlug={slug} />
              </p>
            </Section>
          )}

          {/* ── Overview ───────────────────────────────── */}
          <Section title="Overview">
            <dl className="grid gap-x-8 gap-y-4 text-base sm:grid-cols-2">
              <IconRow label="Native to" icon={<GlobeIcon />}>
                {p.nativeOrigin.length > 0 ? p.nativeOrigin.join(", ") : "Unknown"}
              </IconRow>
              <IconRow label="Difficulty" icon={<DifficultyDot level={p.difficulty} />}>
                Level {p.difficulty} — {difficultyLabel[p.difficulty]}
              </IconRow>
              <IconRow label="Propagation" icon={<SeedlingIcon />}>
                {propagationLabel[p.propagation]}
              </IconRow>
              {p.biogeographicalRegion && (
                <IconRow label="Region" icon={<MapIcon />}>
                  {regionLabel[p.biogeographicalRegion]}
                </IconRow>
              )}
              {p.sporePattern && (
                <IconRow label="Spore form" icon={<SporeIcon />}>
                  {p.sporePattern}
                </IconRow>
              )}
              {care && (
                <>
                  <IconRow label="Growth type" icon={<TreeIcon />}>
                    {care.growthType === "solitary" ? "Solitary (spore only)" : "Pup-forming"}
                  </IconRow>
                  <IconRow label="Water sensitivity" icon={<DropletIcon />}>
                    <LevelMeter
                      value={care.wateringSensitivity === "low" ? 1 : care.wateringSensitivity === "medium" ? 2 : 3}
                      max={3}
                      lowLabel="Tolerant"
                      highLabel="Sensitive"
                    />
                  </IconRow>
                  <IconRow label="Light needs" icon={<SunMoonIcon />}>
                    <LevelMeter
                      value={
                        care.lightRequirement === "low" ? 1
                        : care.lightRequirement === "medium" ? 2
                        : care.lightRequirement === "high" ? 3
                        : 4
                      }
                      max={4}
                      lowLabel="Shade"
                      highLabel="Full sun"
                    />
                  </IconRow>
                  <IconRow label="Cold tolerance" icon={<ThermometerIcon />}>
                    <LevelMeter
                      value={
                        care.coldTolerance === "tender" ? 1
                        : care.coldTolerance === "moderate" ? 2
                        : care.coldTolerance === "hardy" ? 3
                        : 4
                      }
                      max={4}
                      lowLabel="Tender"
                      highLabel="Very hardy"
                    />
                  </IconRow>
                </>
              )}
            </dl>
          </Section>

          {/* ── Why this difficulty ────────────────────── */}
          {p.difficultyReason && (
            <Section title="Why this difficulty rating">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {p.difficultyReason}
              </p>
            </Section>
          )}

          {/* ── Detailed notes ─────────────────────────── */}
          {p.notes && (
            <Section title="Notes">
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                <EnrichedText text={p.notes} currentSlug={slug} />
              </p>
            </Section>
          )}

          {/* ── Care card sections ─────────────────────── */}
          {care && (
            <>
              <Section title="Seasonal growth">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {care.seasonalNotes}
                </p>
              </Section>
              <Section title="Mounting">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {care.mountingNotes}
                </p>
              </Section>
              <Section title="Propagation notes">
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {care.propagationNotes}
                </p>
              </Section>
              <Section title="Cultivation tips">
                <ul className="max-w-2xl space-y-2">
                  {care.cultivationTips.map((tip, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}

          {/* ── Closest relatives (as mini cards) ──────── */}
          {relatives.length > 0 && (
            <Section title="Closest relatives">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatives.map((r) => {
                  const rImages = speciesImages[r.slug];
                  return (
                    <a
                      key={r.slug}
                      href={`/plants/platycerium/${r.slug}/`}
                      className="group flex gap-3 rounded-lg border border-border/60 bg-card/40 p-3 transition-colors hover:border-primary/30"
                    >
                      {rImages && rImages[0] && (
                        <img
                          src={platyceriumImageUrl(rImages[0].filename)}
                          alt={rImages[0].alt}
                          className="h-16 w-16 shrink-0 rounded-md border border-border/40 object-cover"
                          loading="lazy"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm italic group-hover:text-primary">
                          {r.scientificName}
                        </p>
                        {r.commonNames?.[0] && (
                          <p className="truncate text-xs text-muted-foreground">
                            {r.commonNames[0]}
                          </p>
                        )}
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                          L{r.difficulty} · {difficultyLabel[r.difficulty]}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </Section>
          )}

          {/* ── Notable hybrids ────────────────────────── */}
          {p.notableHybrids && p.notableHybrids.length > 0 && (
            <Section title="Notable hybrids">
              <ul className="space-y-1">
                {p.notableHybrids.map((h) => (
                  <li key={h} className="text-sm italic text-muted-foreground">{h}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* ── Collapsible reference sections ─────────── */}
          <CollapsibleSections />

          {/* ── Sources ────────────────────────────────── */}
          <section className="border-t border-border/30 pt-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              Sources
            </p>
            <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              <li>Vail, Roy. <em>Platycerium Hobbyist&apos;s Handbook.</em> Desert Biological Publications, 1984.</li>
              <li>Halling, Herb. <em>halling.com/Platyceriums.</em> Online reference.</li>
              <li>Hennipman, E. &amp; Roos, M. C. <em>A Monograph of the Fern Genus Platycerium.</em> 1982.</li>
              <li>Kreier &amp; Schneider. <em>American Journal of Botany</em>, 2006.</li>
              <li>Hoshizaki &amp; Moran. <em>Fern Grower&apos;s Manual.</em> Timber Press, 2001.</li>
            </ul>
          </section>
        </div>
      </SectionWrapper>
    </>
  );
}

/* ── Sub-components ──────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-heading text-xl font-medium">{title}</h2>
      {children}
    </section>
  );
}

function IconRow({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 text-muted-foreground">
        {icon}
      </div>
      <div className="min-w-0">
        <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </dt>
        <dd className="text-base text-foreground">{children}</dd>
      </div>
    </div>
  );
}

/* ── Visual level meter ──────────────────────────────────── */

function LevelMeter({
  value,
  max,
  lowLabel,
  highLabel,
}: {
  value: number;
  max: number;
  lowLabel: string;
  highLabel: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground">{lowLabel}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <div
            key={i}
            className={[
              "h-2.5 w-4 rounded-sm",
              i < value ? "bg-primary" : "bg-muted/60",
            ].join(" ")}
          />
        ))}
      </div>
      <span className="text-[10px] text-muted-foreground">{highLabel}</span>
    </div>
  );
}

/* ── Difficulty badge ────────────────────────────────────── */

const difficultyColors: Record<number, string> = {
  1: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  2: "border-lime-500/30 bg-lime-500/10 text-lime-700 dark:text-lime-300",
  3: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  4: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  5: "border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

function DifficultyBadge({ level }: { level: number }) {
  return (
    <span className={`rounded-full border px-3 py-1 font-mono text-xs tracking-[0.08em] ${difficultyColors[level] ?? ""}`}>
      L{level} — {difficultyLabel[level as 1 | 2 | 3 | 4 | 5]}
    </span>
  );
}

/* ── Inline SVG icons for overview rows ──────────────────── */

const iconClass = "h-4 w-4";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const difficultyDotColors: Record<number, string> = {
  1: "bg-emerald-500",
  2: "bg-lime-500",
  3: "bg-amber-500",
  4: "bg-orange-500",
  5: "bg-rose-500",
};

function DifficultyDot({ level }: { level: number }) {
  return (
    <div className="flex items-center justify-center">
      <span className={`h-3.5 w-3.5 rounded-full ${difficultyDotColors[level] ?? "bg-muted"}`} />
    </div>
  );
}

function SeedlingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V10M7 10C7 7 9 4 12 4s5 3 5 6" />
      <path d="M17 10c0-3-2-6-5-6" />
      <path d="M12 10c-3 0-5 2-5 5h10c0-3-2-5-5-5z" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 6l8-3 6 3 8-3v15l-8 3-6-3-8 3V6zM9 3v15M15 6v15" />
    </svg>
  );
}

function SporeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="12" cy="20" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="20" cy="12" r="1.5" />
    </svg>
  );
}

function TreeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-7M8 9l4-7 4 7H8zM6 15l6-6 6 6H6z" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function SunMoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function ThermometerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={iconClass} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

