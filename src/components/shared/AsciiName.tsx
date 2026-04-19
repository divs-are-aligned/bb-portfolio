"use client";

import { useEffect, useRef } from "react";

/* ── Config ────────────────────────────────────────────────── */

const TEXT_LINE_1 = "Bart";
const TEXT_LINE_2 = "Budak";
const COLS = 60;
const ROWS = 24;
const CELL_W = 11;
const CELL_H = 16;
const SCRAMBLE_INTERVAL = 80; // ms between character swaps
const ERASE_RADIUS = 60; // px — mouse erase radius
const RECOVER_SPEED = 0.025; // opacity recovery per frame
const BRIGHTNESS_THRESHOLD = 0.08; // min brightness to show a char

// Ramp from light to heavy visual weight
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=!?/|~^;:,.";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

/* ── Component ─────────────────────────────────────────────── */

export function AsciiName({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const w = COLS * CELL_W;
    const h = ROWS * CELL_H;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* ── Render name to hidden canvas and sample brightness ── */
    // Render at high resolution then downsample into the COLS x ROWS grid
    const SCALE = 8; // render at 8x resolution for clean edges
    const hW = COLS * SCALE;
    const hH = ROWS * SCALE;
    const hiddenCvs = document.createElement("canvas");
    hiddenCvs.width = hW;
    hiddenCvs.height = hH;
    const hCtx = hiddenCvs.getContext("2d", { willReadFrequently: true })!;

    // Render two lines, each taking half the height
    const fontSize = Math.floor(hH * 0.42);
    hCtx.fillStyle = "#000";
    hCtx.fillRect(0, 0, hW, hH);
    hCtx.fillStyle = "#fff";
    hCtx.font = `900 ${fontSize}px "Arial Black", "Helvetica Neue", sans-serif`;
    hCtx.textBaseline = "middle";
    hCtx.textAlign = "center";
    hCtx.fillText(TEXT_LINE_1, hW / 2, hH * 0.28);
    hCtx.fillText(TEXT_LINE_2, hW / 2, hH * 0.72);

    // Downsample: average brightness per grid cell
    const hiRes = hCtx.getImageData(0, 0, hW, hH).data;
    const brightness: number[] = new Array(COLS * ROWS);
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        let sum = 0;
        const startX = c * SCALE;
        const startY = r * SCALE;
        for (let py = 0; py < SCALE; py++) {
          for (let px = 0; px < SCALE; px++) {
            const idx = ((startY + py) * hW + (startX + px)) * 4;
            sum += hiRes[idx]; // red channel
          }
        }
        brightness[r * COLS + c] = sum / (SCALE * SCALE * 255);
      }
    }

    /* ── Per-cell state ──────────────────────────────────────── */
    const cellOpacity = new Float32Array(COLS * ROWS).fill(1);
    const cellErased = new Uint8Array(COLS * ROWS); // 0 or 1
    const cellChars = new Array(COLS * ROWS);
    for (let i = 0; i < COLS * ROWS; i++) {
      cellChars[i] = randomChar();
    }

    /* ── Mouse state ─────────────────────────────────────────── */
    const mouse = { x: -9999, y: -9999, active: false };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    /* ── Read CSS color vars ─────────────────────────────────── */
    let fgColor = "#E6DDF2";
    let accentColor = "#FF6B9D";

    const refreshColors = () => {
      const styles = getComputedStyle(document.documentElement);
      fgColor = styles.getPropertyValue("--foreground").trim() || fgColor;
      accentColor = styles.getPropertyValue("--primary").trim() || accentColor;
    };
    refreshColors();
    const observer = new MutationObserver(refreshColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    /* ── Animation loop ──────────────────────────────────────── */
    let raf = 0;
    let lastScramble = 0;

    const draw = (now: number) => {
      const shouldScramble =
        !reduceMotion && now - lastScramble >= SCRAMBLE_INTERVAL;
      if (shouldScramble) lastScramble = now;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `${CELL_H - 2}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const b = brightness[idx];
          if (b < BRIGHTNESS_THRESHOLD) continue;

          // Mouse erase
          const cx = c * CELL_W + CELL_W / 2;
          const cy = r * CELL_H + CELL_H / 2;

          if (mouse.active && !reduceMotion) {
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const dist = Math.hypot(dx, dy);
            if (dist < ERASE_RADIUS) {
              const influence = 1 - dist / ERASE_RADIUS;
              cellOpacity[idx] = Math.max(
                0,
                cellOpacity[idx] - influence * 0.35,
              );
              cellErased[idx] = 1;
            }
          }

          // Recover
          if (cellErased[idx] === 1) {
            cellOpacity[idx] = Math.min(1, cellOpacity[idx] + RECOVER_SPEED);
            if (cellOpacity[idx] >= 1) cellErased[idx] = 0;
          }

          // Scramble character
          if (shouldScramble) {
            cellChars[idx] = randomChar();
          }

          const alpha = b * cellOpacity[idx];
          if (alpha < 0.02) continue;

          ctx.globalAlpha = alpha;
          ctx.fillStyle = cellOpacity[idx] < 0.7 ? accentColor : fgColor;
          ctx.fillText(cellChars[idx], cx, cy);
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-label={`${TEXT_LINE_1} ${TEXT_LINE_2}`}
      role="img"
      style={{
        width: COLS * CELL_W,
        height: ROWS * CELL_H,
        maxWidth: "100%",
      }}
    />
  );
}
