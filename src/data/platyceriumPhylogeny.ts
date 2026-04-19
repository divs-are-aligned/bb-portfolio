// Phylogeny adapted from: American Journal of Botany, February 2006.
// Genus Platycerium, grouped by DNA clade. Leaves reference species slugs
// from `./platycerium.ts`. Internal nodes are informal groupings.

export type PhyloNode =
  | { kind: "leaf"; slug: string; label: string }
  | { kind: "clade"; label?: string; children: PhyloNode[] };

const leaf = (slug: string, label: string): PhyloNode => ({
  kind: "leaf",
  slug,
  label,
});

export const phylogeny: PhyloNode = {
  kind: "clade",
  label: "Platycerium",
  children: [
    {
      kind: "clade",
      label: "Paleotropic clade",
      children: [
        {
          kind: "clade",
          label: "Regal group",
          children: [
            leaf("grande", "P. grande"),
            leaf("holttumii", "P. holttumii"),
            leaf("superbum", "P. superbum"),
            { kind: "leaf", slug: "wandae", label: "P. wandae" },
            { kind: "leaf", slug: "wallichii", label: "P. wallichii" },
          ],
        },
        {
          kind: "clade",
          label: "Twin-spore group",
          children: [
            leaf("coronarium", "P. coronarium"),
            leaf("ridleyi", "P. ridleyi"),
          ],
        },
        {
          kind: "clade",
          label: "Staghorn group",
          children: [
            leaf("veitchii", "P. veitchii"),
            leaf("willinckii", "P. willinckii"),
            leaf("bifurcatum", "P. bifurcatum"),
            leaf("hillii", "P. hillii"),
          ],
        },
      ],
    },
    {
      kind: "clade",
      label: "Afro-American clade",
      children: [
        leaf("ellisii", "P. ellisii"),
        { kind: "leaf", slug: "quadridichotomum", label: "P. quadridichotomum" },
        { kind: "leaf", slug: "madagascariense", label: "P. madagascariense" },
        leaf("alcicorne", "P. alcicorne"),
        leaf("andinum", "P. andinum"),
        leaf("stemaria", "P. stemaria"),
        leaf("elephantotis", "P. elephantotis"),
      ],
    },
  ],
};
