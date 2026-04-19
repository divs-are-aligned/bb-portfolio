"use client";

import { useCallback, useMemo, useState } from "react";
import { glossary } from "@/data/platyceriumGlossary";

// Build a lookup: lowercased term → index for cross-linking.
const termIndex = new Map<string, number>();
glossary.forEach((entry, i) => {
  termIndex.set(entry.term.toLowerCase(), i);
});

// All terms sorted longest-first so regex matches greedily.
const allTerms = glossary
  .map((e) => e.term)
  .sort((a, b) => b.length - a.length);
const termPattern = new RegExp(
  `\\b(${allTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi",
);

export function PlatyceriumGlossary() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = useCallback((i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  const allOpen = openSet.size === glossary.length;
  const toggleAll = () => {
    setOpenSet(allOpen ? new Set() : new Set(glossary.map((_, i) => i)));
  };

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <h3
            data-animate="section-heading"
            className="font-heading text-2xl font-medium"
          >
            Glossary
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Click any term to see its definition. Linked terms inside
            definitions open their own entry.
          </p>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className="shrink-0 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-3">
        {glossary.map((entry, i) => {
          const isOpen = openSet.has(i);
          return (
            <div key={entry.term} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={[
                  "rounded-lg border px-4 py-2 font-heading font-medium transition-all duration-200",
                  isOpen
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 text-foreground/80 hover:border-border hover:text-foreground",
                ].join(" ")}
              >
                {entry.term}
              </button>
            </div>
          );
        })}
      </div>

      {openSet.size > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          {glossary.map((entry, i) => {
            if (!openSet.has(i)) return null;
            return (
              <div
                key={entry.term}
                id={`glossary-def-${i}`}
                className="rounded-lg border border-primary/30 bg-primary/5 p-5 transition-[box-shadow] duration-300 animate-in fade-in slide-in-from-bottom-2 duration-200 scroll-mt-24"
              >
                <p className="mb-1 font-heading text-lg font-medium text-foreground">
                  {entry.term}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <LinkedDefinition
                    text={entry.definition}
                    openSet={openSet}
                    onTermClick={toggle}
                  />
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LinkedDefinition({
  text,
  openSet,
  onTermClick,
}: {
  text: string;
  openSet: Set<number>;
  onTermClick: (index: number) => void;
}) {
  const parts = useMemo(() => {
    const result: Array<{ text: string; termIdx: number | null }> = [];
    let lastIndex = 0;

    text.replace(termPattern, (match, _group, offset) => {
      if (offset > lastIndex) {
        result.push({ text: text.slice(lastIndex, offset), termIdx: null });
      }
      const idx = termIndex.get(match.toLowerCase());
      result.push({ text: match, termIdx: idx ?? null });
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex), termIdx: null });
    }
    return result;
  }, [text]);

  const scrollToTerm = (idx: number) => {
    const el = document.getElementById(`glossary-def-${idx}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-background");
      setTimeout(() => {
        el.classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-background");
      }, 1800);
    }
  };

  return (
    <>
      {parts.map((part, i) => {
        if (part.termIdx === null) return <span key={i}>{part.text}</span>;
        const isAlreadyOpen = openSet.has(part.termIdx);
        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (isAlreadyOpen) {
                scrollToTerm(part.termIdx!);
              } else {
                onTermClick(part.termIdx!);
              }
            }}
            className={[
              "font-medium underline-offset-4 hover:underline",
              isAlreadyOpen
                ? "text-primary/70 decoration-dashed"
                : "text-primary",
            ].join(" ")}
            title={
              isAlreadyOpen
                ? `Already open — click to scroll to ${glossary[part.termIdx!].term}`
                : `Open definition of ${glossary[part.termIdx!].term}`
            }
          >
            {part.text}
            {isAlreadyOpen && (
              <span className="ml-0.5 inline-block text-[10px] align-super text-primary/50">
                ↑
              </span>
            )}
          </button>
        );
      })}
    </>
  );
}
