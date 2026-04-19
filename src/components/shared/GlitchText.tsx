"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { prepareWithSegments } from "@chenglou/pretext";

/* ── Scramble character set — sorted roughly by visual density ── */
const SCRAMBLE_CHARS =
  ".,:;!+-=*#@%&abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}()/\\|~^";

const SCRAMBLE_DURATION_MS = 900;
const STAGGER_MS = 35;
const CYCLES_PER_CHAR = 6;

type CharSlot = {
  target: string;
  targetWidth: number;
  resolved: boolean;
};

function measureCharWidths(
  text: string,
  font: string,
): number[] {
  const widths: number[] = [];
  for (const ch of text) {
    if (ch === " ") {
      // Space gets a fixed width
      widths.push(parseFloat(font) * 0.3);
    } else {
      const prepared = prepareWithSegments(ch, font);
      widths.push(
        prepared.widths && prepared.widths.length > 0
          ? prepared.widths[0]
          : parseFloat(font) * 0.6,
      );
    }
  }
  return widths;
}

function randomChar(): string {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

type GlitchTextProps = {
  text: string;
  className?: string;
  font?: string;
};

export function GlitchText({
  text,
  className = "",
  font = '500 30px "DM Sans", sans-serif',
}: GlitchTextProps) {
  const [displayChars, setDisplayChars] = useState<string[]>([]);
  const [resolvedFlags, setResolvedFlags] = useState<boolean[]>([]);
  const slotsRef = useRef<CharSlot[]>([]);
  const rafRef = useRef(0);
  const startTimeRef = useRef(0);

  // Measure target character widths via Pretext
  const charWidths = useMemo(() => {
    if (typeof document === "undefined") return [];
    return measureCharWidths(text, font);
  }, [text, font]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const chars = [...text];
    const slots: CharSlot[] = chars.map((ch, i) => ({
      target: ch,
      targetWidth: charWidths[i] ?? 10,
      resolved: false,
    }));
    slotsRef.current = slots;

    if (reduceMotion) {
      setDisplayChars(chars);
      setResolvedFlags(chars.map(() => true));
      return;
    }

    // Initialize with random characters
    setDisplayChars(chars.map((ch) => (ch === " " ? " " : randomChar())));
    setResolvedFlags(chars.map(() => false));

    startTimeRef.current = performance.now();
    let lastUpdate = 0;

    const tick = (now: number) => {
      // Throttle state updates to ~20fps for performance
      if (now - lastUpdate < 50) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastUpdate = now;

      const elapsed = now - startTimeRef.current;
      const newDisplay = [...chars];
      const newResolved = new Array(chars.length).fill(false);
      let allDone = true;

      for (let i = 0; i < chars.length; i++) {
        if (chars[i] === " ") {
          newDisplay[i] = " ";
          newResolved[i] = true;
          continue;
        }

        const charDelay = i * STAGGER_MS;
        const charElapsed = elapsed - charDelay;

        if (charElapsed >= SCRAMBLE_DURATION_MS) {
          newDisplay[i] = chars[i];
          newResolved[i] = true;
        } else if (charElapsed > 0) {
          newDisplay[i] = randomChar();
          allDone = false;
        } else {
          newDisplay[i] = randomChar();
          allDone = false;
        }
      }

      setDisplayChars(newDisplay);
      setResolvedFlags(newResolved);

      if (!allDone) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [text, charWidths]);

  return (
    <span className={className} aria-label={text}>
      {displayChars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: ch === " " ? "0.3em" : `${charWidths[i] ?? 10}px`,
            textAlign: "center",
            fontFamily: resolvedFlags[i]
              ? "var(--font-dm-sans), sans-serif"
              : "var(--font-jetbrains), monospace",
            opacity: resolvedFlags[i] ? 1 : 0.5,
            transition: "opacity 150ms ease",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
