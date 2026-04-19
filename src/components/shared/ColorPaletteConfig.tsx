"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTheme } from "next-themes";

// Five CSS vars the user can tune via pickers. Border / accent / foreground
// variants are derived from the preset to avoid an overwhelming picker list.
export const CUSTOMIZABLE_KEYS = [
  "background",
  "foreground",
  "primary",
  "mutedForeground",
  "card",
] as const;
export type CustomizableKey = (typeof CUSTOMIZABLE_KEYS)[number];

export type PaletteVars = {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  mutedForeground: string;
  card: string;
  border: string;
  accent: string;
  accentForeground: string;
};

export type PaletteMode = "light" | "dark";

export type Palette = {
  id: string;
  name: string;
  mode: PaletteMode;
  vars: PaletteVars;
};

const VAR_MAP: Record<keyof PaletteVars, string> = {
  background: "--background",
  foreground: "--foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  mutedForeground: "--muted-foreground",
  card: "--card",
  border: "--border",
  accent: "--accent",
  accentForeground: "--accent-foreground",
};

export const LIGHT_PALETTES: Palette[] = [
  {
    id: "paper",
    name: "Paper",
    mode: "light",
    vars: {
      background: "#ffffff",
      foreground: "#1f1f1f",
      primary: "#111111",
      primaryForeground: "#fafafa",
      mutedForeground: "#5c5c5c",
      card: "#ffffff",
      border: "#e5e5e5",
      accent: "#f5f5f5",
      accentForeground: "#111111",
    },
  },
  {
    id: "parchment",
    name: "Cream Parchment",
    mode: "light",
    vars: {
      background: "#f6ecd6",
      foreground: "#3a2a18",
      primary: "#8a4b1c",
      primaryForeground: "#f6ecd6",
      mutedForeground: "#6b5335",
      card: "#f1e5c7",
      border: "#d8c79a",
      accent: "#e9d9b1",
      accentForeground: "#5c3314",
    },
  },
  {
    id: "sage",
    name: "Sage Garden",
    mode: "light",
    vars: {
      background: "#eef4ed",
      foreground: "#1e3127",
      primary: "#3f7a5c",
      primaryForeground: "#eef4ed",
      mutedForeground: "#4f6a5a",
      card: "#e5ede5",
      border: "#c0d3c4",
      accent: "#d6e3d6",
      accentForeground: "#284a38",
    },
  },
  {
    id: "rose",
    name: "Rose Morning",
    mode: "light",
    vars: {
      background: "#fbf1f0",
      foreground: "#3b1f24",
      primary: "#b14560",
      primaryForeground: "#fbf1f0",
      mutedForeground: "#6f4c52",
      card: "#f6e5e6",
      border: "#e6c0c4",
      accent: "#efd1d4",
      accentForeground: "#6f2a3a",
    },
  },
  {
    id: "cobalt",
    name: "Cobalt Notebook",
    mode: "light",
    vars: {
      background: "#eff4fb",
      foreground: "#1a2440",
      primary: "#2a62c4",
      primaryForeground: "#eff4fb",
      mutedForeground: "#4e5a78",
      card: "#e3eaf5",
      border: "#c6d2e6",
      accent: "#d4ddef",
      accentForeground: "#1a3d7a",
    },
  },
  {
    id: "vapor-light",
    name: "Vapor Pastel",
    mode: "light",
    vars: {
      background: "#F5EFF8",
      foreground: "#1E1434",
      primary: "#C43A6E",
      primaryForeground: "#F5EFF8",
      mutedForeground: "#6B5A80",
      card: "#EDE5F3",
      border: "#D4C6E0",
      accent: "#E2D4EF",
      accentForeground: "#8A2B5A",
    },
  },
];

export const DARK_PALETTES: Palette[] = [
  {
    id: "nebula",
    name: "Nebula Green",
    mode: "dark",
    vars: {
      background: "#080B10",
      foreground: "#D4F5E9",
      primary: "#3ECDA0",
      primaryForeground: "#080B10",
      mutedForeground: "#7ABFA6",
      card: "#112018",
      border: "#1d3329",
      accent: "#0D4A38",
      accentForeground: "#3ECDA0",
    },
  },
  {
    id: "amber",
    name: "Amber Dusk",
    mode: "dark",
    vars: {
      background: "#15100a",
      foreground: "#f4e4c6",
      primary: "#E5A33A",
      primaryForeground: "#15100a",
      mutedForeground: "#b19074",
      card: "#211a10",
      border: "#3a2d18",
      accent: "#3d2c16",
      accentForeground: "#E5A33A",
    },
  },
  {
    id: "deepsea",
    name: "Deep Sea",
    mode: "dark",
    vars: {
      background: "#070d1a",
      foreground: "#cfe3ff",
      primary: "#4f90ff",
      primaryForeground: "#070d1a",
      mutedForeground: "#7e9cc3",
      card: "#0f1a2e",
      border: "#1a2b4a",
      accent: "#19304f",
      accentForeground: "#4f90ff",
    },
  },
  {
    id: "ember",
    name: "Ember",
    mode: "dark",
    vars: {
      background: "#140a08",
      foreground: "#f4d4c7",
      primary: "#e85a3e",
      primaryForeground: "#140a08",
      mutedForeground: "#b2877a",
      card: "#24120e",
      border: "#3e1b13",
      accent: "#3d1912",
      accentForeground: "#e85a3e",
    },
  },
  {
    id: "violet",
    name: "Violet Noir",
    mode: "dark",
    vars: {
      background: "#0f0a1c",
      foreground: "#e4d4f5",
      primary: "#a372f0",
      primaryForeground: "#0f0a1c",
      mutedForeground: "#9b8ab3",
      card: "#1a1230",
      border: "#2a1d4a",
      accent: "#2a1d4a",
      accentForeground: "#a372f0",
    },
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    mode: "dark",
    vars: {
      background: "#0D0B1E",
      foreground: "#E6DDF2",
      primary: "#FF6B9D",
      primaryForeground: "#0D0B1E",
      mutedForeground: "#9B8AB8",
      card: "#1A1232",
      border: "#2D1F4E",
      accent: "#3D2068",
      accentForeground: "#FF6B9D",
    },
  },
];

