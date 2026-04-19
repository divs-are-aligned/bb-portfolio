"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import {
  platyceriums,
  regionLabel,
  type BiogeographicalRegion,
} from "@/data/platycerium";

const WORLD_TOPO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map ISO 3166 numeric country IDs → biogeographical region.
// Region 1: Indochina, Malaysia, New Guinea & Australia-adjacent
// Region 2: Australia
// Region 3: Africa, Madagascar & South America
const COUNTRY_REGION: Record<string, BiogeographicalRegion> = {
  // Region 1 — SE Asia / Oceania
  "764": 1, // Thailand
  "104": 1, // Myanmar
  "356": 1, // India
  "458": 1, // Malaysia
  "360": 1, // Indonesia
  "608": 1, // Philippines
  "598": 1, // Papua New Guinea
  "096": 1, // Brunei
  "702": 1, // Singapore
  "704": 1, // Vietnam
  "418": 1, // Laos
  "116": 1, // Cambodia
  "158": 1, // Taiwan
  "156": 1, // China (Yunnan)

  // Region 2 — Australia
  "036": 2, // Australia

  // Region 3 — Africa + Madagascar + South America
  "024": 3, "012": 3, "204": 3, "072": 3, "854": 3, "108": 3, // Various Africa
  "120": 3, "140": 3, "148": 3, "174": 3, "178": 3, "180": 3,
  "384": 3, "262": 3, "818": 3, "226": 3, "232": 3, "231": 3,
  "266": 3, "270": 3, "288": 3, "324": 3, "624": 3, "404": 3,
  "426": 3, "430": 3, "434": 3, "450": 3, // Madagascar
  "454": 3, "466": 3, "478": 3, "504": 3, "508": 3,
  "516": 3, "562": 3, "566": 3, "646": 3, "686": 3,
  "694": 3, "706": 3, "710": 3, "728": 3, "729": 3,
  "748": 3, "800": 3, "834": 3, "768": 3, "788": 3,
  "894": 3, "716": 3,
  // South America
  "032": 3, "068": 3, "076": 3, "152": 3, "170": 3, "218": 3,
  "254": 3, "328": 3, "600": 3, "604": 3, "740": 3, "858": 3, "862": 3,
};

const REGION_COLORS: Record<BiogeographicalRegion, string> = {
  1: "#4f90ff",
  2: "#3ecda0",
  3: "#e8553b",
};

function speciesForRegion(r: BiogeographicalRegion) {
  return platyceriums.filter((p) => p.biogeographicalRegion === r);
}

export function PlatyceriumMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hovered, setHovered] = useState<BiogeographicalRegion | null>(null);
  const [selected, setSelected] = useState<BiogeographicalRegion | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 960;
    const height = 480;

    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const projection = d3
      .geoNaturalEarth1()
      .scale(160)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    d3.json<Topology>(WORLD_TOPO_URL).then((topo) => {
      if (!topo) return;
      const countries = topojson.feature(
        topo,
        topo.objects.countries as GeometryCollection,
      );

      svg
        .append("g")
        .selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("d", path as never)
        .attr("fill", (d) => {
          const id = d.id as string;
          const region = COUNTRY_REGION[id];
          if (!region) return "rgba(128,128,128,0.08)";
          return `${REGION_COLORS[region]}33`;
        })
        .attr("stroke", (d) => {
          const id = d.id as string;
          const region = COUNTRY_REGION[id];
          if (!region) return "rgba(128,128,128,0.2)";
          return REGION_COLORS[region];
        })
        .attr("stroke-width", (d) => {
          const id = d.id as string;
          return COUNTRY_REGION[id] ? 0.8 : 0.3;
        })
        .attr("data-region", (d) => COUNTRY_REGION[d.id as string] ?? "")
        .style("cursor", (d) => (COUNTRY_REGION[d.id as string] ? "pointer" : "default"))
        .on("pointerenter", function (_, d) {
          const region = COUNTRY_REGION[d.id as string];
          if (!region) return;
          setHovered(region);
        })
        .on("pointerleave", function () {
          setHovered(null);
        })
        .on("click", function (_, d) {
          const region = COUNTRY_REGION[d.id as string];
          if (!region) return;
          setSelected((prev) => (prev === region ? null : region));
        });
    });
  }, []);

  // Highlight the active region (hovered takes priority, then selected).
  const activeRegion = hovered ?? selected;
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("path[data-region]").each(function () {
      const el = d3.select(this);
      const r = el.attr("data-region");
      if (!r) {
        el.transition().duration(150).attr("opacity", activeRegion ? 0.15 : 1)
          .attr("fill", "rgba(128,128,128,0.08)");
        return;
      }
      const rNum = Number(r) as BiogeographicalRegion;
      const isActive = activeRegion === rNum;
      el.transition()
        .duration(150)
        .attr("opacity", activeRegion && !isActive ? 0.25 : 1)
        .attr("fill", isActive ? `${REGION_COLORS[rNum]}55` : `${REGION_COLORS[rNum]}33`)
        .attr("stroke-width", isActive ? 1.2 : 0.8);
    });
  }, [activeRegion]);

  const scrollToCard = (slug: string) => {
    const el = document.getElementById(`platycerium-${slug}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-background",
    );
    setTimeout(() => {
      el.classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-background",
      );
    }, 1800);
  };

  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-sm">
      <h3 className="mb-3 font-heading text-lg font-medium">
        Biogeographical regions
      </h3>
      <p className="mb-4 text-xs text-muted-foreground">
        Per Kreier &amp; Schneider, American Journal of Botany 2006. Hover a
        highlighted region to see its native species.
      </p>

      <svg
        ref={svgRef}
        className="w-full"
        aria-label="World map showing Platycerium biogeographical regions"
      />

      {selected && (
        <div className="mt-4 rounded-lg border border-border/60 bg-card/40 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                Region {selected}
              </p>
              <p className="text-sm font-medium text-foreground">
                {regionLabel[selected]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Close
            </button>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {speciesForRegion(selected).map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => scrollToCard(s.slug)}
                className="text-sm italic text-primary underline-offset-4 hover:underline"
              >
                {s.scientificName}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs">
        {([1, 2, 3] as BiogeographicalRegion[]).map((r) => (
          <div
            key={r}
            className={[
              "flex items-center gap-2 transition-opacity",
              hovered && hovered !== r ? "opacity-30" : "opacity-100",
            ].join(" ")}
          >
            <span
              className="inline-block size-3 rounded-sm border"
              style={{
                backgroundColor: `${REGION_COLORS[r]}33`,
                borderColor: REGION_COLORS[r],
              }}
            />
            <span className="text-muted-foreground">
              R{r}: {regionLabel[r]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
