"use client";

import { useCallback, useRef, useState } from "react";

type Position = { x: number; y: number };

type DraggableWindowProps = {
  id: string;
  title: string;
  defaultPosition: Position;
  defaultSize?: { width: number; height?: number };
  zIndex: number;
  minimized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  children: React.ReactNode;
};

export function DraggableWindow({
  id,
  title,
  defaultPosition,
  defaultSize,
  zIndex,
  minimized,
  onFocus,
  onClose,
  onMinimize,
  children,
}: DraggableWindowProps) {
  const [position, setPosition] = useState<Position>(defaultPosition);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      onFocus();
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: position.x,
        originY: position.y,
      };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position, onFocus],
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  if (minimized) return null;

  return (
    <div
      ref={windowRef}
      data-window={id}
      onPointerDown={onFocus}
      className="absolute select-none rounded-lg border border-border/40 bg-card/95 shadow-2xl backdrop-blur-md"
      style={{
        left: position.x,
        top: position.y,
        zIndex,
        width: defaultSize?.width ?? 400,
        height: defaultSize?.height ?? "auto",
        maxHeight: "80vh",
      }}
    >
      {/* ── Title bar ──────────────────────────────────────── */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="flex cursor-grab items-center justify-between rounded-t-lg border-b border-border/30 bg-muted/60 px-3 py-2 active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="h-3 w-3 rounded-full bg-red-500/80 transition-opacity hover:opacity-70"
              aria-label="Close"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              className="h-3 w-3 rounded-full bg-yellow-500/80 transition-opacity hover:opacity-70"
              aria-label="Minimize"
            />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            {title}
          </span>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────────── */}
      <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(80vh - 40px)" }}>
        {children}
      </div>
    </div>
  );
}