const ALL_PALETTES = [...LIGHT_PALETTES, ...DARK_PALETTES];
const DEFAULT_LIGHT_ID = "paper";
const DEFAULT_DARK_ID = "nebula";
const STORAGE_KEY = "bb-color-palette-v1";

type CustomOverrides = Partial<Record<CustomizableKey, string>>;

type PersistedState = {
  lightPaletteId: string;
  darkPaletteId: string;
  customLight: CustomOverrides;
  customDark: CustomOverrides;
};

const DEFAULT_STATE: PersistedState = {
  lightPaletteId: DEFAULT_LIGHT_ID,
  darkPaletteId: DEFAULT_DARK_ID,
  customLight: {},
  customDark: {},
};

function resolvePalette(id: string, mode: PaletteMode): Palette {
  const pool = mode === "light" ? LIGHT_PALETTES : DARK_PALETTES;
  return (
    pool.find((p) => p.id === id) ??
    (mode === "light" ? LIGHT_PALETTES[0] : DARK_PALETTES[0])
  );
}

function mergeOverrides(base: PaletteVars, overrides: CustomOverrides): PaletteVars {
  return { ...base, ...overrides };
}

function applyPalette(vars: PaletteVars) {
  if (typeof document === "undefined") return;
  const style = document.documentElement.style;
  for (const [key, value] of Object.entries(vars)) {
    style.setProperty(VAR_MAP[key as keyof PaletteVars], value);
  }
}

type Ctx = {
  mode: PaletteMode;
  lightPalette: Palette;
  darkPalette: Palette;
  activePalette: Palette;
  effectiveVars: PaletteVars;
  customOverrides: CustomOverrides;
  isCustomized: boolean;
  setPalette: (id: string) => void;
  setCustomColor: (key: CustomizableKey, hex: string) => void;
  shuffle: () => void;
  reset: () => void;
};

const ColorPaletteContext = createContext<Ctx | null>(null);

export function ColorPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const mode: PaletteMode = resolvedTheme === "light" ? "light" : "dark";

  const [state, setState] = useState<PersistedState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage post-mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const lightPalette = useMemo(
    () => resolvePalette(state.lightPaletteId, "light"),
    [state.lightPaletteId],
  );
  const darkPalette = useMemo(
    () => resolvePalette(state.darkPaletteId, "dark"),
    [state.darkPaletteId],
  );

  const effectiveLightVars = useMemo(
    () => mergeOverrides(lightPalette.vars, state.customLight),
    [lightPalette, state.customLight],
  );
  const effectiveDarkVars = useMemo(
    () => mergeOverrides(darkPalette.vars, state.customDark),
    [darkPalette, state.customDark],
  );

  const activePalette = mode === "light" ? lightPalette : darkPalette;
  const effectiveVars = mode === "light" ? effectiveLightVars : effectiveDarkVars;
  const customOverrides = mode === "light" ? state.customLight : state.customDark;
  const isCustomized = Object.keys(customOverrides).length > 0;

  // Apply to :root inline so it overrides :root / .dark declarations.
  useEffect(() => {
    applyPalette(effectiveVars);
  }, [effectiveVars]);

  const setPalette = useCallback(
    (id: string) => {
      const palette = ALL_PALETTES.find((p) => p.id === id);
      if (!palette) return;
      setState((s) =>
        palette.mode === "light"
          ? { ...s, lightPaletteId: id, customLight: {} }
          : { ...s, darkPaletteId: id, customDark: {} },
      );
    },
    [],
  );

  const setCustomColor = useCallback(
    (key: CustomizableKey, hex: string) => {
      setState((s) =>
        mode === "light"
          ? { ...s, customLight: { ...s.customLight, [key]: hex } }
          : { ...s, customDark: { ...s.customDark, [key]: hex } },
      );
    },
    [mode],
  );

  const shuffle = useCallback(() => {
    setState((s) => {
      if (mode === "light") {
        const pool = LIGHT_PALETTES.filter((p) => p.id !== s.lightPaletteId);
        const next = pool[Math.floor(Math.random() * pool.length)];
        return next
          ? { ...s, lightPaletteId: next.id, customLight: {} }
          : s;
      }
      const pool = DARK_PALETTES.filter((p) => p.id !== s.darkPaletteId);
      const next = pool[Math.floor(Math.random() * pool.length)];
      return next ? { ...s, darkPaletteId: next.id, customDark: {} } : s;
    });
  }, [mode]);

  const reset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  return (
    <ColorPaletteContext.Provider
      value={{
        mode,
        lightPalette,
        darkPalette,
        activePalette,
        effectiveVars,
        customOverrides,
        isCustomized,
        setPalette,
        setCustomColor,
        shuffle,
        reset,
      }}
    >
      {children}
    </ColorPaletteContext.Provider>
  );
}

export function useColorPalette() {
  const ctx = useContext(ColorPaletteContext);
  if (!ctx)
    throw new Error(
      "useColorPalette must be used inside ColorPaletteProvider",
    );
  return ctx;
}
