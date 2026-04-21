/**
 * Structured cultivation guide for Platycerium.
 *
 * Content synthesized from Roy Vail's "Platycerium Hobbyist's Handbook"
 * (1984, Desert Biological Publications), the author's own growing
 * experience, and widely-accepted horticultural practice.
 */

export type CultivationSection = {
  id: string;
  title: string;
  subsections: {
    heading: string;
    body: string;
    tips?: string[];
  }[];
};

export const cultivationSections: CultivationSection[] = [
  /* ── I. Rooting Material ────────────────────────────────── */
  {
    id: "rooting-material",
    title: "Rooting Material",
    subsections: [
      {
        heading: "Sphagnum moss",
        body: "The standard medium for most hobbyists and nurseries. Regular or green sphagnum from Wisconsin, Washington, Florida, Oregon, Michigan, or Germany all work. New Zealand long-fiber sphagnum is considered premium. The moss should be packed firmly enough to stay moist but not so tight that it becomes waterlogged.",
        tips: [
          "New moss tends to shed water off a dry surface. Submerge the whole mount in a tub to ensure thorough wetting.",
          "A dark green coating of algae on the moss surface is a sign of chronic overwatering.",
          "Wetting agents like Aqua Gro help water penetrate dry moss.",
        ],
      },
      {
        heading: "Osmunda fiber",
        body: "Lasts longer and drains faster than sphagnum. Useful in high-rainfall climates where excess moisture is a persistent problem. Often mixed with sphagnum rather than used alone.",
      },
      {
        heading: "What to avoid",
        body: "Sphagnum peat holds excessive moisture and can stain shield fronds. Orchid bark is reported to cause root problems. Soil-based mixes are unsuitable for epiphytes.",
      },
    ],
  },

  /* ── II. Mounting ───────────────────────────────────────── */
  {
    id: "mounting",
    title: "Mounting & Attachment",
    subsections: [
      {
        heading: "General considerations",
        body: "Platyceriums are adaptable. Redwood or cypress boards, driftwood, cork plaques, wire baskets, redwood boxes, treefern pots, living trees, and even rocks are all used successfully. The choice depends on the species, the desired appearance, and the local climate.",
        tips: [
          "Redwood and cypress are non-renewable resources. Coated pine is a reasonable alternative.",
          "When a plant outgrows its first board, attach the smaller board to a larger one rather than remounting the plant.",
          "Never cover or damage the bud when wiring or mounting.",
        ],
      },
      {
        heading: "Solitary species",
        body: "P. grande, P. holttumii, P. ridleyi, P. superbum, P. wallichii, and P. wandae do not form pups and grow into single large specimens. Mount on boards, trees, or redwood boxes. Use roofing nails around the edge of a board, then wrap small plastic-coated wire across the shields. New shield fronds will grow over the wires. As the plant gets larger, add more wire.",
        tips: [
          "As a solitary species ages, its rhizome elongates and the bud moves away from the mount. When new shields no longer cover the older ones, cut back the rear portion and remount the front. One P. superbum has survived this treatment at least four times since 1942.",
          "A 'Bill Shortt Box' — a moss-packed redwood box with a water trough in the top and chickenwire across the front — ensures water reaches the roots of large solitary specimens.",
        ],
      },
      {
        heading: "Pup-forming species",
        body: "All other species eventually form pups and clusters. Plan ahead for where pups can emerge. On a board, use an extra-large moss pad so pups can form around the edge. In a basket, pack the moss tightly enough to stay moist — the most common mistake is packing too loosely, causing the expected pups never to form.",
        tips: [
          "Pups form where roots reach a moist surface. If the outside of the moss is always dry, no pups form.",
          "In round baskets, place the parent plant at the open top so pups can form on the sides.",
          "Rectangular wire baskets only 2-3 inches thick force roots to the back quickly, where pups appear.",
          "To encourage pup formation, poke holes through dead shields all the way to the mounting with a screwdriver, giving roots a pathway to the surface.",
        ],
      },
      {
        heading: "P. coronarium — special case",
        body: "This species forms pups differently from all others. The rhizome branches horizontally behind the shields, grows to the side, and emerges as a new bud. Plan mounting so the bud sits below the bottom edge of the board, or mount in a ball, to prevent the rhizome branch from hitting a solid surface.",
      },
    ],
  },

  /* ── III. Pest Control ──────────────────────────────────── */
  {
    id: "pests",
    title: "Pest Control",
    subsections: [
      {
        heading: "Prevention over treatment",
        body: "Control means preventing insects from getting started, not waiting to battle outbreaks. One sowbug can destroy fronds that took a year to grow. Spray plants completely on a regular schedule, rotating among three different insecticides to prevent resistance buildup.",
        tips: [
          "Spray after watering, not before, to avoid insecticide soaking into the roots.",
          "If an insect keeps reappearing, it may be coming from the moss — drench the sphagnum thoroughly.",
          "Use insecticides at half the label strength. Ferns are chemical-sensitive. Only plants in very high light where growth is hard and tough should receive 3/4 strength.",
          "Test new sprays on a sacrificial P. stemaria pup before treating your collection.",
        ],
      },
      {
        heading: "Common pests",
        body: "Sowbugs hide during the day and eat soft growth at night. Scales require Black Leaf 40 — most other insecticides must be used at concentrations that damage ferns to kill scale. Thrips and mites are common but tiny (use a 10x loupe). Snow scale shows as small white tufts and is common in southern states. Mealybug appears as white cottony masses.",
        tips: [
          "Sowbugs: spray thoroughly and drench the moss. Diazinon granules scattered in the moss help.",
          "Scale: Black Leaf 40 is effective without damaging fronds.",
          "Mites: Kelthane is the standard control.",
          "Snow scale: Black Leaf 40, followed by Diazinon, then Malathion, with only two days between sprayings.",
        ],
      },
      {
        heading: "Safe insecticides for Platycerium",
        body: "Malathion, Sevin (Carbaryl), Diazinon, Orthene, Kelthane, insecticidal soap, and Black Leaf 40 are all used on staghorns. Available as powders at feed stores — in powder form they can be placed behind the moss before mounting.",
        tips: [
          "Read ingredients. Petroleum distillates and xylenes are carriers in many products and are very harmful to ferns — avoid them.",
          "Both Kelthane and Malathion can be purchased in solution with inert ingredients only (no petroleum distillates).",
          "Ant-inhabited species (P. coronarium, P. ridleyi, P. madagascariense) attract insects in cultivation. Constant insect control is essential for these.",
        ],
      },
    ],
  },

  /* ── IV. Fungus & Rot ───────────────────────────────────── */
  {
    id: "fungus",
    title: "Fungus & Rot",
    subsections: [
      {
        heading: "Prevention",
        body: "Control of fungi is the most consistent difference between growers who succeed with difficult species and those who do not. Assume any newly received plant — shipped across the country, across an ocean, or freshly cut as a pup — has sustained enough damage for fungus to start. Treat immediately with fungicide. Overwatering is the single most common cause of fungus problems.",
        tips: [
          "Rotate among several fungicide types. Fungicides tend to only slow fungal growth rather than kill it.",
          "Even if fungus is not visible, regular preventative treatments are important.",
        ],
      },
      {
        heading: "Leaf fungus",
        body: "A problem in hot, humid, wet summers. Mainly damages fertile fronds. The advancing edge is often yellowish; the main fungus area is brown or black. Benomyl (Benlate) controls many types. What Benomyl does not control, chlorothalonil (Daconil 2787) generally does.",
        tips: [
          "Air circulation is an enemy of leaf fungus. Placing plants in front of a fan for a couple of days will dry it out.",
        ],
      },
      {
        heading: "Rot — identifying it",
        body: "Rot is most common on shield fronds. The tissue turns brown or black, often with a semi-transparent look before it dies. Normal frond dying can look similar but advances slowly. To test: mark the frond at the edge of the green tissue. If the dying edge has moved 2mm (1/8 inch) or more into the green by the next day, it is rot — treat as an emergency.",
      },
      {
        heading: "Rot — treating it",
        body: "There are at least two types: fungal rot and bacterial rot. There is no way to tell them apart visually — only by response to treatment.",
        tips: [
          "Try a fungicide first (Benomyl, ethazol, chlorothalonil, or captan). Use spreader-sticker. Poke small pinholes into the tissue that is no longer green but not yet dry, so the fungicide can reach inside.",
          "If fungicide does not stop the advance, assume bacterial rot. Terramycin (a broad-spectrum antibiotic, available in soluble form from feed stores) at one teaspoon per gallon with spreader-sticker gives good results.",
          "If neither fungicide nor antibiotic stops the rot, it must be trimmed out. Use a razor blade and cut through green tissue ahead of the rot. Treat the cut edge with fungicide and let it dry quickly.",
        ],
      },
      {
        heading: "Normal frond dying — not rot",
        body: "In late summer through fall, several species normally allow their shield fronds to die and turn brown. P. stemaria kills its shields rapidly; P. elephantotis may look terrible during this period. Normal dying starts near the bud and moves outward. Rots usually start at the edge and move toward the bud, or spread from a point of injury. When uncertain, treat normal dying as if it were rot — it does no harm and the dying continues slowly regardless.",
      },
    ],
  },

  /* ── V. Fertilizer ──────────────────────────────────────── */
  {
    id: "fertilizer",
    title: "Fertilizer",
    subsections: [
      {
        heading: "Standard practice",
        body: "Peter's 20-20-20 at half strength during spring, summer, and fall; quarter strength in winter. Spraying fertilizer along with pesticides saves time and gives the fronds nutrients directly. Pour some fertilizer solution through the sphagnum moss as well.",
        tips: [
          "Too much fertilizer makes fertile fronds very dark green, thick, and tender. Wide-frond cultivars of P. hillii may show cracks or tears.",
          "Yellowing of fertile fronds indicates iron deficiency (or too much sun). Chelated iron solutions are available.",
          "Trace element compounds are recommended by some experienced growers.",
        ],
      },
    ],
  },

  /* ── VI. Water ──────────────────────────────────────────── */
  {
    id: "water",
    title: "Water Quality & Amount",
    subsections: [
      {
        heading: "Water quality",
        body: "Hard water leaves deposits on moss, shields, and roots that interfere with root function. Lowering pH to 5.5-6.0 prevents hardness from being retained. Rainwater is ideal. City water pH tends to be constant and rarely needs adjustment.",
        tips: [
          "Test pH with papers that change color — pH 4.5-7.5 range papers are ideal, available at drug stores.",
          "Lower pH with vinegar, acetic acid, or phosphoric acid. Add acid TO water (add the denser to the less dense).",
          "Raise pH with baking soda, though this tends to leave deposits on shields later.",
        ],
      },
      {
        heading: "Water amount",
        body: "Many plants are killed by overwatering. Most species do well on far less water than most growers use, especially in winter. During the growing season, sphagnum should be moist but not wet. During winter, barely moist.",
        tips: [
          "Water from pipes in exposed places can chill roots in winter or scald them in summer.",
          "Submersing the whole mount in a tub ensures all roots are wetted, but may transfer pests between plants.",
          "No plant roots will grow through dry material. If the outside of the moss is always dry, no pups form.",
        ],
      },
    ],
  },

  /* ── VII. Environment ───────────────────────────────────── */
  {
    id: "environment",
    title: "Environment",
    subsections: [
      {
        heading: "Light",
        body: "In low light, many staghorns produce long dark-green fertile fronds referred to as 'soft growth' — their weight alone may cause them to hang down. With more light, the same plants grow shorter, stiffer, upright fronds. The shape and surface of the fertile frond are clues to light requirements.",
        tips: [
          "A covering of hairs protects the surface from intense light and reduces water loss. Species with hairy, narrow fertile fronds (P. veitchii, P. alcicorne) require higher light than those with wide, dark-green, nearly naked fronds (P. stemaria, P. ellisii).",
          "A waxy coating on fertile fronds (P. alcicorne, P. ellisii) prevents water loss under high light.",
          "Light level profoundly affects spore production. If your plant does not form spore patches, increasing the light may start them.",
        ],
      },
      {
        heading: "Temperature",
        body: "Most staghorns do not do well with long periods over 95F. The lowest temperature a staghorn can tolerate depends heavily on the moisture in the plant and the air. It is not known whether cool temperature during dormancy is beneficial.",
      },
      {
        heading: "Air circulation",
        body: "Staghorns generally benefit from good air circulation. With difficult species like P. ridleyi and P. madagascariense, air circulation could be the difference between success and failure.",
      },
      {
        heading: "Humidity",
        body: "The general rule is over 50%. If this is not achievable, misting helps greatly. Many growers add fertilizer to misting solutions.",
      },
    ],
  },

  /* ── VIII. Chemical Application ─────────────────────────── */
  {
    id: "chemical-application",
    title: "Chemical Application",
    subsections: [
      {
        heading: "Mixing sprays",
        body: "Use sprays as soon as mixed. Mix only what is needed. Measure very carefully — a small measurement error when mixing a half gallon can burn staghorns. Hang a chart with the names and amounts of every spray you use, and keep a calendar record of applications.",
        tips: [
          "Test new sprays on a young P. stemaria first — better to lose it than an entire collection.",
          "It saves time to mix insecticide, fungicide, food, Superthrive, and spreader-sticker as one solution and spray every 10-14 days. Truban fungicide should not be mixed with insecticides.",
        ],
      },
      {
        heading: "Additives",
        body: "Spreader-sticker helps spray stay on the fronds. Physal 20 (a commercial sanitizer) at one teaspoon per gallon acts as both spreader-sticker and helps control algae and fungi. A few drops of mild liquid dish detergent works in a pinch. Superthrive at five drops per gallon promotes root growth — also useful for soaking newly received plants in poor condition.",
      },
    ],
  },
];
