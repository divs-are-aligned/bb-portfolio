"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
  InfoIcon,
} from "lucide-react";
import {
  speciesImages,
  platyceriumImageUrl,
  type SpeciesImage,
} from "@/data/platyceriumImages";

export function PlatyceriumCardImage({ slug }: { slug: string }) {
  const images = speciesImages[slug];
  const [cardIndex, setCardIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [settling, setSettling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const swiped = useRef(false);

  if (!images || images.length === 0) return null;

  const multi = images.length > 1;

  const onPointerDown = (e: React.PointerEvent) => {
    if (!multi) return;
    dragging.current = true;
    swiped.current = false;
    startX.current = e.clientX;
    setSettling(false);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    // Resist dragging past edges
    const atStart = cardIndex === 0 && dx > 0;
    const atEnd = cardIndex === images.length - 1 && dx < 0;
    setDragOffset(atStart || atEnd ? dx * 0.25 : dx);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const width = containerRef.current?.offsetWidth ?? 300;
    const threshold = width * 0.2;
    let next = cardIndex;
    if (dragOffset < -threshold && cardIndex < images.length - 1) next = cardIndex + 1;
    if (dragOffset > threshold && cardIndex > 0) next = cardIndex - 1;

    if (next !== cardIndex) swiped.current = true;

    // Animate to final position then snap
    setSettling(true);
    setDragOffset(next < cardIndex ? width : next > cardIndex ? -width : 0);
    setTimeout(() => {
      setCardIndex(next);
      setDragOffset(0);
      setSettling(false);
    }, 250);
  };

  const onClickGuard = (e: React.MouseEvent) => {
    if (swiped.current) {
      e.preventDefault();
      e.stopPropagation();
      swiped.current = false;
    }
  };

  const translateX = -cardIndex * 100;

  return (
    <GalleryTrigger slug={slug} images={images} startIndex={cardIndex}>
      <div
        ref={containerRef}
        className="group/img relative h-56 sm:h-40 w-full overflow-hidden"
        style={{ touchAction: multi ? "pan-y pinch-zoom" : undefined, cursor: multi ? "grab" : undefined }}
        onPointerDown={multi ? onPointerDown : undefined}
        onPointerMove={multi ? onPointerMove : undefined}
        onPointerUp={multi ? onPointerUp : undefined}
        onPointerCancel={multi ? onPointerUp : undefined}
        onClickCapture={multi ? onClickGuard : undefined}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(${translateX}% + ${dragOffset}px))`,
            transition: settling ? "transform 250ms cubic-bezier(.4,0,.2,1)" : dragging.current ? "none" : undefined,
            willChange: "transform",
          }}
        >
          {images.map((img) => (
            <img
              key={img.filename}
              src={platyceriumImageUrl(img.filename)}
              alt={img.alt}
              loading="lazy"
              draggable={false}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>
        {multi && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={[
                  "block size-1.5 rounded-full transition-all duration-250",
                  i === cardIndex
                    ? "bg-foreground scale-125"
                    : "bg-foreground/40",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>
    </GalleryTrigger>
  );
}

function GalleryTrigger({
  slug,
  images,
  startIndex = 0,
  children,
}: {
  slug: string;
  images: SpeciesImage[];
  startIndex?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full text-left"
        aria-label={`View all images for ${slug}`}
      >
        {children}
      </button>
      {open && (
        <GalleryOverlay
          slug={slug}
          images={images}
          initialIndex={startIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

function GalleryOverlay({
  slug,
  images,
  initialIndex = 0,
  onClose,
}: {
  slug: string;
  images: SpeciesImage[];
  initialIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [settling, setSettling] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(Math.min(index + 1, images.length - 1));
      if (e.key === "ArrowLeft") goTo(Math.max(index - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, index, onClose]);

  const goTo = useCallback((next: number) => {
    if (next === index && dragOffset === 0) return;
    setSettling(true);
    setDragOffset(0);
    setIndex(next);
    setTimeout(() => setSettling(false), 300);
  }, [index, dragOffset]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (images.length <= 1) return;
    dragging.current = true;
    startX.current = e.clientX;
    setSettling(false);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startX.current;
    const atStart = index === 0 && dx > 0;
    const atEnd = index === images.length - 1 && dx < 0;
    setDragOffset(atStart || atEnd ? dx * 0.25 : dx);
  };

  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const width = containerRef.current?.offsetWidth ?? 600;
    const threshold = width * 0.15;
    let next = index;
    if (dragOffset < -threshold && index < images.length - 1) next = index + 1;
    if (dragOffset > threshold && index > 0) next = index - 1;
    goTo(next);
  };

  if (!mounted) return null;

  const current = images[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-background/95 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-label={`Image gallery for ${slug}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <div className="flex items-center gap-3">
          <p className="font-heading text-sm font-medium italic text-foreground">
            P. {slug}
          </p>
          <span className="font-mono text-xs text-muted-foreground">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            className="flex items-center justify-center size-8 -m-1 rounded-md text-muted-foreground transition-colors hover:text-primary active:text-primary"
            aria-label="About these images"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
              setTimeout(() => {
                document
                  .querySelector('[aria-label="Source dedication"]')
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 350);
            }}
          >
            <InfoIcon className="size-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <XIcon className="size-5" />
        </button>
      </div>

      {/* Image */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden"
        style={{ touchAction: "pan-y pinch-zoom", cursor: images.length > 1 ? "grab" : undefined }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(calc(${-index * 100}% + ${dragOffset}px))`,
            transition: settling ? "transform 300ms cubic-bezier(.4,0,.2,1)" : dragging.current ? "none" : undefined,
            willChange: "transform",
          }}
        >
          {images.map((img) => (
            <div key={img.filename} className="flex h-full w-full shrink-0 items-center justify-center p-4">
              <img
                src={platyceriumImageUrl(img.filename)}
                alt={img.alt}
                loading="lazy"
                draggable={false}
                className="max-h-full max-w-full rounded-md object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="px-4 pb-2 text-center text-sm text-muted-foreground">
        {current.alt}
      </p>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 border-t border-border/60 px-4 py-3">
        <button
          type="button"
          onClick={() => goTo(Math.max(index - 1, 0))}
          disabled={index === 0}
          className="flex size-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="size-5" />
        </button>

        <div className="flex gap-1.5 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.filename}
              type="button"
              onClick={() => goTo(i)}
              aria-label={img.alt}
              className={[
                "size-10 shrink-0 overflow-hidden rounded-md border transition-all",
                i === index
                  ? "border-primary ring-1 ring-primary"
                  : "border-border/60 opacity-60 hover:opacity-100",
              ].join(" ")}
            >
              <img
                src={platyceriumImageUrl(img.filename)}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(Math.min(index + 1, images.length - 1))}
          disabled={index === images.length - 1}
          className="flex size-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors hover:bg-muted disabled:opacity-30"
          aria-label="Next image"
        >
          <ChevronRightIcon className="size-5" />
        </button>
      </div>
    </div>,
    document.body,
  );
}
