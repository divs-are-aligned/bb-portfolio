"use client";

import { useEffect, useRef } from "react";

/* ── Config ────────────────────────────────────────────────── */

const VINE_COUNT = 8;
const SEGMENTS_PER_VINE = 18;
const SEGMENT_LENGTH = 32;
const MOUSE_RADIUS = 120;
const MOUSE_FORCE = 12;
const DAMPING = 0.92;
const CONSTRAINT_ITERATIONS = 6;
const REST_SPRING = 0.02; // pull back toward rest position
const LEAF_INTERVAL = 3;
const STEM_WIDTH = 1.5;

/* ── Leaf path data (procedural line art) ─────────────────── */

function drawPothos(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    -size * 0.5, -size * 0.3,
    -size * 0.6, -size * 0.8,
    0, -size * 1.1,
  );
  ctx.bezierCurveTo(
    size * 0.6, -size * 0.8,
    size * 0.5, -size * 0.3,
    0, 0,
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -size * 0.85);
  ctx.stroke();
  ctx.restore();
}

function drawMonstera(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  const s = size * 1.3;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-s * 0.3, -s * 0.1, -s * 0.6, -s * 0.3, -s * 0.55, -s * 0.6);
  ctx.lineTo(-s * 0.3, -s * 0.5);
  ctx.lineTo(-s * 0.45, -s * 0.75);
  ctx.bezierCurveTo(-s * 0.35, -s * 0.95, -s * 0.1, -s * 1.05, 0, -s * 1.0);
  ctx.bezierCurveTo(s * 0.1, -s * 1.05, s * 0.35, -s * 0.95, s * 0.45, -s * 0.75);
  ctx.lineTo(s * 0.3, -s * 0.5);
  ctx.lineTo(s * 0.55, -s * 0.6);
  ctx.bezierCurveTo(s * 0.6, -s * 0.3, s * 0.3, -s * 0.1, 0, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -s * 0.8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.3);
  ctx.lineTo(-s * 0.3, -s * 0.45);
  ctx.moveTo(0, -s * 0.3);
  ctx.lineTo(s * 0.3, -s * 0.45);
  ctx.moveTo(0, -s * 0.55);
  ctx.lineTo(-s * 0.25, -s * 0.7);
  ctx.moveTo(0, -s * 0.55);
  ctx.lineTo(s * 0.25, -s * 0.7);
  ctx.stroke();
  ctx.restore();
}

function drawSimpleLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  angle: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-size * 0.4, -size * 0.6, 0, -size);
  ctx.quadraticCurveTo(size * 0.4, -size * 0.6, 0, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -size * 0.1);
  ctx.lineTo(0, -size * 0.75);
  ctx.stroke();
  ctx.restore();
}

const LEAF_DRAWERS = [drawPothos, drawMonstera, drawSimpleLeaf];

/* ── Verlet physics types ─────────────────────────────────── */

type Point = {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  restX: number;
  restY: number;
  pinned: boolean;
};

type Vine = {
  points: Point[];
  leafType: number;
  leafSide: number;
  leafSize: number;
};

/* ── Component ─────────────────────────────────────────────── */

export function PlantVines() {
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
    let vines: Vine[] = [];

    const mouse = { x: -9999, y: -9999, active: false };

    /* ── Build vines ───────────────────────────────────────── */

    const buildVines = () => {
      vines = [];
      for (let i = 0; i < VINE_COUNT; i++) {
        const baseX =
          (width / (VINE_COUNT + 1)) * (i + 1) +
          (Math.random() - 0.5) * 40;
        const baseY = height + 10;
        const points: Point[] = [];

        const lean = (Math.random() - 0.5) * 0.3;

        for (let j = 0; j < SEGMENTS_PER_VINE; j++) {
          const x =
            baseX +
            lean * j * SEGMENT_LENGTH * 0.5 +
            (Math.random() - 0.5) * 8;
          const y = baseY - j * SEGMENT_LENGTH;
          points.push({
            x,
            y,
            prevX: x,
            prevY: y,
            restX: x,
            restY: y,
            pinned: j === 0,
          });
        }

        vines.push({
          points,
          leafType: Math.floor(Math.random() * LEAF_DRAWERS.length),
          leafSide: Math.random() > 0.5 ? 1 : -1,
          leafSize: 8 + Math.random() * 8,
        });
      }
    };

    /* ── Resize ─────────────────────────────────────────────── */

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildVines();
    };

    /* ── Physics step ──────────────────────────────────────── */

    const physics = () => {
      for (const vine of vines) {
        const pts = vine.points;

        // Verlet integration
        for (const p of pts) {
          if (p.pinned) continue;
          const vx = (p.x - p.prevX) * DAMPING;
          const vy = (p.y - p.prevY) * DAMPING;
          p.prevX = p.x;
          p.prevY = p.y;
          p.x += vx;
          p.y += vy;

          // Spring back toward rest position
          p.x += (p.restX - p.x) * REST_SPRING;
          p.y += (p.restY - p.y) * REST_SPRING;

          // Mouse push
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < MOUSE_RADIUS && dist > 0.01) {
              const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
              p.x += (dx / dist) * force;
              p.y += (dy / dist) * force;
            }
          }
        }

        // Distance constraints
        for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
          for (let i = 0; i < pts.length - 1; i++) {
            const a = pts[i];
            const b = pts[i + 1];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 0.001) continue;
            const diff = ((SEGMENT_LENGTH - dist) / dist) * 0.5;
            const ox = dx * diff;
            const oy = dy * diff;
            if (!a.pinned) {
              a.x -= ox;
              a.y -= oy;
            }
            if (!b.pinned) {
              b.x += ox;
              b.y += oy;
            }
          }
        }
      }
    };

    /* ── Draw ───────────────────────────────────────────────── */

    let fgColor = "#E6DDF2";
    let accentColor = "#FF6B9D";

    const refreshColors = () => {
      const styles = getComputedStyle(document.documentElement);
      fgColor = styles.getPropertyValue("--foreground").trim() || fgColor;
      accentColor =
        styles.getPropertyValue("--primary").trim() || accentColor;
    };
    refreshColors();
    const observer = new MutationObserver(refreshColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (const vine of vines) {
        const pts = vine.points;

        // Draw stem
        ctx.beginPath();
        ctx.strokeStyle = fgColor;
        ctx.lineWidth = STEM_WIDTH;
        ctx.globalAlpha = 0.4;
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1];
          const curr = pts[i];
          const mx = (prev.x + curr.x) / 2;
          const my = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, mx, my);
        }
        const last = pts[pts.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();

        // Draw leaves
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.35;
        let side = vine.leafSide;
        for (
          let i = LEAF_INTERVAL;
          i < pts.length - 1;
          i += LEAF_INTERVAL
        ) {
          const p = pts[i];
          const next = pts[i + 1];
          const stemAngle = Math.atan2(next.y - p.y, next.x - p.x);
          const leafAngle = stemAngle + side * (Math.PI * 0.3);

          ctx.strokeStyle =
            i % (LEAF_INTERVAL * 2) === 0 ? fgColor : accentColor;

          const drawLeaf = LEAF_DRAWERS[vine.leafType];
          drawLeaf(ctx, p.x, p.y, vine.leafSize, leafAngle);
          side *= -1;
        }
      }

      ctx.globalAlpha = 1;
    };

    /* ── Loop ──────────────────────────────────────────────── */

    let raf = 0;

    const tick = () => {
      if (!reduceMotion) physics();
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    tick();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
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
