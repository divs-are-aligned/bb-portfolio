"use client";

import { useState } from "react";
import { PlatyceriumCare } from "@/components/sections/PlatyceriumCare";
import { PlatyceriumGlossary } from "@/components/sections/PlatyceriumGlossary";
import { PlatyceriumTree } from "@/components/sections/PlatyceriumTree";
import { PlatyceriumMap } from "@/components/sections/PlatyceriumMap";
import { PlatyceriumDedication } from "@/components/sections/PlatyceriumDedication";

const SECTIONS = [
  {
    id: "care",
    label: "Care Guide",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    component: <PlatyceriumCare />,
  },
  {
    id: "glossary",
    label: "Glossary",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8M8 11h5" />
      </svg>
    ),
    component: <PlatyceriumGlossary />,
  },
  {
    id: "phylogeny",
    label: "Phylogeny",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v6M8 9H4v3h4M16 9h4v3h-4M12 9v6M8 15H2v3h6M16 15h6v3h-6M12 15v6" />
      </svg>
    ),
    component: <PlatyceriumTree />,
  },
  {
    id: "map",
    label: "Regions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    component: <PlatyceriumMap />,
  },
  {
    id: "dedication",
    label: "Dedication",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    component: <PlatyceriumDedication />,
  },
] as const;

export function CollapsibleSections() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {/* Icon row */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => {
          const isOpen = openId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setOpenId(isOpen ? null : s.id)}
              aria-expanded={isOpen}
              className={[
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                isOpen
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
              ].join(" ")}
            >
              {s.icon}
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Open section content */}
      {openId && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {SECTIONS.find((s) => s.id === openId)?.component}
        </div>
      )}
    </div>
  );
}
