/**
 * Propagation guide for Platycerium — tissue culture, pups, and spore culture.
 *
 * Content synthesized from Roy Vail's "Platycerium Hobbyist's Handbook"
 * (1984, Desert Biological Publications), supplemented with modern
 * horticultural practice.
 */

export type PropagationSection = {
  id: string;
  title: string;
  overview: string;
  subsections: {
    heading: string;
    body: string;
    tips?: string[];
  }[];
};

export const propagationSections: PropagationSection[] = [
  /* ── A. Tissue Culture ──────────────────────────────────── */
  {
    id: "tissue-culture",
    title: "Tissue Culture",
    overview:
      "Tissue culture works because every living cell of the plant carries a complete set of genes. Under laboratory conditions, a small group of cells (an explant) can be grown into a callus, which can then be induced to form buds — each genetically identical to the parent. The process does not take less time than other methods, but once established, large quantities of identical plants can be produced in a small lab.",
    subsections: [
      {
        heading: "How it works",
        body: "An explant is removed from the parent plant, surface sterilized, and placed on a nutrient medium where it grows into a callus (a lump of undifferentiated cells). The callus can be maintained indefinitely or induced to form buds, which are grown in the lab and then transferred to soil. For pup-forming Platycerium, the process was simplified dramatically when it was discovered that blending lab-grown plantlets for five seconds produced many fragments that each grew into new plants.",
      },
      {
        heading: "What gets tissue cultured",
        body: "P. bifurcatum cv. Netherlands, P. veitchii cv. Lemoinei, P. hillii cv. Pumila, and P. superbum are the main subjects. Only a few labs, mostly in California, tissue-culture Platycerium because the genus is a minor part of the nursery trade.",
      },
      {
        heading: "The debate",
        body: "Some dealers contend that tissue-cultured plants are so conditioned to the sterile lab that they don't last long outside it, and that the chemical environment tends to cause abnormal growth later. Others argue they grow normally, have the same disease resistance as non-lab plants, and are the only way to make Platycerium affordable enough to sell at scale. The final word is not in.",
      },
    ],
  },

  /* ── B. Pups ────────────────────────────────────────────── */
  {
    id: "pups",
    title: "Pup Propagation",
    overview:
      "All pup-forming species (except P. coronarium) form pups from the tips of roots that reach a moist surface. Pups first appear as tiny buds. P. coronarium is unique — its rhizome branches horizontally behind the shields and emerges to the side.",
    subsections: [
      {
        heading: "When to remove pups",
        body: "The most common mistake is removing pups when they are too small. Wait until the pup's shield fronds are at least one-quarter the size of the parent's. Use a sharp knife, cut back into the moss, and take the pup with a good start of roots. Fill the hole with fresh moss so the parent's next shields can cover it.",
        tips: [
          "It is almost always necessary to cut the parent's shield when removing a pup. There are fewer chances for infection if the shields are brown and dead. If green shields must be cut, spray fungicide on the cut edge and let it dry quickly.",
          "If there are several very small pups, mounting them all on the same plaque makes moisture control easier.",
          "A Superthrive or Vitamin B1 treatment helps newly separated pups form roots.",
          "Not every pup is worth saving. Some buds may need to be removed so others can develop normally.",
        ],
      },
      {
        heading: "Encouraging pup formation",
        body: "Pups will not form where the moss is dry. The amount of available moss has a direct effect on pup formation — a plaque with extra moss allows pups to form around the edge, while a thin basket only 2-3 inches wide pushes pups out the back quickly.",
        tips: [
          "To encourage pups, poke holes through the shields with a screwdriver all the way to the mounting, creating pathways for roots to reach the surface.",
          "On a board, if the moss on each side is not kept moist, pups tend to emerge only from the top and bottom where moisture collects.",
        ],
      },
      {
        heading: "Difficult species for pup removal",
        body: "P. elephantotis pups are the hardest to remove successfully. Let them become fairly mature before cutting, and treat the cut edges of the parent's shields with terramycin to fight rot.",
      },
    ],
  },

  /* ── C. Spore Culture ───────────────────────────────────── */
  {
    id: "spore-culture",
    title: "Spore Culture",
    overview:
      "It typically takes five to ten years from sowing spores to collecting spores from the resulting plants. Although this is a long time, spore culture is the only way to propagate solitary species and is the path to developing truly new cultivars through selective breeding over generations.",
    subsections: [
      {
        heading: "Environment",
        body: "Light: at least 100 foot-candles (two 48-inch fluorescent tubes at 12 inches), though less works for some growers. No dark period is needed. Medium: equal parts milled peat and perlite, or milled sphagnum and perlite. Jiffy-7 peat pellets also work well. Humidity: as high as possible — use a covered flat, deep petri dish, plastic shoe box, or similar moist chamber. Temperature: the same range as for mature plants, with less fluctuation.",
        tips: [
          "Sterilize the medium — pressure cooker at 20 psi for 20 minutes, dry heat at 300F for 20 minutes, or microwave. Surfaces should be sterilized with 10% bleach and rinsed with boiled water.",
          "Peat mixtures tend not to support fungus growth and may not need sterilization, but sterilization is safest.",
        ],
      },
      {
        heading: "Stage 1 — Getting spores",
        body: "Sporangia form inside large spore patches on the fertile fronds. When mature, they push through a layer of stellate hairs and turn brown (except P. wallichii, where they stay green). Use 10-20x magnification to check maturity. Collect by letting a cut portion of the frond dry in an envelope, or lay the spore patch face-down on white paper where spores appear as brown dust.",
        tips: [
          "Separate spores from sporangia by gently moving the mass around on paper, or strain through nylon stocking material.",
          "Spores can be sterilized with 10% bleach, separated on a coffee filter, and rinsed with boiled distilled water before sowing.",
          "P. wallichii has green spores that do not live long — sow as soon as possible after collection.",
          "Most people sow spores in the fall, the season most are available.",
          "Label every culture with species name and date.",
        ],
      },
      {
        heading: "Stage 2 — Green mat",
        body: "Each spore produces a short green filament that forms a green mat. Some growers transplant sections of the mat to help it spread. Usually the green mat forms quickly — in some species it is not a distinct stage.",
      },
      {
        heading: "Stage 3 — Prothallium (gametophyte)",
        body: "From each green filament, a flat, green, heart-shaped prothallium about 1/4 inch tall may grow. It has half the gene count of the parent plant. Its function is sexual reproduction — the sperm must swim to the egg, which means tiny droplets of water must be present on the surface. Prothallia usually appear three weeks to three months after sowing.",
        tips: [
          "Most growers transplant prothallia with space between them — they grow faster with room, and more green mat develops where they were removed.",
          "If prothallia remain in this stage too long (the record is six years), misting may help — the sperm may not have the water they need to swim to the egg.",
          "Vitamin B1 (one 50mg tablet per quart of water) misted onto prothallia may help trigger the transition to sporophyte.",
        ],
      },
      {
        heading: "Stage 4 — Sporophyte",
        body: "The young staghorn (sporophyte) develops from the fertilized egg. The first fronds may look nothing like the mature plant. Most growers transplant sporophytes as soon as they appear among the prothallia. As sporophytes are removed, more form — a crop of prothallia may produce sporophytes for two to three years.",
        tips: [
          "Young sporophytes in the moist chamber may pup very freely. P. ellisii even forms pups from the edges of its shield fronds at this stage.",
          "Spores are often sown too densely. Stretch nylon pantyhose over a small jar of spores and shake them onto the medium for more even distribution.",
        ],
      },
      {
        heading: "Stage 5 — Hardening",
        body: "The most difficult period in spore culture. The protective covering of the moist chamber is gradually removed over weeks — not hours or days. Very young Platycerium are often transferred to pots until large enough for their permanent mounting.",
      },
      {
        heading: "Common problems",
        body: "Algae and fungus growth: sterilize the medium at the start. Excess light promotes algae; darkness favors fungus. Banrot or other fungicides can be misted. Fungus gnats are the worst insect pest — their larvae can destroy prothallia. Diazinon (free of petroleum distillates) controls them. The most common growth problem is staying in the prothallium stage too long, usually because the sperm lack the water they need.",
      },
      {
        heading: "Species notes",
        body: "Some species can only be propagated from spore: P. grande, P. holttumii, P. wallichii, P. ridleyi, P. superbum, and P. wandae. Having spore-grown specimens of these makes trading very easy. Spore culture of P. superbum is routine and often the first sporelings a hobbyist raises. P. madagascariense spore culture is not unusually difficult — sporophytes are allowed to reach about 1 inch before transplanting. P. ridleyi sporeling growth rate varies dramatically depending on light and fertilizer levels.",
      },
    ],
  },
];
