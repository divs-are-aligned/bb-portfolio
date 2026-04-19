"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const items = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Design Systems",
  "Accessibility",
  "Shopify",
  "Klaviyo",
  "Figma",
  "GSAP",
  "Developer Experience",
  "Self-Taught",
  "Platycerium",
  "Dungeon Crawler Carl",
  "Vinyl Records",
  "Philosophy",
];

const SEPARATOR = "✦";
const STEP_PX = 220;

export function Marquee() {
  // Duplicate the items so the CSS loop is seamless
  const doubled = [...items, ...items];

  const [magnified, setMagnified] = useState(false);
  const [stepOffset, setStepOffset] = useState(0);

  const onEnter = () => {
    setMagnified(true);
  };

  const onLeave = () => {
    setMagnified(false);
    // Keep stepOffset so the marquee continues scrolling from where the user
    // last navigated to, instead of snapping back to the pre-click position.
  };

  return (
    <div
      data-animate="marquee"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={[
        "group/marquee relative overflow-hidden border-y border-border/60",
        "transition-[padding] duration-300 ease-out",
        magnified ? "py-8" : "py-4",
      ].join(" ")}
    >
      <div className="animate-marquee flex whitespace-nowrap">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${stepOffset}px)` }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              className={[
                "mx-6 inline-flex items-center gap-6 font-mono uppercase tracking-[0.2em] text-muted-foreground",
                "transition-[font-size,letter-spacing] duration-300 ease-out",
                magnified
                  ? "text-sm tracking-[0.18em] text-foreground/90"
                  : "text-[11px]",
              ].join(" ")}
            >
              {item}
              <span className="text-foreground/20">{SEPARATOR}</span>
            </span>
          ))}
        </div>
      </div>

      <div
        aria-hidden={!magnified}
        className={[
          "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
          "bg-gradient-to-r from-background via-background/80 to-transparent pr-12",
          "transition-opacity duration-200",
          magnified ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Skip back in marquee"
          tabIndex={magnified ? 0 : -1}
          onClick={() => setStepOffset((x) => x + STEP_PX)}
          className="pointer-events-auto flex size-11 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronLeftIcon className="size-6" strokeWidth={2.5} />
        </button>
      </div>

      <div
        aria-hidden={!magnified}
        className={[
          "pointer-events-none absolute inset-y-0 right-0 flex items-center justify-end pr-3",
          "bg-gradient-to-l from-background via-background/80 to-transparent pl-12",
          "transition-opacity duration-200",
          magnified ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Skip ahead in marquee"
          tabIndex={magnified ? 0 : -1}
          onClick={() => setStepOffset((x) => x - STEP_PX)}
          className="pointer-events-auto flex size-11 items-center justify-center rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronRightIcon className="size-6" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
