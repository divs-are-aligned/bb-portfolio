"use client";

import { useEffect, useRef, useState } from "react";
import { Desktop } from "@/components/shared/Desktop";
import { About } from "./About";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { PlantHelp } from "./PlantHelp";

/* ── Interactive hero name (same effect as original Hero) ── */

const FIRST = "Bart";
const LAST = "Budak";
const LETTER_RADIUS = 260;
const LETTER_PULL = 18;

const TITLES = [
  "Technologist",
  "eCommerce strategist",
  "Design-system gardener",
  "Accessibility advocate",
  "UI & UX obsessive",
  "Self-described creative",
  "Platycerium keeper",
  "Vinyl collector",
];
const TITLE_INTERVAL_MS = 2600;

function HeroName() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, TITLE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const letters = Array.from(
      headline.querySelectorAll<HTMLSpanElement>("[data-letter]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    const tick = () => {
      for (const letter of letters) {
        const rect = letter.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.hypot(dx, dy);
        if (mouse.active && dist < LETTER_RADIUS && !reduceMotion) {
          const pull = (1 - dist / LETTER_RADIUS) * LETTER_PULL;
          const tx = (dx / dist) * pull;
          const ty = (dy / dist) * pull;
          const skew = (dx / LETTER_RADIUS) * 6;
          letter.style.transform = `translate(${tx}px, ${ty}px) skewX(${-skew}deg)`;
        } else {
          letter.style.transform = "translate(0, 0) skewX(0deg)";
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="mb-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        Hello, I&apos;m
      </p>

      <h1
        ref={headlineRef}
        className="hero-headline mb-4 font-heading font-medium leading-[0.85] tracking-tight"
        style={{ fontSize: "clamp(4.5rem, 14vw, 10rem)" }}
        aria-label={`${FIRST} ${LAST}`}
      >
        <span className="inline-block" aria-hidden="true">
          {FIRST.split("").map((ch, i) => (
            <span
              key={`f-${i}`}
              data-letter
              className="hero-letter inline-block will-change-transform"
            >
              {ch}
            </span>
          ))}
        </span>
        <span aria-hidden="true" className="inline-block w-[0.25em]" />
        <span className="inline-block" aria-hidden="true">
          {LAST.split("").map((ch, i) => (
            <span
              key={`l-${i}`}
              data-letter
              className="hero-letter inline-block will-change-transform"
            >
              {ch}
            </span>
          ))}
        </span>
      </h1>

      <div
        className="relative h-[1.4em] overflow-hidden font-sans text-2xl font-medium text-muted-foreground sm:text-3xl"
        aria-live="polite"
      >
        <span
          key={TITLES[titleIndex]}
          className="inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          {TITLES[titleIndex]}
        </span>
      </div>
    </div>
  );
}

/* ── Home desktop layout ───────────────────────────────────── */

export function HomeDesktop() {
  const windows = [
    {
      id: "wedding",
      title: "countdown.exe",
      defaultMinimized: true,
      hideWhenMinimized: true,
      content: <WeddingCountdown />,
    },
    {
      id: "plant-sos",
      title: "plant_sos.exe",
      defaultMinimized: true,
      hideWhenMinimized: true,
      content: <PlantHelp />,
    },
    {
      id: "about",
      title: "about.md",

      content: (
        <div>
          <HeroName />
          <About />
        </div>
      ),
    },
    {
      id: "experience",
      title: "experience.log",

      content: <Experience />,
    },
    {
      id: "skills",
      title: "skills.json",
      content: <Skills />,
    },
    {
      id: "contact",
      title: "contact.sh",
      content: <Contact />,
    },
  ];

  const icons = [
    {
      id: "wedding-icon",
      label: "Wedding",
      action: "toggle" as const,
      windowId: "wedding",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="24" cy="26" r="18" />
          <path d="M24 14v12l8 5" />
          <path d="M18 8h12" />
          <path d="M24 4v4" />
        </svg>
      ),
    },
    {
      id: "plant-sos-icon",
      label: "Plant SOS",
      action: "toggle" as const,
      windowId: "plant-sos",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 4v16M24 36v8M16 24H4M44 24H32" />
          <path d="M24 24m-6 0a6 6 0 1 0 12 0 6 6 0 1 0-12 0" />
          <path d="M10 10l8 8M30 30l8 8M10 38l8-8M30 18l8-8" />
        </svg>
      ),
    },
    {
      id: "platycerium",
      label: "Platycerium",
      action: "link" as const,
      href: "/plants/platycerium/",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v32a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" />
          <path d="M14 6v36" />
          <path d="M34 12h6a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2h-6" />
          <path d="M20 16h8M20 22h8M20 28h6" />
        </svg>
      ),
    },
  ];

  return <Desktop windows={windows} icons={icons} />;
}

/* ── Wedding countdown ─────────────────────────────────────── */

const WEDDING_DATE = new Date("2026-07-25T00:00:00");

function WeddingCountdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = WEDDING_DATE.getTime() - now.getTime();
  const isPast = diff <= 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (isPast) {
    return (
      <div className="py-8 text-center">
        <h2 className="mb-2 font-heading text-3xl font-medium">
          Married!
        </h2>
        <p className="text-muted-foreground">
          The Bartinellies tied the knot.
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 text-center">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        Countdown to
      </p>
      <h2 className="mb-6 font-heading text-2xl font-medium sm:text-3xl">
        Bartinellie&apos;s Wedding
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">July 25, 2026</p>
      <div className="flex justify-center gap-4 sm:gap-6">
        <CountUnit value={days} label="days" />
        <CountUnit value={hours} label="hrs" />
        <CountUnit value={minutes} label="min" />
        <CountUnit value={seconds} label="sec" />
      </div>
    </div>
  );
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-mono text-4xl font-medium tabular-nums text-foreground sm:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
