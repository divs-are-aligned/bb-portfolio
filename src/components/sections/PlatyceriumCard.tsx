"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlatyceriumCardImage } from "./PlatyceriumGallery";
import { speciesImages } from "@/data/platyceriumImages";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  difficultyLabel,
  regionLabel,
  type CareDifficulty,
  type Platycerium,
  type Propagation,
} from "@/data/platycerium";

const difficultyTone: Record<CareDifficulty, string> = {
  1: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-300",
  2: "bg-lime-500/10 text-lime-700 border-lime-500/30 dark:bg-lime-500/15 dark:text-lime-300",
  3: "bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-500/15 dark:text-amber-300",
  4: "bg-orange-500/10 text-orange-700 border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-300",
  5: "bg-rose-500/10 text-rose-700 border-rose-500/30 dark:bg-rose-500/15 dark:text-rose-300",
};

const propagationLabel: Record<Propagation, string> = {
  pups: "Pups",
  spore: "Spore",
  both: "Pups & spore",
};

export function PlatyceriumCard({ p }: { p: Platycerium }) {
  const [expanded, setExpanded] = useState(false);
  const hasMoreNotes =
    Boolean(p.notes) && (!p.summary || p.notes !== p.summary);

  return (
    <article
      id={`platycerium-${p.slug}`}
      data-animate="platycerium-card"
      className="flex flex-col overflow-hidden rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm transition-[box-shadow,border-color] hover:border-border scroll-mt-24"
    >
      {speciesImages[p.slug] ? (
        <div className="border-b border-border/60">
          <PlatyceriumCardImage slug={p.slug} />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="relative flex h-56 sm:h-40 items-center justify-center border-b border-border/60 bg-gradient-to-br from-muted/40 to-muted/10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            image placeholder
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-xl italic leading-tight">
              {p.scientificName}
            </h3>
            {p.commonNames && p.commonNames.length > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {p.commonNames.join(" · ")}
              </p>
            )}
            {p.isBigFive && (
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-primary">
                Big Five
              </p>
            )}
            {p.isHybrid && (
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Named hybrid
              </p>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Badge
                  variant="outline"
                  className={`shrink-0 cursor-help font-mono ${difficultyTone[p.difficulty]}`}
                  aria-label={`Level ${p.difficulty}: ${difficultyLabel[p.difficulty]}. Tap for details.`}
                />
              }
            >
              L{p.difficulty}
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs text-left">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">
                  Why Level {p.difficulty}? ({difficultyLabel[p.difficulty]})
                </span>
                <span className="leading-relaxed">
                  {p.difficultyReason ??
                    "No specific reasoning recorded for this entry yet."}
                </span>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <dl className="space-y-1.5 text-sm">
          <Row label="Native to">
            {p.nativeOrigin.length > 0 ? p.nativeOrigin.join(", ") : "—"}
          </Row>
          {p.biogeographicalRegion && (
            <Row label="Region">
              <span title={regionLabel[p.biogeographicalRegion]}>
                R{p.biogeographicalRegion} —{" "}
                {regionLabel[p.biogeographicalRegion]}
              </span>
            </Row>
          )}
          <Row label="Propagation">{propagationLabel[p.propagation]}</Row>
          {p.sporePattern && <Row label="Spore form">{p.sporePattern}</Row>}
        </dl>

        {p.summary && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {p.summary}
          </p>
        )}

        {hasMoreNotes && (
          <>
            {expanded && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.notes}
              </p>
            )}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="mt-1 flex w-fit items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDownIcon
                className={`size-3 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </>
        )}

        {!p.dataFilled && (
          <p className="mt-auto pt-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
            Entry pending · data not yet verified
          </p>
        )}
      </div>
    </article>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground pt-0.5">
        {label}
      </dt>
      <dd className="flex-1 text-foreground">{children}</dd>
    </div>
  );
}
