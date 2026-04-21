"use client";

import { platyceriums } from "@/data/platycerium";
import { glossary, type GlossaryEntry } from "@/data/platyceriumGlossary";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Renders prose text with:
 * 1. Auto-linked species mentions (P. speciesname → link to species page)
 * 2. Glossary term tooltips (hover/tap to see definition)
 *
 * Works by building a combined regex of all matchable terms,
 * splitting the text, and rendering each match as a link or tooltip.
 */

const SPECIES_SLUGS = platyceriums
  .filter((s) => s.dataFilled)
  .map((s) => s.slug);

// Build glossary lookup: term/alias (lowercase) → entry
const glossaryLookup = new Map<string, GlossaryEntry>();
for (const entry of glossary) {
  glossaryLookup.set(entry.term.toLowerCase(), entry);
  if (entry.aliases) {
    for (const alias of entry.aliases) {
      glossaryLookup.set(alias.toLowerCase(), entry);
    }
  }
}

// All matchable glossary terms sorted longest-first to avoid partial matches
const glossaryTerms = Array.from(glossaryLookup.keys()).sort(
  (a, b) => b.length - a.length,
);

// Escape regex special chars
function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Combined pattern: species mentions OR glossary terms
// Species: P. slug (with optional period and space)
// Glossary: whole-word match, case-insensitive
const speciesPart = SPECIES_SLUGS.map((s) => `P\\.\\s*${escapeRegex(s)}`).join(
  "|",
);
const glossaryPart = glossaryTerms.map((t) => escapeRegex(t)).join("|");

const combinedPattern = new RegExp(
  `(${speciesPart}|\\b(?:${glossaryPart})\\b)`,
  "gi",
);

type Props = {
  text: string;
  currentSlug?: string;
};

export function EnrichedText({ text, currentSlug }: Props) {
  const parts = text.split(combinedPattern);

  // Track which glossary terms we've already tooltipped to avoid
  // cluttering the page with repeated tooltips
  const seen = new Set<string>();

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        // Check if it's a species mention
        const speciesMatch = part.match(/^P\.\s*(.+)$/i);
        if (speciesMatch) {
          const slug = speciesMatch[1].toLowerCase().trim();
          if (SPECIES_SLUGS.includes(slug) && slug !== currentSlug) {
            return (
              <a
                key={i}
                href={`/plants/platycerium/${slug}/`}
                className="italic text-primary underline-offset-2 hover:underline"
              >
                {part}
              </a>
            );
          }
        }

        // Check if it's a glossary term
        const entry = glossaryLookup.get(part.toLowerCase());
        if (entry && !seen.has(entry.term.toLowerCase())) {
          seen.add(entry.term.toLowerCase());
          return (
            <Tooltip key={i}>
              <TooltipTrigger
                render={
                  <span className="cursor-help border-b border-dotted border-muted-foreground/40 text-foreground transition-colors hover:border-primary hover:text-primary" />
                }
              >
                {part}
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs text-left"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">{entry.term}</span>
                  <span className="text-xs leading-relaxed">
                    {entry.definition}
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
