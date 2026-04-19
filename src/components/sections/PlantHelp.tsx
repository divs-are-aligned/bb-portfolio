"use client";

import { useCallback, useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import {
  SectionWrapper,
  SectionHeading,
} from "@/components/shared/SectionWrapper";

/* ── Filter options ─────────────────────────────────────── */

const WATERING = [
  { value: "daily", label: "Every day" },
  { value: "few-days", label: "Every few days" },
  { value: "weekly", label: "Once a week" },
  { value: "whenever", label: "When I remember" },
  { value: "never", label: "What's watering?" },
] as const;

const SOIL = [
  { value: "soaking", label: "Soaking wet" },
  { value: "moist", label: "Moist" },
  { value: "dry", label: "Dry" },
  { value: "bone-dry", label: "Bone dry & crusty" },
] as const;

const LIGHT = [
  { value: "full-sun", label: "Full sun" },
  { value: "bright-indirect", label: "Bright indirect" },
  { value: "low-light", label: "Low light" },
  { value: "dungeon", label: "Windowless dungeon" },
] as const;

const PESTS = [
  { value: "none", label: "No bugs" },
  { value: "suspicious", label: "Suspicious dots" },
  { value: "infestation", label: "Full infestation" },
  { value: "refuse", label: "I refuse to look" },
] as const;

type FormState = {
  name: string;
  email: string;
  watering: string;
  soil: string;
  light: string;
  pests: string;
  notes: string;
  images: File[];
  panicMode: boolean;
};

const emptyForm = (): FormState => ({
  name: "",
  email: "",
  watering: "",
  soil: "",
  light: "",
  pests: "",
  notes: "",
  images: [],
  panicMode: false,
});

export function PlantHelp() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  /* ── Image handling ──────────────────────────────────── */

  const addImages = useCallback((files: FileList | File[]) => {
    const newFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/"),
    );
    if (newFiles.length === 0) return;

    setForm((f) => ({
      ...f,
      images: [...f.images, ...newFiles].slice(0, 5),
    }));

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string].slice(0, 5));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = (index: number) => {
    setForm((f) => ({
      ...f,
      images: f.images.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      addImages(e.dataTransfer.files);
    },
    [addImages],
  );

  /* ── Submit ──────────────────────────────────────────── */

  const submitForm = async (formData: FormState) => {
    if (!formData.name.trim() || !formData.email.trim()) return;

    setSending(true);
    setError("");

    try {
      const imageUrls = await Promise.all(
        formData.images.map(async (file) => {
          const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
          const storageRef = ref(
            storage,
            `plant-help/${Date.now()}-${safeName}`,
          );
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        }),
      );

      await addDoc(collection(db, "plant-help"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        watering: formData.watering,
        soil: formData.soil,
        light: formData.light,
        pests: formData.pests,
        notes: formData.notes.trim(),
        images: imageUrls,
        panicMode: formData.panicMode,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Try again?");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    submitForm(form);
  };


  /* ── Success state ───────────────────────────────────── */

  if (submitted) {
    return (
      <SectionWrapper id="plant-help">
        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
          <h2 className="font-heading text-5xl font-medium sm:text-6xl">
            Got it
          </h2>
          <p className="max-w-md text-muted-foreground">
            Thanks for sending this over. I&apos;ll check out your plant
            situation and get back to you soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm());
              setPreviews([]);
              setSubmitted(false);
            }}
            className="mt-4 rounded-full border border-border/60 px-6 py-2 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
          >
            Submit another
          </button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="plant-help">
      <SectionHeading>Plant S.O.S.</SectionHeading>
      <p className="mb-10 max-w-2xl text-muted-foreground">
        Something weird happening with your plant? Snap a photo, answer a few
        quick questions, and I&apos;ll take a look. No judgment — we&apos;ve all
        been there.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ── Image upload ─────────────────────────────────── */}
        <div>
          <Label>Photos</Label>
          <p className="mb-3 text-xs text-muted-foreground">
            Up to 5 images. Show me the damage.
          </p>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={[
              "flex min-h-36 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
              dragActive
                ? "border-primary bg-primary/5 text-primary"
                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
            ].join(" ")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className="text-sm">
              Drag & drop or <span className="underline">browse</span>
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && addImages(e.target.files)}
          />

          {previews.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={i} className="group relative">
                  <img
                    src={src}
                    alt={`Upload preview ${i + 1}`}
                    className="h-20 w-20 rounded-lg border border-border/60 object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label={`Remove image ${i + 1}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Diagnostic filters ───────────────────────────── */}
        <div className="rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
          <h3 className="mb-5 font-heading text-lg font-medium">
            Quick diagnostics
          </h3>

          <FilterGroup label="Watering">
            {WATERING.map((opt) => (
              <Pill
                key={opt.value}
                active={form.watering === opt.value}
                onClick={() => set("watering", opt.value)}
              >
                {opt.label}
              </Pill>
            ))}
          </FilterGroup>

          <FilterGroup label="Soil">
            {SOIL.map((opt) => (
              <Pill
                key={opt.value}
                active={form.soil === opt.value}
                onClick={() => set("soil", opt.value)}
              >
                {opt.label}
              </Pill>
            ))}
          </FilterGroup>

          <FilterGroup label="Light">
            {LIGHT.map((opt) => (
              <Pill
                key={opt.value}
                active={form.light === opt.value}
                onClick={() => set("light", opt.value)}
              >
                {opt.label}
              </Pill>
            ))}
          </FilterGroup>

          <FilterGroup label="Pests">
            {PESTS.map((opt) => (
              <Pill
                key={opt.value}
                active={form.pests === opt.value}
                onClick={() => set("pests", opt.value)}
              >
                {opt.label}
              </Pill>
            ))}
          </FilterGroup>
        </div>

        {/* ── Contact info ─────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Your name</Label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Who are you?"
              className="mt-1.5 w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="So I can reply"
              className="mt-1.5 w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* ── Notes ────────────────────────────────────────── */}
        <div>
          <Label htmlFor="notes">Anything else?</Label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Yellowing leaves? Mushy stems? Existential dread?"
            rows={4}
            className="mt-1.5 w-full resize-none rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* ── Error ─────────────────────────────────────────── */}
        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {/* ── Actions ──────────────────────────────────────── */}
        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {sending ? "Sending\u2026" : "Submit"}
        </button>
      </form>

      {/* ── House visits ──────────────────────────────────── */}
      <div className="mt-16 rounded-lg border border-border/60 bg-card/40 p-6 text-center backdrop-blur-sm">
        <h3 className="mb-2 font-heading text-xl font-medium">
          Seattle area? I do house visits.
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          If you&apos;re local and want hands-on help with your plants, hit me
          up and I&apos;ll come take a look in person.
        </p>
        <a
          href="https://instagram.com/bartbudak"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          @bartbudak on Instagram
        </a>
      </div>
    </SectionWrapper>
  );
}

/* ── Shared sub-components (matches PlatyceriumCatalog) ── */

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground"
    >
      {children}
    </label>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 last:mb-0">
      <span className="mr-1 w-24 shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full border px-3 py-1 text-xs transition-colors",
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
