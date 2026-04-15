const items = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Design Systems",
  "Accessibility",
  "GraphQL",
  "Node.js",
  "AWS",
  "Figma",
  "Developer Experience",
  "Shopify",
  "Gatsby",
  "GSAP",
];

const SEPARATOR = "✦";

export function Marquee() {
  // Duplicate the items so the CSS loop is seamless
  const doubled = [...items, ...items];

  return (
    <div
      data-animate="marquee"
      className="overflow-hidden border-y border-border/60 py-4"
    >
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          >
            {item}
            <span className="text-foreground/20">{SEPARATOR}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
