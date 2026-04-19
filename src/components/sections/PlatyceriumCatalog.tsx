"use client";

import { useMemo, useState } from "react";
import {
  platyceriums,
  difficultyLabel,
  regionLabel,
  type CareDifficulty,
  type BiogeographicalRegion,
  type Propagation,
  type SporePattern,
} from "@/data/platycerium";
import { PlatyceriumCard } from "./PlatyceriumCard";

const propagationLabel: Record<Propagation, string> = {
  pups: "Pups",
  spore: "Spore",
  both: "Pups & spore",
};

const sporePatterns: SporePattern[] = [
  "on lobes",
  "on pods",
  "between first & second frond division",
  "on tips",
];

type Filters = {
  q: string;
  difficulties: Set<CareDifficulty>;
  regions: Set<BiogeographicalRegion>;
  propagations: Set<Propagation>;
  sporePatterns: Set<SporePattern>;
  bigFiveOnly: boolean;
  hybridsOnly: boolean;
};

const emptyFilters = (): Filters => ({
  q: "",
  difficulties: new Set(),
  regions: new Set(),
  propagations: new Set(),
  sporePatterns: new Set(),
  bigFiveOnly: false,
  hybridsOnly: false,
});

export function PlatyceriumCatalog() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  const toggle = <T,>(set: Set<T>, value: T) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return platyceriums.filter((p) => {
      if (q) {
        const hay = [
          p.scientificName,
          ...(p.commonNames ?? []),
          p.summary ?? "",
          p.notes ?? "",
          ...p.nativeOrigin,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.difficulties.size && !filters.difficulties.has(p.difficulty))
        return false;
      if (filters.regions.size) {
        if (!p.biogeographicalRegion) return false;
        if (!filters.regions.has(p.biogeographicalRegion)) return false;
      }
      if (
        filters.propagations.size &&
        !filters.propagations.has(p.propagation)
      )
        return false;
      if (filters.sporePatterns.size) {
        if (!p.sporePattern) return false;
        if (!filters.sporePatterns.has(p.sporePattern)) return false;
      }
      if (filters.bigFiveOnly && !p.isBigFive) return false;
      if (filters.hybridsOnly && !p.hasHybrids) return false;
      return true;
    });
  }, [filters]);

  const filteredSpecies = useMemo(
    () => filtered.filter((p) => !p.isHybrid),
    [filtered],
  );
  const filteredHybrids = useMemo(
    () => filtered.filter((p) => p.isHybrid),
    [filtered],
  );

  const activeCount =
    filters.difficulties.size +
    filters.regions.size +
    filters.propagations.size +
    filters.sporePatterns.size +
    (filters.bigFiveOnly ? 1 : 0) +
    (filters.hybridsOnly ? 1 : 0) +
    (filters.q.trim() ? 1 : 0);

  return (
    <>
      <div className="mb-6 rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-heading text-lg font-medium">Filter</h3>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
              {filtered.length} / {platyceriums.length} shown
            </span>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setFilters(emptyFilters())}
                className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
        </div>

        <div className="mb-4">
          <input
            type="search"
            placeholder="Search scientific name, common name, origin, notes…"
            value={filters.q}
            onChange={(e) =>
              setFilters((f) => ({ ...f, q: e.target.value }))
            }
            className="w-full rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <FilterGroup label="Difficulty">
          {([1, 2, 3, 4, 5] as CareDifficulty[]).map((d) => (
            <Pill
              key={d}
              active={filters.difficulties.has(d)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  difficulties: toggle(f.difficulties, d),
                }))
              }
              title={difficultyLabel[d]}
            >
              L{d}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup label="Region">
          {([1, 2, 3] as BiogeographicalRegion[]).map((r) => (
            <Pill
              key={r}
              active={filters.regions.has(r)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  regions: toggle(f.regions, r),
                }))
              }
              title={regionLabel[r]}
            >
              R{r}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup label="Propagation">
          {(["pups", "spore", "both"] as Propagation[]).map((p) => (
            <Pill
              key={p}
              active={filters.propagations.has(p)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  propagations: toggle(f.propagations, p),
                }))
              }
            >
              {propagationLabel[p]}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup label="Spore form">
          {sporePatterns.map((s) => (
            <Pill
              key={s}
              active={filters.sporePatterns.has(s)}
              onClick={() =>
                setFilters((f) => ({
                  ...f,
                  sporePatterns: toggle(f.sporePatterns, s),
                }))
              }
            >
              {s}
            </Pill>
          ))}
        </FilterGroup>

        <FilterGroup label="Other">
          <Pill
            active={filters.bigFiveOnly}
            onClick={() =>
              setFilters((f) => ({ ...f, bigFiveOnly: !f.bigFiveOnly }))
            }
          >
            Big Five
          </Pill>
          <Pill
            active={filters.hybridsOnly}
            onClick={() =>
              setFilters((f) => ({ ...f, hybridsOnly: !f.hybridsOnly }))
            }
          >
            Has hybrids
          </Pill>
        </FilterGroup>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
          No species match the current filters.
        </p>
      ) : (
        <>
          {filteredSpecies.length > 0 && (
            <div className="mb-10">
              <h4 className="mb-4 font-heading text-xl font-medium">
                Species
              </h4>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSpecies.map((p) => (
                  <PlatyceriumCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          )}
          {filteredHybrids.length > 0 && (
            <div>
              <h4 className="mb-4 font-heading text-xl font-medium">
                Hybrids
              </h4>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHybrids.map((p) => (
                  <PlatyceriumCard key={p.slug} p={p} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
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
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
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
