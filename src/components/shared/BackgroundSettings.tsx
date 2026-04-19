"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SettingsIcon, ShuffleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BACKGROUND_SYMBOLS,
  useBackgroundConfig,
  type BackgroundSymbol,
} from "./BackgroundConfig";

const symbolGlyph: Record<BackgroundSymbol, string> = {
  cross: "+",
  x: "×",
  star: "✳",
  dot: "•",
  circle: "○",
  dash: "—",
  triangle: "△",
};

export function BackgroundSettings() {
  const {
    config,
    setConfig,
    reset,
    shuffle,
    currentPresetName,
    setInteractionPaused,
  } = useBackgroundConfig();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on outside click. Ignore clicks on the trigger button itself so
  // the toggle handler there isn't double-fired.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (target.closest('[data-bg-settings-trigger="true"]')) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  // Pause grid cursor-interaction while the panel is open so hovering
  // over the panel doesn't spin the crosses behind it.
  useEffect(() => {
    setInteractionPaused(open);
    return () => setInteractionPaused(false);
  }, [open, setInteractionPaused]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button
        data-bg-settings-trigger="true"
        variant="ghost"
        size="icon"
        aria-label="Customize background"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <SettingsIcon className="size-5" />
      </Button>

      {mounted &&
        createPortal(
          <aside
            ref={panelRef}
            role="dialog"
            aria-label="Background settings"
            aria-hidden={!open}
            className={[
              "fixed inset-y-0 right-0 z-[60] flex w-80 max-w-full flex-col overflow-y-auto",
              "border-l border-border/60 bg-background/90 shadow-lg",
              "supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-md",
              "transition-transform duration-200 ease-out",
              open ? "translate-x-0" : "translate-x-full pointer-events-none",
            ].join(" ")}
          >
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <div>
            <h2 className="font-heading text-base font-medium">Background</h2>
            {currentPresetName && (
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                Preset · {currentPresetName}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Close settings"
            onClick={() => setOpen(false)}
          >
            <XIcon className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col gap-6 px-4 py-5 text-sm">
          <Button
            variant="outline"
            onClick={shuffle}
            className="flex items-center justify-center gap-2"
          >
            <ShuffleIcon className="size-4" />
            Shuffle preset
          </Button>

          <Field label="Symbol">
            <div className="grid grid-cols-4 gap-1.5">
              {BACKGROUND_SYMBOLS.map((s) => {
                const active = config.symbol === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setConfig({ symbol: s })}
                    aria-pressed={active}
                    title={s}
                    className={[
                      "flex h-10 items-center justify-center rounded-md border text-lg transition-colors",
                      active
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
                    ].join(" ")}
                  >
                    <span aria-hidden="true">{symbolGlyph[s]}</span>
                  </button>
                );
              })}
            </div>
          </Field>

          <Slider
            label="Density"
            hint={`${config.spacing}px spacing`}
            min={14}
            max={60}
            step={1}
            value={config.spacing}
            onChange={(spacing) => setConfig({ spacing })}
          />

          <Slider
            label="Symbol size"
            hint={`${config.size}px`}
            min={2}
            max={12}
            step={0.5}
            value={config.size}
            onChange={(size) => setConfig({ size })}
          />

          <Slider
            label="Stroke width"
            hint={`${config.strokeWidth}px`}
            min={0.5}
            max={3}
            step={0.25}
            value={config.strokeWidth}
            onChange={(strokeWidth) => setConfig({ strokeWidth })}
          />

          <Slider
            label="Cursor reach"
            hint={`${config.mouseRadius}px`}
            min={40}
            max={320}
            step={10}
            value={config.mouseRadius}
            onChange={(mouseRadius) => setConfig({ mouseRadius })}
          />

          <Slider
            label="Spin on hover"
            hint={`${config.maxSpinDeg}°`}
            min={0}
            max={720}
            step={30}
            value={config.maxSpinDeg}
            onChange={(maxSpinDeg) => setConfig({ maxSpinDeg })}
          />

          <Slider
            label="Trail length"
            hint={
              config.heatDecay <= 0.01
                ? "very long"
                : config.heatDecay >= 0.12
                  ? "instant"
                  : "medium"
            }
            min={0.005}
            max={0.2}
            step={0.005}
            value={config.heatDecay}
            onChange={(heatDecay) => setConfig({ heatDecay })}
          />

          <Button variant="ghost" onClick={reset} className="mt-2">
            Reset to defaults
          </Button>
        </div>
      </aside>,
          document.body,
        )}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function Slider({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <Field label={label}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-primary"
      />
      {hint && (
        <span className="text-xs text-muted-foreground">{hint}</span>
      )}
    </Field>
  );
}
