"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

export function PlatyceriumDedication() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Source dedication"
      className="mb-10 rounded-lg border border-primary/30 bg-primary/5 p-5"
    >
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.12em] text-primary">
        In dedication
      </p>
      <p className="text-sm leading-relaxed text-foreground">
        This section is dedicated to{" "}
        <strong className="font-medium">Herb Halling</strong>, whose site{" "}
        <a
          href="https://www.halling.com/Platyceriums/Default.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-primary"
        >
          halling.com/Platyceriums
        </a>{" "}
        is the primary source for the information catalogued here. Herb has
        passed away and his site is no longer maintained — I want to preserve
        the knowledge he gathered so it stays available to the community.
        Additional inspiration and insight came from{" "}
        <strong className="font-medium">Roy Vail</strong> and{" "}
        <strong className="font-medium">Wendy Franks</strong>, whose
        knowledge and generosity have been invaluable resources.
      </p>

      {expanded && (
        <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-bottom-1 duration-200">
          <p className="text-sm leading-relaxed text-muted-foreground">
            This is a passion project — a tribute to generous, curious
            horticulturists who documented what they knew so the rest of us
            could learn. Please visit Herb's original site whenever possible.
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            The species images shown throughout this catalog were archived
            directly from{" "}
            <a
              href="https://www.halling.com/Platyceriums/Default.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              halling.com/Platyceriums
            </a>{" "}
            as a preservation effort. Herb's site is no longer maintained and
            may eventually go offline — these images are hosted here so the
            community doesn't lose them.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-3 flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary/80"
      >
        {expanded ? "Show less" : "Read more"}
        <ChevronDownIcon
          className={`size-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
    </aside>
  );
}
