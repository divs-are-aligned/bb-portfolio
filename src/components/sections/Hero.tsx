"use client";

import { useEffect, useRef } from "react";
import { ArrowDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/Icons";

const FIRST = "Bart";
const LAST = "Budak";
const LETTER_RADIUS = 260;
const LETTER_PULL = 18;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

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
    <section
      ref={sectionRef}
      className="hero-section relative mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-5xl flex-col justify-center px-6 py-20"
    >
      <div className="max-w-5xl">
        <p
          data-animate="hero-item"
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.1em] text-accent-foreground"
        >
          Hello, I&apos;m
        </p>

        <h1
          ref={headlineRef}
          className="hero-headline mb-6 font-heading font-medium leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(4.5rem, 18vw, 15rem)" }}
          aria-label={`${FIRST} ${LAST}`}
        >
          <span className="inline-block" aria-hidden="true">
            {FIRST.split("").map((ch, i) => (
              <span
                key={`f-${i}`}
                data-letter
                data-animate="hero-word"
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
                data-animate="hero-word"
                className="hero-letter inline-block will-change-transform"
              >
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <p
          data-animate="hero-item"
          className="mb-6 font-sans text-2xl font-medium text-muted-foreground sm:text-3xl"
        >
          Technologist
        </p>
        <p
          data-animate="hero-item"
          className="mb-12 max-w-lg text-base leading-relaxed text-muted-foreground"
        >
          Self-taught from first principles — I found my foundation in web
          accessibility, fell in love with design systems, and never stopped
          asking why things work the way they do. 8+ years building the web
          with a deep focus on UI/UX, developer experience, and the humans
          behind the code.
        </p>

        <div
          data-animate="hero-item"
          className="flex flex-wrap items-center gap-4"
        >
          <Button size="lg" nativeButton={false} render={<a href="#projects" />}>
            View Projects
          </Button>
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            render={<a href="#contact" />}
          >
            Get in Touch
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="GitHub"
              nativeButton={false}
              render={
                <a
                  href="https://github.com/divs-are-aligned"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <GitHubIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="LinkedIn"
              nativeButton={false}
              render={
                <a
                  href="https://linkedin.com/in/bartbudak"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <LinkedInIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <a
        data-animate="hero-scroll"
        href="#about"
        aria-label="Scroll to about"
        className="mt-20 flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDownIcon className="size-4" />
        Scroll down
      </a>
    </section>
  );
}
