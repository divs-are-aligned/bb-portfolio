"use client";

import { useState } from "react";
import {
  platyceriumImageUrl,
  type SpeciesImage,
} from "@/data/platyceriumImages";

export function SpeciesGallery({ images }: { images: SpeciesImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const active = images[activeIndex];

  return (
    <div className="mt-8">
      {/* Main image */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="w-full overflow-hidden rounded-lg border border-border/60 transition-opacity hover:opacity-90"
      >
        <img
          src={platyceriumImageUrl(active.filename)}
          alt={active.alt}
          className="w-full cursor-zoom-in object-cover"
          style={{ maxHeight: 420 }}
        />
      </button>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground transition-colors hover:bg-card"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={platyceriumImageUrl(active.filename)}
            alt={active.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + images.length) % images.length);
                }}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground transition-colors hover:bg-card"
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % images.length);
                }}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground transition-colors hover:bg-card"
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.filename}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={[
                "h-16 w-16 shrink-0 overflow-hidden rounded-md border object-cover transition-all",
                i === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border/60 opacity-60 hover:opacity-100",
              ].join(" ")}
            >
              <img
                src={platyceriumImageUrl(img.filename)}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
