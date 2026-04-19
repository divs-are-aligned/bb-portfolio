"use client";

import { useState } from "react";
import {
  BookOpenIcon,
  ExternalLinkIcon,
  UsersIcon,
  BookMarkedIcon,
  TextIcon,
} from "lucide-react";
import {
  fernSocieties,
  books,
  type FernSociety,
  type Book,
} from "@/data/platyceriumResources";
import { PlatyceriumGlossary } from "./PlatyceriumGlossary";

type Tab = "communities" | "books" | "glossary";

const TABS: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
  {
    id: "communities",
    label: "Communities",
    icon: <UsersIcon className="size-4" />,
    count: fernSocieties.length,
  },
  {
    id: "books",
    label: "Books",
    icon: <BookMarkedIcon className="size-4" />,
    count: books.length,
  },
  {
    id: "glossary",
    label: "Glossary",
    icon: <TextIcon className="size-4" />,
  },
];

export function PlatyceriumResources() {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const withSite = fernSocieties.filter((s) => s.websiteStatus === "working");
  const fbOnly = fernSocieties.filter(
    (s) => s.websiteStatus !== "working" && s.facebookName,
  );
  const noLinks = fernSocieties.filter(
    (s) => s.websiteStatus !== "working" && !s.facebookName,
  );

  const toggle = (tab: Tab) => {
    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <div className="mt-16">
      <h3
        data-animate="section-heading"
        className="mb-6 font-heading text-2xl font-medium"
      >
        Resources
      </h3>

      <div className="flex flex-col gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => toggle(tab.id)}
              aria-expanded={isActive}
              className={[
                "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground",
              ].join(" ")}
            >
              {tab.icon}
              <span className="flex-1">{tab.label}</span>
              {tab.count != null && (
                <span className="font-mono text-xs text-muted-foreground">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "communities" && (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Fern societies around the world. Some maintain active websites;
            others live primarily on Facebook. Links were verified as of April
            2026.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {withSite.map((s) => (
              <SocietyCard key={s.name} society={s} />
            ))}
            {fbOnly.map((s) => (
              <SocietyCard key={s.name} society={s} />
            ))}
            {noLinks.map((s) => (
              <SocietyCard key={s.name} society={s} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "books" && (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((b) => (
              <BookCard key={b.title} book={b} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "glossary" && (
        <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <PlatyceriumGlossary />
        </div>
      )}
    </div>
  );
}

function SocietyCard({ society: s }: { society: FernSociety }) {
  const hasWorkingSite = s.websiteStatus === "working" && s.websiteUrl;
  const facebookUrl = s.facebookName
    ? `https://www.facebook.com/search/pages/?q=${encodeURIComponent(s.facebookName)}`
    : null;
  const primaryUrl = hasWorkingSite ? s.websiteUrl : facebookUrl;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-border/60 bg-card/40 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-foreground">{s.name}</h4>
        {primaryUrl && (
          <a
            href={primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${s.name}`}
            className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
          >
            <ExternalLinkIcon className="size-3.5" />
          </a>
        )}
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
        {s.region}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-1">
        {hasWorkingSite && (
          <a
            href={s.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline-offset-4 hover:underline"
          >
            Website
          </a>
        )}
        {s.websiteStatus === "broken" && (
          <span className="text-xs text-muted-foreground">
            (website offline)
          </span>
        )}
        {facebookUrl && (
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary underline-offset-4 hover:underline"
          >
            Facebook
          </a>
        )}
        {!primaryUrl && (
          <span className="text-xs text-muted-foreground">
            No links available
          </span>
        )}
      </div>
    </div>
  );
}

function BookCard({ book: b }: { book: Book }) {
  return (
    <div
      className={[
        "group flex flex-col gap-2 rounded-lg border bg-card/40 p-4 backdrop-blur-sm transition-colors",
        b.featured
          ? "border-primary/50 ring-1 ring-primary/30"
          : "border-border/60 hover:border-border",
      ].join(" ")}
    >
      <a
        href={b.searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-3"
      >
        <BookOpenIcon
          className={[
            "mt-0.5 size-4 shrink-0 transition-colors group-hover:text-primary",
            b.featured ? "text-primary" : "text-muted-foreground",
          ].join(" ")}
        />
        <div>
          <h4 className="text-sm font-medium text-foreground group-hover:text-primary">
            {b.title}
          </h4>
          {b.author && (
            <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
              {b.author}
            </p>
          )}
        </div>
      </a>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {b.description}
      </p>
      {b.pdfUrl && (
        <a
          href={b.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 w-fit text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          Get free PDF
        </a>
      )}
    </div>
  );
}
