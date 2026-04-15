"use client";

import { useEffect, useRef } from "react";
import { PORTRAIT_PATH, PORTRAIT_VIEWBOX } from "@/lib/portraitPath";

const SAMPLE_COUNT = 240;
const GRAB_RADIUS_RATIO = 0.08; // of viewBox height
const INFLUENCE = 30;
const SPRING = 0.08;
const DAMPING = 0.82;
const CONSTRAINT_ITERS = 2;
const GRAB_RADIUS = PORTRAIT_VIEWBOX_RADIUS();
function PORTRAIT_VIEWBOX_RADIUS() {
  return PORTRAIT_VIEWBOX.h * GRAB_RADIUS_RATIO;
}

type Point = {
  x: number;
  y: number;
  px: number;
  py: number;
  rx: number;
  ry: number;
};

export function DraggablePortrait({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const hiddenPathRef = useRef<SVGPathElement | null>(null);
  const livePathRef = useRef<SVGPathElement | null>(null);
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    const hidden = hiddenPathRef.current;
    const live = livePathRef.current;
    if (!svg || !hidden || !live) return;

    const len = hidden.getTotalLength();
    const pts: Point[] = [];
    const flipX = (x: number) => PORTRAIT_VIEWBOX.w - x;
    for (let i = 0; i < SAMPLE_COUNT; i++) {
      const p = hidden.getPointAtLength((i / (SAMPLE_COUNT - 1)) * len);
      const x = flipX(p.x);
      pts.push({ x, y: p.y, px: x, py: p.y, rx: x, ry: p.y });
    }
    pointsRef.current = pts;

    const restDist: number[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const dx = pts[i + 1].rx - pts[i].rx;
      const dy = pts[i + 1].ry - pts[i].ry;
      restDist.push(Math.hypot(dx, dy));
    }

    // Sharp reversals (U-turns) are artifactual connectors from silhouette
    // filling — split the rendered path there and skip physics across them.
    const breaks = new Set<number>();
    for (let i = 1; i < pts.length - 1; i++) {
      const ax = pts[i].rx - pts[i - 1].rx;
      const ay = pts[i].ry - pts[i - 1].ry;
      const bx = pts[i + 1].rx - pts[i].rx;
      const by = pts[i + 1].ry - pts[i].ry;
      const aLen = Math.hypot(ax, ay);
      const bLen = Math.hypot(bx, by);
      if (aLen < 1e-5 || bLen < 1e-5) continue;
      const cos = (ax * bx + ay * by) / (aLen * bLen);
      if (cos < -0.5) breaks.add(i);
    }
    // Also always break at the very start so the open path doesn't show a
    // leading connector from the first sample to the silhouette outline.
    breaks.add(0);

    let grabIndex = -1;
    let raf = 0;
    let pointerId: number | null = null;

    const svgPointFromEvent = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * PORTRAIT_VIEWBOX.w;
      const y = ((e.clientY - rect.top) / rect.height) * PORTRAIT_VIEWBOX.h;
      return { x, y };
    };

    const onDown = (e: PointerEvent) => {
      const { x, y } = svgPointFromEvent(e);
      let best = -1;
      let bestDist = GRAB_RADIUS;
      for (let i = 0; i < pts.length; i++) {
        const d = Math.hypot(pts[i].x - x, pts[i].y - y);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      if (best >= 0) {
        grabIndex = best;
        pointerId = e.pointerId;
        svg.setPointerCapture(e.pointerId);
        e.preventDefault();
      }
    };

    const onMove = (e: PointerEvent) => {
      if (grabIndex < 0 || e.pointerId !== pointerId) return;
      const { x, y } = svgPointFromEvent(e);
      const pt = pts[grabIndex];
      pt.px = pt.x;
      pt.py = pt.y;
      pt.x = x;
      pt.y = y;
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      grabIndex = -1;
      pointerId = null;
      try {
        svg.releasePointerCapture(e.pointerId);
      } catch {}
    };

    const buildPathD = () => {
      if (pts.length === 0) return "";
      let d = "";
      for (let i = 0; i < pts.length; i++) {
        const cmd = i === 0 || breaks.has(i) ? "M" : "L";
        d += `${d ? " " : ""}${cmd} ${pts[i].x.toFixed(3)} ${pts[i].y.toFixed(3)}`;
      }
      return d;
    };

    const tick = () => {
      for (let i = 0; i < pts.length; i++) {
        if (i === grabIndex) continue;
        const p = pts[i];
        const vx = (p.x - p.px) * DAMPING;
        const vy = (p.y - p.py) * DAMPING;
        p.px = p.x;
        p.py = p.y;
        p.x += vx + (p.rx - p.x) * SPRING;
        p.y += vy + (p.ry - p.y) * SPRING;
      }

      if (grabIndex >= 0) {
        for (let i = 0; i < pts.length; i++) {
          if (i === grabIndex) continue;
          const d = Math.abs(i - grabIndex);
          if (d > INFLUENCE) continue;
          const falloff = 1 - d / INFLUENCE;
          const strength = falloff * falloff * 0.35;
          const grabbed = pts[grabIndex];
          const p = pts[i];
          p.x += (grabbed.x - (grabbed.rx - (p.rx - p.x)) - p.x) * strength * 0.1;
          p.y += (grabbed.y - (grabbed.ry - (p.ry - p.y)) - p.y) * strength * 0.1;
        }
      }

      for (let iter = 0; iter < CONSTRAINT_ITERS; iter++) {
        for (let i = 0; i < pts.length - 1; i++) {
          if (breaks.has(i + 1)) continue;
          const a = pts[i];
          const b = pts[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = (dist - restDist[i]) / dist;
          const ax = dx * 0.5 * diff;
          const ay = dy * 0.5 * diff;
          if (i !== grabIndex) {
            a.x += ax;
            a.y += ay;
          }
          if (i + 1 !== grabIndex) {
            b.x -= ax;
            b.y -= ay;
          }
        }
      }

      live.setAttribute("d", buildPathD());
      raf = requestAnimationFrame(tick);
    };

    live.setAttribute("d", buildPathD());
    svg.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      svg.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${PORTRAIT_VIEWBOX.w} ${PORTRAIT_VIEWBOX.h}`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={0.35}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ touchAction: "none" }}
      aria-label="Illustrated self-portrait — drag to deform"
    >
      <path
        ref={hiddenPathRef}
        d={PORTRAIT_PATH}
        style={{ visibility: "hidden" }}
      />
      <path ref={livePathRef} />
    </svg>
  );
}
