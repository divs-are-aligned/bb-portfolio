"use client";

import { useEffect, useRef } from "react";
import {
  useBackgroundConfig,
  type BackgroundConfig,
  type BackgroundSymbol,
} from "./BackgroundConfig";

type Cross = {
  x: number;
  y: number;
  baseAngle: number;
  heat: number;
};

const TOP_FADE = 80;

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { config, interactionPaused } = useBackgroundConfig();
  const configRef = useRef<BackgroundConfig>(config);
  const pausedRef = useRef(false);
  const rebuildRef = useRef(false);
  const cachedColors = useRef({ fg: "", accent: "" });

  useEffect(() => {
    const prev = configRef.current;
    configRef.current = config;
    if (prev.spacing !== config.spacing) {
      rebuildRef.current = true;
    }
  }, [config]);

  useEffect(() => {
    pausedRef.current = interactionPaused;
  }, [interactionPaused]);

  // Cache CSS color vars. Refresh when palette or theme changes (detected via
  // MutationObserver on documentElement's class/style) rather than reading
  // getComputedStyle every frame.
  useEffect(() => {
    const refresh = () => {
      const styles = getComputedStyle(document.documentElement);
      cachedColors.current.fg =
        styles.getPropertyValue("--foreground").trim() || "#D4F5E9";
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
    let crosses: Cross[] = [];
    const mouse = { x: -9999, y: -9999 };
    let scrollProgress = 0;
    let raf = 0;

    const buildGrid = () => {
      const spacing = configRef.current.spacing;
      crosses = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          crosses.push({
            x: c * spacing,
            y: r * spacing,
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

    const drawSymbol = (
      size: number,
      angle: number,
      symbol: BackgroundSymbol,
    ) => {
      ctx.rotate(angle);
      ctx.beginPath();
      switch (symbol) {
        case "cross":
          ctx.moveTo(-size, 0);
          ctx.lineTo(size, 0);
          ctx.moveTo(0, -size);
          ctx.lineTo(0, size);
          ctx.stroke();
          break;
        case "x":
          ctx.moveTo(-size * 0.8, -size * 0.8);
          ctx.lineTo(size * 0.8, size * 0.8);
          ctx.moveTo(-size * 0.8, size * 0.8);
          ctx.lineTo(size * 0.8, -size * 0.8);
          ctx.stroke();
          break;
        case "star": {
          ctx.moveTo(-size, 0);
          ctx.lineTo(size, 0);
          ctx.moveTo(0, -size);
          ctx.lineTo(0, size);
          const s = size * 0.6;
          ctx.moveTo(-s, -s);
          ctx.lineTo(s, s);
          ctx.moveTo(-s, s);
          ctx.lineTo(s, -s);
          ctx.stroke();
          break;
        }
        case "dot":
          ctx.arc(0, 0, Math.max(0.5, size * 0.35), 0, Math.PI * 2);
          ctx.fill();
          break;
        case "circle":
          ctx.arc(0, 0, Math.max(0.5, size * 0.75), 0, Math.PI * 2);
          ctx.stroke();
          break;
        case "dash":
          ctx.moveTo(-size, 0);
          ctx.lineTo(size, 0);
          ctx.stroke();
          break;
        case "triangle":
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.9, size * 0.75);
          ctx.lineTo(-size * 0.9, size * 0.75);
          ctx.closePath();
          ctx.stroke();
          break;
      }
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

      for (const cross of crosses) {
        const mask = columnMask(cross.x);
        const topFade = Math.min(1, cross.y / TOP_FADE);
        let visibility = mask * densityFloor * topFade;

        const dx = cross.x - mouse.x;
        const dy = cross.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        let angle = cross.baseAngle;

        if (!paused && dist < mouseRadius && dist > 0.01) {
          const influence = 1 - dist / mouseRadius;
          if (!reduceMotion) angle += influence * maxSpin;
          if (influence > cross.heat) cross.heat = influence;
        }

        if (visibility < 0.04) continue;

        cross.heat = Math.max(0, cross.heat - heatDecay);

        ctx.globalAlpha = visibility * (0.55 + cross.heat * 0.45);
        const color = cross.heat > 0.01 ? accent : fg;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.save();
        ctx.translate(cross.x, cross.y);
        drawSymbol(size, angle, cfg.symbol);
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
