"use client";

import { useEffect, useRef } from "react";
import {
  useBackgroundConfig,
  type BackgroundConfig,
  type BackgroundSymbol,
} from "./BackgroundConfig";
import {
  prepareWithSegments,
  layoutWithLines,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";

/* ── Glyph map: every non-text symbol → a Unicode character ── */

const GLYPH: Record<string, string> = {
  cross: "+",
  x: "\u00D7", // ×
  star: "\u2733", // ✳
  dot: "\u2022", // •
  circle: "\u25CB", // ○
  dash: "\u2014", // —
  triangle: "\u25B3", // △
  diamond: "\u25C7", // ◇
  arrow: "\u2191", // ↑
  wave: "\u223C", // ∼
  infinity: "\u221E", // ∞
};

type GridCell = {
  x: number;
  y: number;
  col: number;
  row: number;
  baseAngle: number;
  heat: number;
};

const TOP_FADE = 80;

/* ── Pretext cache for text tiles ─────────────────────────── */

type TextTileCache = {
  key: string;
  prepared: PreparedTextWithSegments;
  lines: { text: string }[];
  charWidth: number;
};

function buildTextTileCache(
  text: string,
  fontSize: number,
): TextTileCache | null {
  if (typeof document === "undefined") return null;
  const font = `${fontSize}px "JetBrains Mono", monospace`;
  const prepared = prepareWithSegments(text, font);
  // Lay out at a very wide width so it stays a single line
  const { lines } = layoutWithLines(prepared, 10000, fontSize);
  // Estimate per-char width from the prepared text
  const charWidth = lines[0]
    ? (lines[0] as { width?: number }).width
      ? ((lines[0] as { width?: number }).width! / text.length)
      : fontSize * 0.6
    : fontSize * 0.6;
  return { key: `${text}:${fontSize}`, prepared, lines, charWidth };
}

/* ── Component ────────────────────────────────────────────── */

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, interactionPaused } = useBackgroundConfig();
  const configRef = useRef<BackgroundConfig>(config);
  const pausedRef = useRef(false);
  const rebuildRef = useRef(false);
  const cachedColors = useRef({ fg: "", accent: "" });
  const textTileCacheRef = useRef<TextTileCache | null>(null);

  useEffect(() => {
    const prev = configRef.current;
    configRef.current = config;
    if (prev.spacing !== config.spacing || prev.symbol !== config.symbol) {
      rebuildRef.current = true;
    }

    // Rebuild Pretext cache when switching to a text symbol
    if (config.symbol.startsWith("text:")) {
      const text = config.symbol.slice(5);
      const fontSize = Math.round(config.size * 2.4);
      const cached = textTileCacheRef.current;
      const key = `${text}:${fontSize}`;
      if (!cached || cached.key !== key) {
        textTileCacheRef.current = buildTextTileCache(text, fontSize);
      }
    }
  }, [config]);

  useEffect(() => {
    pausedRef.current = interactionPaused;
  }, [interactionPaused]);

  useEffect(() => {
    const refresh = () => {
      const styles = getComputedStyle(document.documentElement);
      cachedColors.current.fg =
        styles.getPropertyValue("--foreground").trim() || "#E6DDF2";
      cachedColors.current.accent =
        styles.getPropertyValue("--primary").trim() || cachedColors.current.fg;
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let cells: GridCell[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollProgress = 0;
    let raf = 0;

    const buildGrid = () => {
      const spacing = configRef.current.spacing;
      cells = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            x: c * spacing,
            y: r * spacing,
            col: c,
            row: r,
            baseAngle: 0,
            heat: 0,
          });
        }
      }
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    const updateScroll = () => {
      const max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scrollProgress = Math.min(window.scrollY / max, 1);
    };

    const onMouse = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const columnMask = (x: number) => {
      const center = width / 2;
      const half = width / 2;
      const t = Math.abs(x - center) / half;
      return Math.max(0, (t - 0.55) / 0.45);
    };

    const drawGlyph = (
      symbol: BackgroundSymbol,
      size: number,
      angle: number,
      col: number,
      row: number,
    ) => {
      const fontSize = Math.round(size * 2.4);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.rotate(angle);

      // Text tile mode — each cell shows a character from the word,
      // tiled so rows read left-to-right across the grid
      if (symbol.startsWith("text:")) {
        const text = symbol.slice(5);
        const charIndex = ((row * 7 + col) % text.length + text.length) % text.length;
        const ch = text[charIndex] === " " ? "\u00B7" : text[charIndex];
        ctx.fillText(ch, 0, 0);
        return;
      }

      // Single glyph mode
      const glyph = GLYPH[symbol];
      if (glyph) ctx.fillText(glyph, 0, 0);
    };

    const draw = () => {
      if (rebuildRef.current) {
        buildGrid();
        rebuildRef.current = false;
      }
      const cfg = configRef.current;
      const mouseRadius = cfg.mouseRadius;
      const maxSpin = (cfg.maxSpinDeg * Math.PI) / 180;
      const heatDecay = cfg.heatDecay;
      const size = cfg.size;

      ctx.clearRect(0, 0, width, height);
      const fg = cachedColors.current.fg;
      const accent = cachedColors.current.accent;
      ctx.lineWidth = cfg.strokeWidth;
      ctx.lineCap = "round";

      const densityFloor = 0.6 + scrollProgress * 0.4;
      const paused = pausedRef.current;

      for (const cell of cells) {
        const mask = columnMask(cell.x);
        const topFade = Math.min(1, cell.y / TOP_FADE);
        let visibility = mask * densityFloor * topFade;

        const dx = cell.x - mouse.x;
        const dy = cell.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        let angle = cell.baseAngle;

        if (!paused && dist < mouseRadius && dist > 0.01) {
          const influence = 1 - dist / mouseRadius;
          if (!reduceMotion) angle += influence * maxSpin;
          if (influence > cell.heat) cell.heat = influence;
        }

        if (visibility < 0.04) continue;

        cell.heat = Math.max(0, cell.heat - heatDecay);

        ctx.globalAlpha = visibility * (0.55 + cell.heat * 0.45);
        const color = cell.heat > 0.01 ? accent : fg;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.save();
        ctx.translate(cell.x, cell.y);
        drawGlyph(cfg.symbol, size, angle, cell.col, cell.row);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      draw();
      raf = requestAnimationFrame(tick);
    };

    resize();
    updateScroll();
    tick();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onMouse, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onMouse);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    />
  );
}
