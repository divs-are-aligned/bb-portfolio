export type GlossaryEntry = {
  term: string;
  definition: string;
  /** Alternative forms that should also trigger a match (lowercase) */
  aliases?: string[];
};

export const glossary: GlossaryEntry[] = [
  {
    term: "Bud",
    definition:
      "The growing point (apical meristem) at the center of the plant from which all new growth starts. If the bud dies, the plant dies — though it may take weeks for the rest to turn brown.",
  },
  {
    term: "Callus",
    definition:
      "An undifferentiated mass of cells grown from a tissue explant in laboratory culture. Can be maintained indefinitely or induced to form new buds for propagation.",
  },
  {
    term: "Cultivar",
    definition:
      "A plant variety selected and maintained through cultivation. Written in single quotes after the species name, e.g., Platycerium bifurcatum 'Netherlands'. Cultivars are propagated via pups to preserve their specific gene combination — spore propagation shuffles genes through meiosis.",
    aliases: ["cultivars"],
  },
  {
    term: "Epiphyte",
    definition:
      "A plant that grows upon another plant for physical support, but makes its own food. Not parasitic. Most platyceriums, bromeliads, and orchids are epiphytes. They must solve three problems: attachment, collecting nutrients, and collecting water.",
    aliases: ["epiphytic", "epiphytes"],
  },
  {
    term: "Explant",
    definition:
      "A small group of cells removed from a parent plant and surface-sterilized for tissue culture. When placed on the proper medium, it can grow into a callus.",
  },
  {
    term: "Fertile frond",
    definition:
      "The frond that grows outward or downward from the bud and produces spore patches on its underside. Not all fertile fronds on young plants form spore patches, but those on mature plants with adequate light should. Also called the antler frond.",
    aliases: ["fertile fronds"],
  },
  {
    term: "Fungicide",
    definition:
      "A chemical agent used to control fungal growth. Fungicides generally slow fungal growth rather than kill it, which is why rotating among several types is important. Common ones safe for Platycerium: Benomyl, chlorothalonil, captan, folpet, maneb.",
    aliases: ["fungicides"],
  },
  {
    term: "Gametophyte",
    definition:
      "The small, short-lived phase of the fern life cycle that produces sex cells (gametes). In ferns, this is the prothallium — a flat, heart-shaped structure about 1/4 inch tall with half the gene count of the parent plant.",
  },
  {
    term: "Genus",
    definition:
      "The broader taxonomic group. Platycerium is the genus; species names like bifurcatum follow it. Closely related genera are grouped into families — Platycerium is in Polypodiaceae along with Pyrrosia, its closest relative.",
  },
  {
    term: "Hardening",
    definition:
      "The gradual process of acclimating a young plant (especially a sporeling from a moist chamber) to normal growing conditions. Takes weeks, not days. The most difficult period in spore culture.",
  },
  {
    term: "Hybrid",
    definition:
      "The offspring of a cross between two different species. The only documented Platycerium interspecies cross is P. superbum x P. stemaria by Tom Mentelos (named P. x mentelosii). Many cultivars claimed to be hybrids are unverified.",
    aliases: ["hybrids"],
  },
  {
    term: "Meiosis",
    definition:
      "The type of cell division used in spore formation. Its function is to mix genes — which is why cultivar traits may not persist through spore propagation. Contrast with mitosis, used in pup formation, which duplicates genes exactly.",
  },
  {
    term: "Mitosis",
    definition:
      "The type of cell division used in vegetative growth and pup formation. It only duplicates genes, giving pups the same gene combination as the parent plant. This is why pups are genetically identical to the parent.",
  },
  {
    term: "Osmunda fiber",
    definition:
      "A rooting medium made from the fibrous roots of Osmunda ferns. Lasts longer and drains faster than sphagnum moss. Useful in high-rainfall climates where excess moisture is a persistent problem. Often mixed with sphagnum rather than used alone.",
    aliases: ["osmunda"],
  },
  {
    term: "Platycerium",
    definition:
      "A genus of roughly 18 species of epiphytic ferns in the family Polypodiaceae, commonly known as staghorn or elkhorn ferns. Native to tropical and subtropical regions of Africa, Asia, Australia, and South America. Currently 18 recognized species in three natural groups: Java-Australian, Malayan-Asiatic, and Afro-American.",
  },
  {
    term: "Prothallium",
    definition:
      "A flat, green, heart-shaped structure about 1/4 inch tall that develops from a germinated spore. It has half the gene count of the parent plant and its function is sexual reproduction — fern sperm must swim through water droplets to reach the egg. Also called prothallus. Plural: prothallia.",
    aliases: ["prothallus", "prothallia", "prothalli"],
  },
  {
    term: "Pup",
    definition:
      "A vegetative offshoot that forms from root tips reaching a moist surface (except in P. coronarium, which forms pups by rhizome branching). Should have shields at least 1/4 the size of the parent's before removal. Also called a volunteer.",
    aliases: ["pups"],
  },
  {
    term: "Rhizome",
    definition:
      "A type of stem that grows behind the bud, hidden among the shield fronds. As the bud produces new growth it moves forward and upward, forming the rhizome behind it. Roots branch off the rhizome and grow between old shield fronds. In some species (P. coronarium), the rhizome branches to form pups.",
  },
  {
    term: "Rot",
    definition:
      "Tissue death caused by fungal or bacterial infection. Shield frond tissue turns brown or black, often with a semi-transparent look. Test by marking the edge of dying tissue — if it advances 2mm overnight, it's rot. Fungal rot responds to fungicides; bacterial rot requires antibiotics (terramycin).",
    aliases: ["rots"],
  },
  {
    term: "Shield frond",
    definition:
      "The rounded frond that grows back from the bud and covers the roots. In most species, shield fronds turn brown quickly, becoming a thick mass of water- and food-storage cork with roots between the layers. Also called the basal frond or nest leaf.",
    aliases: ["shield fronds", "shields"],
  },
  {
    term: "Sinus",
    definition:
      "The notch or gap between lobes of a frond. Depth and shape vary by species and are used for identification.",
  },
  {
    term: "Solitary species",
    definition:
      "Platycerium species that reproduce only by spores and grow into single gigantic specimens with only one bud. They solve the three epiphyte problems (attachment, nutrients, water) through large shield fronds that wrap around the tree trunk and collect rainwater. The solitary species are: P. grande, P. holttumii, P. ridleyi, P. superbum, P. wallichii, and P. wandae.",
  },
  {
    term: "Sphagnum moss",
    definition:
      "The standard rooting medium for most platycerium hobbyists and nurseries. Available as regular or green moss from many regions. New moss tends to shed water from a dry surface — submerging the whole mount in a tub ensures thorough wetting. A dark green algae coating indicates overwatering.",
    aliases: ["sphagnum"],
  },
  {
    term: "Sporangia",
    definition:
      "Tiny capsule-like structures on the underside of fertile fronds that produce and release spores. When mature, they push through a layer of stellate hairs and turn brown (except P. wallichii, where they stay green). Singular: sporangium.",
    aliases: ["sporangium"],
  },
  {
    term: "Spore",
    definition:
      "A single-celled reproductive unit produced in the sporangia. Released into the air when the sporangium pops open. Each spore can germinate into a gametophyte (prothallium) under favorable conditions. Most Platycerium spores are brown; P. wallichii spores are green and short-lived.",
    aliases: ["spores"],
  },
  {
    term: "Spore patch",
    definition:
      "The visible area on the underside of a fertile frond where sporangia are concentrated. Shape, size, and position vary by species and are a key identification feature. Also called a sorus (plural: sori).",
    aliases: ["spore patches", "sorus", "sori"],
  },
  {
    term: "Spore pod",
    definition:
      "A spoon-shaped or kidney-shaped lobe on the fertile frond that carries the spore patch on its underside. Found only in P. coronarium and P. ridleyi. The entire spore mass may be released at once rather than as individual spores.",
    aliases: ["spore pods"],
  },
  {
    term: "Sporeling",
    definition:
      "A young sporophyte plant that has emerged from a prothallium after fertilization. The first fronds may look nothing like those of the mature plant.",
    aliases: ["sporelings"],
  },
  {
    term: "Sporophyte",
    definition:
      "The dominant, visible phase of the fern life cycle — the mature plant with roots, rhizome, shield fronds, and fertile fronds that produces spores. Develops from a fertilized egg in the prothallium.",
  },
  {
    term: "Sport",
    definition:
      "A plant or branch showing a spontaneous genetic mutation, resulting in different foliage shape, color, or growth pattern from the parent. Can sometimes be propagated as a new cultivar.",
    aliases: ["sports"],
  },
  {
    term: "Spreader-sticker",
    definition:
      "An additive mixed into spray solutions to help the liquid adhere to frond surfaces rather than beading off. Physal 20 (a commercial sanitizer) also acts as spreader-sticker and helps control algae and fungi. A few drops of mild dish detergent works as a substitute.",
  },
  {
    term: "Stellate hairs",
    definition:
      "Star-shaped hairs (trichomes) found on the surface of Platycerium fronds, bud scales, and spore patches. They form a layer through which mature sporangia push when releasing spores. Their shape, thickness, and color vary by species and are sometimes used for identification.",
    aliases: ["stellate hair"],
  },
  {
    term: "Terramycin",
    definition:
      "A broad-spectrum antibiotic (oxytetracycline) available in soluble form from feed stores. Used at one teaspoon per gallon with spreader-sticker to treat bacterial rot that does not respond to fungicides. Applied by spraying and by making small pinholes in dying tissue to allow penetration.",
  },
  {
    term: "Tissue culture",
    definition:
      "Laboratory propagation of plants from small cell groups (explants). The explant grows into a callus, which is induced to form buds that develop into plantlets. For pup-forming Platycerium, blending lab-grown plantlets for five seconds produces fragments that each grow into new plants, greatly reducing labor costs.",
  },
  {
    term: "Trichome",
    definition:
      "A hair-like outgrowth from the surface of a frond. In Platycerium, trichomes are typically stellate (star-shaped) and serve multiple functions: protecting the surface from intense light, reducing water loss, and in some species contributing to the silvery or white appearance of the fronds (as in P. veitchii). A covering of trichomes allows a species to tolerate higher light conditions than those with naked, dark-green fronds.",
    aliases: ["trichomes"],
  },
  {
    term: "Vascular bundles",
    definition:
      "Clusters of water- and nutrient-conducting tissue visible as white dots at the cut end of a rhizome. Part of the internal plumbing that transports water from roots to fronds.",
  },
  {
    term: "Veins",
    definition:
      "The network of vascular tissue visible within a frond. Veins transport water and nutrients. In some species (P. ridleyi, P. madagascariense), the veins form prominent ridges on the shield fronds.",
  },
  {
    term: "Volunteer",
    definition:
      "A pup or sporeling that appears without deliberate propagation — it simply grew on its own from a root tip reaching a moist surface, or from spores landing on nearby moss.",
    aliases: ["volunteers"],
  },
];
