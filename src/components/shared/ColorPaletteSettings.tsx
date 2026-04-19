"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PaletteIcon, ShuffleIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CUSTOMIZABLE_KEYS,
  DARK_PALETTES,
  LIGHT_PALETTES,
  useColorPalette,
  type CustomizableKey,
  type Palette,
} from "./ColorPaletteConfig";

const LABELS: Record<CustomizableKey, string> = {
  background: "Background",
  foreground: "Foreground",
  primary: "Primary",
  mutedForeground: "Muted text",
  card: "Card",
};

export function ColorPaletteSettings() {
  const {
    mode,
    activePalette,
    effectiveVars,
    isCustomized,
    setPalette,
    setCustomColor,
    shuffle,
    reset,
  } = useColorPalette();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (target.closest('[data-palette-settings-trigger="true"]')) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const availablePalettes = mode === "light" ? LIGHT_PALETTES : DARK_PALETTES;

  return (
    <>
      <Button
        data-palette-settings-trigger="true"
        variant="ghost"
        size="icon"
        aria-label="Customize color palette"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <PaletteIcon className="size-5" />
      </Button>

      {mounted &&
        createPortal(
          <aside
            ref={panelRef}
            role="dialog"
            aria-label="Color palette settings"
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
                <h2 className="font-heading text-base font-medium">
                  Color palette
                </h2>
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                  {mode === "light" ? "Light" : "Dark"} · {activePalette.name}
                  {isCustomized ? " (customized)" : ""}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Close palette settings"
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
                Shuffle {mode} preset
              </Button>

              <Field label="Presets">
                <div className="flex flex-col gap-2">
                  {availablePalettes.map((p) => (
                    <PresetRow
                      key={p.id}
                      palette={p}
                      active={activePalette.id === p.id}
                      onSelect={() => setPalette(p.id)}
                    />
                  ))}
                </div>
              </Field>

              <Field label="Customize">
                <div className="flex flex-col gap-2">
                  {CUSTOMIZABLE_KEYS.map((key) => (
                    <ColorRow
                      key={key}
                      label={LABELS[key]}
                      value={effectiveVars[key]}
                      onChange={(hex) => setCustomColor(key, hex)}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Edits apply to the active preset and are saved to this browser.
                </p>
              </Field>

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

function PresetRow({
  palette,
  active,
  onSelect,
}: {
  palette: Palette;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={[
        "flex items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
      ].join(" ")}
    >
      <span className="flex shrink-0 overflow-hidden rounded-md border border-border/60">
        <Swatch color={palette.vars.background} />
        <Swatch color={palette.vars.foreground} />
        <Swatch color={palette.vars.primary} />
        <Swatch color={palette.vars.card} />
        <Swatch color={palette.vars.mutedForeground} />
      </span>
      <span className="flex-1 text-sm text-foreground">{palette.name}</span>
    </button>
  );
}

function Swatch({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="h-6 w-4"
      style={{ backgroundColor: color }}
    />
  );
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  // Native color picker only accepts 6-digit hex. Coerce gracefully.
  const hex = normalizeHex(value);
  return (
    <label className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2">
      <input
        type="color"
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-10 shrink-0 cursor-pointer rounded border border-border/60 bg-transparent"
        aria-label={`${label} color`}
      />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      <span className="font-mono text-xs uppercase text-muted-foreground">
        {hex}
      </span>
    </label>
  );
}

function normalizeHex(value: string): string {
  if (/^#[0-9a-fA-F]{6}$/.test(value)) return value.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(value)) {
    const [r, g, b] = value.slice(1).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return "#000000";
}
