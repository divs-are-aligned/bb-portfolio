"use client";

import { useEffect, useRef } from "react";

type Cross = {
  x: number;
  y: number;
  baseAngle: number;
  heat: number;
};

const SPACING = 28;
const ARM = 4;
const STROKE = 1;
const MOUSE_RADIUS = 140;
const MAX_SPIN = Math.PI * 2;
const HEAT_DECAY = 0.03;
const TOP_FADE = 80;

export function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      crosses = [];
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          crosses.push({
            x: c * SPACING,
            y: r * SPACING,
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

    // Horizontal falloff: 1 at edges, 0 in center column.
    const columnMask = (x: number) => {
      const center = width / 2;
      const half = width / 2;
      const t = Math.abs(x - center) / half; // 0 center -> 1 edge
      // soft edge: stay clear through middle ~70% of viewport width
      return Math.max(0, (t - 0.55) / 0.45);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const styles = getComputedStyle(document.documentElement);
      const fg =
        styles.getPropertyValue("--foreground").trim() || "oklch(0.145 0 0)";
      const accent =
        styles.getPropertyValue("--primary").trim() || fg;
      ctx.lineWidth = STROKE;
      ctx.lineCap = "round";

      // Base density: crosses visible from the top, intensifies slightly with scroll.
      const densityFloor = 0.6 + scrollProgress * 0.4;

      for (const cross of crosses) {
        const mask = columnMask(cross.x);
        const topFade = Math.min(1, cross.y / TOP_FADE);
        const visibility = mask * densityFloor * topFade;
        if (visibility < 0.04) continue;

        const dx = cross.x - mouse.x;
        const dy = cross.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        let angle = cross.baseAngle;
        if (dist < MOUSE_RADIUS) {
          const influence = 1 - dist / MOUSE_RADIUS;
          if (!reduceMotion) angle += influence * MAX_SPIN;
          if (influence > cross.heat) cross.heat = influence;
        }

        cross.heat = Math.max(0, cross.heat - HEAT_DECAY);

        ctx.globalAlpha = visibility * (0.55 + cross.heat * 0.45);
        ctx.strokeStyle = cross.heat > 0.01 ? accent : fg;
        ctx.save();
        ctx.translate(cross.x, cross.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-ARM, 0);
        ctx.lineTo(ARM, 0);
        ctx.moveTo(0, -ARM);
        ctx.lineTo(0, ARM);
        ctx.stroke();
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
