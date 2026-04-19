"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { phylogeny, type PhyloNode } from "@/data/platyceriumPhylogeny";
import { platyceriums } from "@/data/platycerium";

const knownSlugs = new Set(platyceriums.map((p) => p.slug));

type TreeDatum = {
  name: string;
  slug?: string;
  children?: TreeDatum[];
};

function phyloToTree(node: PhyloNode): TreeDatum {
  if (node.kind === "leaf") {
    return { name: node.label, slug: node.slug };
  }
  return {
    name: node.label ?? "",
    children: node.children.map(phyloToTree),
  };
}

function scrollToCard(slug: string) {
  const el = document.getElementById(`platycerium-${slug}`);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-background");
  setTimeout(() => {
    el.classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-background");
  }, 1800);
}

export function PlatyceriumTree() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svgEl = svgRef.current;
    if (!container || !svgEl) return;

    const data = phyloToTree(phylogeny);
    const root = d3.hierarchy(data);
    const leafCount = root.leaves().length;

    const nodeHeight = 28;
    const treeHeight = leafCount * nodeHeight;
    const treeWidth = 520;
    const margin = { top: 20, right: 180, bottom: 20, left: 40 };
    const fullWidth = treeWidth + margin.left + margin.right;
    const fullHeight = treeHeight + margin.top + margin.bottom;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${fullWidth} ${fullHeight}`);

    // Zoom/pan layer
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(margin.left, margin.top),
    );

    // Layout
    const treeLayout = d3.tree<TreeDatum>().size([treeHeight, treeWidth]);
    treeLayout(root);

    // Compute CSS colors from the document
    const styles = getComputedStyle(document.documentElement);
    const colorMuted = styles.getPropertyValue("--muted-foreground").trim() || "#7ABFA6";
    const colorPrimary = styles.getPropertyValue("--primary").trim() || "#3ECDA0";
    const colorFg = styles.getPropertyValue("--foreground").trim() || "#D4F5E9";
    const colorBorder = styles.getPropertyValue("--border").trim() || "rgba(62,205,160,0.12)";

    // Links (curved)
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", colorBorder)
      .attr("stroke-width", 1.2)
      .attr(
        "d",
        d3
          .linkHorizontal<d3.HierarchyLink<TreeDatum>, d3.HierarchyPointNode<TreeDatum>>()
          .x((d) => d.y!)
          .y((d) => d.x!) as never,
      );

    // Nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    // Circles at each node
    node
      .append("circle")
      .attr("r", (d) => (d.children ? 2.5 : 4))
      .attr("fill", (d) => {
        if (d.children) return colorBorder;
        const slug = d.data.slug;
        return slug && knownSlugs.has(slug) ? colorPrimary : colorMuted;
      })
      .attr("stroke", "none");

    // Labels for internal (clade) nodes
    node
      .filter((d) => !!d.children && !!d.data.name)
      .append("text")
      .attr("dy", -10)
      .attr("x", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .attr("font-family", "var(--font-jetbrains), monospace")
      .attr("letter-spacing", "0.08em")
      .attr("text-transform", "uppercase" as never)
      .attr("fill", colorMuted)
      .text((d) => d.data.name);

    // Labels for leaf nodes
    const leaves = node.filter((d) => !d.children);

    leaves
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", 10)
      .attr("text-anchor", "start")
      .attr("font-size", "12px")
      .attr("font-family", "var(--font-dm-sans), sans-serif")
      .attr("font-style", "italic")
      .attr("fill", (d) => {
        const slug = d.data.slug;
        return slug && knownSlugs.has(slug) ? colorFg : colorMuted;
      })
      .attr("cursor", (d) => {
        const slug = d.data.slug;
        return slug && knownSlugs.has(slug) ? "pointer" : "default";
      })
      .text((d) => d.data.name)
      .on("click", (_, d) => {
        if (d.data.slug && knownSlugs.has(d.data.slug)) {
          scrollToCard(d.data.slug);
        }
      })
      .on("pointerenter", function (_, d) {
        if (d.data.slug && knownSlugs.has(d.data.slug)) {
          d3.select(this).attr("fill", colorPrimary);
        }
      })
      .on("pointerleave", function (_, d) {
        const slug = d.data.slug;
        d3.select(this).attr(
          "fill",
          slug && knownSlugs.has(slug) ? colorFg : colorMuted,
        );
      });

    // Hover: enlarge leaf circle
    leaves
      .on("pointerenter", function () {
        d3.select(this).select("circle").transition().duration(100).attr("r", 6);
      })
      .on("pointerleave", function () {
        d3.select(this).select("circle").transition().duration(100).attr("r", 4);
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-sm"
    >
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-lg font-medium">Phylogeny</h3>
        <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          Pinch to zoom · click a species to jump
        </p>
      </div>
      <div className="overflow-hidden rounded-md" style={{ touchAction: "none" }}>
        <svg ref={svgRef} className="w-full" />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Grouping based on DNA testing. Source: American Journal of Botany,
        February 2006.
      </p>
    </div>
  );
}
