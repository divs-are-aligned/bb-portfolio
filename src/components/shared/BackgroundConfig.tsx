"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const BACKGROUND_SYMBOLS = [
  "cross",
  "x",
  "star",
  "dot",
  "circle",
  "dash",
  "triangle",
  "diamond",
  "arrow",
  "wave",
  "infinity",
  "text:PLATYCERIUM",
  "text:BART BUDAK",
] as const;

export type BackgroundSymbol = (typeof BACKGROUND_SYMBOLS)[number];

export type BackgroundConfig = {
  symbol: BackgroundSymbol;
  spacing: number;
  size: number;
  strokeWidth: number;
  mouseRadius: number;
  maxSpinDeg: number;
  heatDecay: number;
};

export const DEFAULT_BACKGROUND_CONFIG: BackgroundConfig = {
  symbol: "star",
  spacing: 37,
  size: 8,
  strokeWidth: 3,
  mouseRadius: 200,
  maxSpinDeg: 120,
  heatDecay: 0.008,
};

// Hand-tuned presets. Each is a coherent look — symbol, density, and motion
// feel dialed together rather than independent sliders.
export type BackgroundPreset = {
  name: string;
  config: BackgroundConfig;
};

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  {
    name: "Quiet crosses",
    config: {
      symbol: "cross",
      spacing: 32,
      size: 4,
      strokeWidth: 0.9,
      mouseRadius: 80,
      maxSpinDeg: 360,
      heatDecay: 0.03,

    },
  },
  {
    name: "Constellation",
    config: {
      symbol: "dot",
      spacing: 22,
      size: 3,
      strokeWidth: 1,
      mouseRadius: 100,
      maxSpinDeg: 0,
      heatDecay: 0.015,

    },
  },
  {
    name: "Starfield",
    config: {
      symbol: "star",
      spacing: 40,
      size: 5,
      strokeWidth: 0.8,
      mouseRadius: 90,
      maxSpinDeg: 540,
      heatDecay: 0.02,

    },
  },
  {
    name: "Grid paper",
    config: {
      symbol: "dash",
      spacing: 18,
      size: 4,
      strokeWidth: 0.5,
      mouseRadius: 70,
      maxSpinDeg: 180,
      heatDecay: 0.04,

    },
  },
  {
    name: "Circuit",
    config: {
      symbol: "x",
      spacing: 26,
      size: 3.5,
      strokeWidth: 1,
      mouseRadius: 90,
      maxSpinDeg: 720,
      heatDecay: 0.025,

    },
  },
  {
    name: "Portholes",
    config: {
      symbol: "circle",
      spacing: 36,
      size: 4,
      strokeWidth: 1,
      mouseRadius: 100,
      maxSpinDeg: 120,
      heatDecay: 0.02,

    },
  },
  {
    name: "Origami",
    config: {
      symbol: "triangle",
      spacing: 30,
      size: 5,
      strokeWidth: 0.8,
      mouseRadius: 80,
      maxSpinDeg: 360,
      heatDecay: 0.03,

    },
  },
  {
    name: "Dense mist",
    config: {
      symbol: "dot",
      spacing: 16,
      size: 2,
      strokeWidth: 1,
      mouseRadius: 70,
      maxSpinDeg: 0,
      heatDecay: 0.06,

    },
  },
  {
    name: "Blueprint",
    config: {
      symbol: "cross",
      spacing: 20,
      size: 3,
      strokeWidth: 0.6,
      mouseRadius: 75,
      maxSpinDeg: 180,
      heatDecay: 0.04,
    },
  },
  {
    name: "Diamonds",
    config: {
      symbol: "diamond",
      spacing: 30,
      size: 5,
      strokeWidth: 0.8,
      mouseRadius: 90,
      maxSpinDeg: 360,
      heatDecay: 0.025,
    },
  },
  {
    name: "Arrows",
    config: {
      symbol: "arrow",
      spacing: 28,
      size: 6,
      strokeWidth: 1,
      mouseRadius: 100,
      maxSpinDeg: 720,
      heatDecay: 0.02,
    },
  },
  {
    name: "Ocean",
    config: {
      symbol: "wave",
      spacing: 24,
      size: 5,
      strokeWidth: 1,
      mouseRadius: 80,
      maxSpinDeg: 180,
      heatDecay: 0.03,
    },
  },
  {
    name: "Platycerium",
    config: {
      symbol: "text:PLATYCERIUM",
      spacing: 44,
      size: 5,
      strokeWidth: 1,
      mouseRadius: 120,
      maxSpinDeg: 30,
      heatDecay: 0.015,
    },
  },
  {
    name: "Signature",
    config: {
      symbol: "text:BART BUDAK",
      spacing: 44,
      size: 5,
      strokeWidth: 1,
      mouseRadius: 120,
      maxSpinDeg: 20,
      heatDecay: 0.015,
    },
  },
];

type Ctx = {
  config: BackgroundConfig;
  setConfig: (update: Partial<BackgroundConfig>) => void;
  reset: () => void;
  shuffle: () => void;
  currentPresetName: string | null;
  interactionPaused: boolean;
  setInteractionPaused: (v: boolean) => void;
};

const BackgroundConfigContext = createContext<Ctx | null>(null);

function pickRandomPreset(exclude?: string | null): BackgroundPreset {
  const pool = exclude
    ? BACKGROUND_PRESETS.filter((p) => p.name !== exclude)
    : BACKGROUND_PRESETS;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function BackgroundConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfigState] = useState<BackgroundConfig>(
    DEFAULT_BACKGROUND_CONFIG,
  );
  const [currentPresetName, setCurrentPresetName] = useState<string | null>(
    null,
  );
  const [interactionPaused, setInteractionPaused] = useState(false);

  // Pick a random preset on mount so every page load feels different.
  useEffect(() => {
    const preset = pickRandomPreset();
    setConfigState(preset.config);
    setCurrentPresetName(preset.name);
  }, []);

  const setConfig = useCallback((update: Partial<BackgroundConfig>) => {
    setConfigState((c) => ({ ...c, ...update }));
    // Any manual tweak means we're no longer on a named preset.
    setCurrentPresetName(null);
  }, []);

  const reset = useCallback(() => {
    setConfigState(DEFAULT_BACKGROUND_CONFIG);
    setCurrentPresetName(null);
  }, []);

  const shuffle = useCallback(() => {
    setCurrentPresetName((prev) => {
      const next = pickRandomPreset(prev);
      setConfigState(next.config);
      return next.name;
    });
  }, []);

  return (
    <BackgroundConfigContext.Provider
      value={{
        config,
        setConfig,
        reset,
        shuffle,
        currentPresetName,
        interactionPaused,
        setInteractionPaused,
      }}
    >
      {children}
    </BackgroundConfigContext.Provider>
  );
}

export function useBackgroundConfig() {
  const ctx = useContext(BackgroundConfigContext);
  if (!ctx)
    throw new Error(
      "useBackgroundConfig must be used inside BackgroundConfigProvider",
    );
  return ctx;
}
