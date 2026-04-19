"use client";

import { useState } from "react";
import {
  DropletsIcon,
  ScissorsIcon,
  SproutIcon,
  BugIcon,
  SunIcon,
} from "lucide-react";
import { careSections, type CareSection } from "@/data/platyceriumCare";

const ICONS: Record<string, React.ReactNode> = {
  droplets: <DropletsIcon className="size-7" />,
  scissors: <ScissorsIcon className="size-7" />,
  sprout: <SproutIcon className="size-7" />,
  bug: <BugIcon className="size-7" />,
  sun: <SunIcon className="size-7" />,
};

export function PlatyceriumCare() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="mt-16">
      <h3
        data-animate="section-heading"
        className="mb-6 font-heading text-2xl font-medium"
      >
        Care guide
      </h3>
      <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        General care notes from herbhalling.com and the community. Every species
        is different — treat these as starting points.
      </p>

      {/* Category cards — 5 across on one row */}
      <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {careSections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : s.id)}
              aria-expanded={isActive}
              className={[
                "flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border text-center transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
              ].join(" ")}
            >
              <span className={isActive ? "text-primary" : "text-muted-foreground"}>
                {ICONS[s.icon]}
              </span>
              <span className="text-sm font-medium">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active section content */}
      {activeId && <CarePanel section={careSections.find((s) => s.id === activeId)!} />}
    </div>
  );
}

function CarePanel({ section }: { section: CareSection }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          {ICONS[section.icon]}
        </span>
        <h4 className="font-heading text-lg font-medium">{section.title}</h4>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {section.points.map((point, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/50" />
            <span className="text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
