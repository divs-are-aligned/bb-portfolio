"use client";

import { useCallback, useState } from "react";

/* ── Types ─────────────────────────────────────────────────── */

type WindowConfig = {
  id: string;
  title: string;
  content: React.ReactNode;
  defaultMinimized?: boolean;
  /** Completely hidden when minimized (controlled by a desktop icon instead) */
  hideWhenMinimized?: boolean;
};

type DesktopIcon = {
  id: string;
  label: string;
  icon: React.ReactNode;
} & (
  | { action: "modal"; modalTitle: string; modalContent: React.ReactNode }
  | { action: "link"; href: string }
  | { action: "toggle"; windowId: string }
);

/* ── Window panel ──────────────────────────────────────────── */

function WindowPanel({
  title,
  minimized,
  onToggle,
  children,
}: {
  title: string;
  minimized: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "flex flex-col overflow-hidden rounded-lg border border-border/40 bg-card/95 shadow-lg backdrop-blur-md transition-all",
        minimized ? "" : "h-full",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        className={[
          "flex shrink-0 items-center justify-between bg-muted/60 px-3 py-2 transition-colors hover:bg-muted/80",
          minimized
            ? "rounded-lg"
            : "rounded-t-lg border-b border-border/30",
        ].join(" ")}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            {title}
          </span>
        </div>
        <svg
          viewBox="0 0 16 16"
          className={[
            "h-3 w-3 text-muted-foreground transition-transform",
            minimized ? "" : "rotate-180",
          ].join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      <div
        className={[
          "transition-[max-height,opacity] duration-300 ease-in-out",
          minimized
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-[2000px] opacity-100",
        ].join(" ")}
      >
        <div className="flex-1 overflow-y-auto p-4 [&_section]:mx-0 [&_section]:max-w-none [&_section]:px-0 [&_section]:py-0 [&_section]:scroll-mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Modal ─────────────────────────────────────────────────── */

function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-background/80 px-4 py-12 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg border border-border/40 bg-card shadow-2xl">
        <div className="flex items-center justify-between rounded-t-lg border-b border-border/30 bg-muted/60 px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-red-500/80 transition-opacity hover:opacity-70"
                aria-label="Close"
              />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {title}
            </span>
          </div>
        </div>
        <div className="max-h-[75vh] overflow-y-auto p-4 [&_section]:mx-0 [&_section]:max-w-none [&_section]:px-0 [&_section]:py-0 [&_section]:scroll-mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── Desktop ───────────────────────────────────────────────── */

type DesktopProps = {
  windows: WindowConfig[];
  icons: DesktopIcon[];
};

export function Desktop({ windows, icons }: DesktopProps) {
  const [minimized, setMinimized] = useState<Record<string, boolean>>(() => {
    const m: Record<string, boolean> = {};
    windows.forEach((w) => {
      m[w.id] = w.defaultMinimized ?? false;
    });
    return m;
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleMinimize = useCallback((id: string) => {
    setMinimized((s) => ({ ...s, [id]: !s[id] }));
  }, []);

  const handleIconClick = useCallback((icon: DesktopIcon) => {
    if (icon.action === "modal") {
      setActiveModal(icon.id);
    } else if (icon.action === "toggle") {
      setMinimized((s) => ({ ...s, [icon.windowId]: !s[icon.windowId] }));
    } else {
      window.location.href = icon.href;
    }
  }, []);

  const modalIcon =
    activeModal ? icons.find((i) => i.id === activeModal) : null;

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-6 py-6">
        <div className="flex flex-col gap-3">
          {/* ── Desktop icons ──────────────────────────────── */}
          <div className="flex items-start gap-1">
            {icons.map((icon) => (
              <button
                key={icon.id}
                type="button"
                onClick={() => handleIconClick(icon)}
                className="group flex w-20 flex-col items-center gap-1.5 rounded-lg p-3 transition-colors hover:bg-primary/10"
              >
                <div className="h-10 w-10 text-primary transition-transform group-hover:scale-105">
                  {icon.icon}
                </div>
                <span className="text-center font-mono text-[10px] uppercase leading-tight tracking-[0.06em] text-foreground/80">
                  {icon.label}
                </span>
              </button>
            ))}
          </div>

          {/* ── Stacked windows ────────────────────────────── */}
          {windows.map((w) => {
            const isMinimized = minimized[w.id];
            if (w.hideWhenMinimized && isMinimized) return null;
            return (
              <div key={w.id}>
                <WindowPanel
                  title={w.title}
                  minimized={isMinimized}
                  onToggle={() => toggleMinimize(w.id)}
                >
                  {w.content}
                </WindowPanel>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────────── */}
      {modalIcon && modalIcon.action === "modal" && (
        <Modal
          title={modalIcon.modalTitle}
          open={true}
          onClose={() => setActiveModal(null)}
        >
          {modalIcon.modalContent}
        </Modal>
      )}
    </>
  );
}
