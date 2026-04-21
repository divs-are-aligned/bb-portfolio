/**
 * Care guide data for Platycerium — general care sections + per-species cards.
 *
 * General sections are shown as a universal care reference.
 * Species care cards provide species-specific overrides and notes,
 * synthesized from Roy Vail's "Platycerium Hobbyist's Handbook" (1984),
 * Herb Halling's halling.com, and modern horticultural sources.
 */

export type CareSection = {
  id: string;
  title: string;
  icon: string; // lucide icon name, resolved in the component
  points: string[];
};

export const careSections: CareSection[] = [
  {
    id: "watering",
    title: "Watering",
    icon: "droplets",
    points: [
      "No single schedule — varies by species, climate, mounting, and season. Once a week is a rough baseline.",
      "Drench thoroughly, let it percolate, then dry before the next watering. Most failures are chronic overwatering.",
      "P. coronarium, P. ridleyi, P. superbum, and P. elephantotis are especially prone to overwatering — err dry.",
      "Water more in hot/dry weather, less in cool/cloudy. In winter, most species need very little.",
      "pH 5.5–6.0 is ideal. Hard well water is too alkaline. Rainwater or RO water is best.",
      "Water temperature matters — pipes in exposed places can chill roots in winter or scald them in summer.",
      "Submerging the whole mount in a tub ensures all roots are wetted, but may transfer pests between plants.",
    ],
  },
  {
    id: "grooming",
    title: "Grooming",
    icon: "scissors",
    points: [
      "Trim dead shield fronds that block light, airflow, or watering access.",
      "Remove damaged fertile fronds at the base — new growth fills the gap naturally.",
      "Give emerging fronds room. Don't let dead material crowd new growth.",
      "Prolific puppers (bifurcatum, hillii, veitchii, alcicorne) may need occasional thinning.",
      "For solitary species, when new shields no longer cover old ones, the rhizome has grown too far — cut back and remount.",
      "For P. ellisii, periodically remove and retrim so the bud sits back in the center of the moss.",
    ],
  },
  {
    id: "fertilizing",
    title: "Fertilizing",
    icon: "sprout",
    points: [
      "Peter's 20-20-20 at half strength during spring, summer, and fall. Quarter strength in winter.",
      "Spray fertilizer along with pesticides to save time — the fronds absorb nutrients directly.",
      "Pour some fertilizer solution through the sphagnum moss as well.",
      "Too much fertilizer makes fertile fronds dark green, thick, and tender — wide-frond hillii cultivars may crack.",
      "Yellowing fertile fronds often indicate iron deficiency. Use chelated iron solutions.",
      "Test new fertilizers on a spare pup before treating older plants.",
    ],
  },
  {
    id: "pests",
    title: "Pests",
    icon: "bug",
    points: [
      "Prevention over treatment — spray on a regular schedule, rotating among three insecticides to prevent resistance.",
      "Use insecticides at half label strength. Ferns are chemical-sensitive.",
      "Safe for Platycerium: Malathion, Sevin, Diazinon, Orthene, Kelthane, insecticidal soap, Black Leaf 40.",
      "Avoid petroleum distillates and xylenes — very harmful to ferns. Read ingredient labels.",
      "Sowbugs hide by day and eat soft growth at night. Drench the moss to kill those hiding in it.",
      "Ant-inhabited species (P. coronarium, P. ridleyi, P. madagascariense) attract insects in cultivation — constant control is essential.",
      "If a plant is not doing as well as it should, check for thrips and mites with a 10x loupe.",
    ],
  },
  {
    id: "fungus",
    title: "Fungus & Rot",
    icon: "shield-alert",
    points: [
      "Fungus control is the most consistent difference between growers who succeed with difficult species and those who don't.",
      "Assume any newly received plant has sustained enough damage for fungus to start — treat with fungicide immediately.",
      "Overwatering is the single most common cause of fungus problems.",
      "Leaf fungus: Benomyl or chlorothalonil. Air circulation helps dry it out.",
      "Rot test: mark the edge of dying tissue. If it moves 2mm into the green overnight, it's rot — treat as an emergency.",
      "Fungal rot: try Benomyl, ethazol, chlorothalonil, or captan with spreader-sticker.",
      "If fungicide fails, assume bacterial rot. Terramycin at one teaspoon per gallon with spreader-sticker.",
      "If both fail, cut it out with a razor blade ahead of the rot line. Treat cut edge with fungicide.",
    ],
  },
  {
    id: "environment",
    title: "Environment",
    icon: "sun",
    points: [
      "Bright, filtered light — not direct full sun. 50–73% shade cloth is standard.",
      "Hairy, narrow-frond species (P. veitchii, P. alcicorne) need more light than wide, dark-green species (P. stemaria, P. ellisii).",
      "P. bifurcatum tolerates full sun. P. veitchii requires it for best form.",
      "Humidity above 50% is the baseline. Misting helps; many growers add fertilizer to misting solutions.",
      "Air circulation benefits all species. For P. ridleyi and P. madagascariense it may be the difference between success and failure.",
      "Most staghorns suffer with long periods above 95F. Most can take brief cool spells to 40F.",
      "Mount with airflow behind the root ball. Flat surfaces trap moisture and invite rot.",
    ],
  },
];

/* ── Per-species care cards ──────────────────────────────── */

export type SpeciesCareCard = {
  slug: string; // matches platycerium.ts slug
  wateringSensitivity: "low" | "medium" | "high";
  lightRequirement: "low" | "medium" | "high" | "very high";
  coldTolerance: "tender" | "moderate" | "hardy" | "very hardy";
  growthType: "solitary" | "pup-forming";
  seasonalNotes: string;
  mountingNotes: string;
  propagationNotes: string;
  cultivationTips: string[];
};

export const speciesCareCards: SpeciesCareCard[] = [
  {
    slug: "alcicorne",
    wateringSensitivity: "medium",
    lightRequirement: "high",
    coldTolerance: "hardy",
    growthType: "pup-forming",
    seasonalNotes:
      "Very seasonal. Shields die in late summer and stay brown through fall and winter. Much of winter it is dormant. Decrease water and fertilizer during dormancy.",
    mountingNotes:
      "Standard plaque or basket. The Africa form pups more freely than the Madagascar form.",
    propagationNotes:
      "Pups freely (Africa form especially). Almost never grown from spore.",
    cultivationTips: [
      "The Africa form is less tolerant of excess water than the Madagascar form.",
      "In Miami, P. alcicorne thrives in full sun on treefern poles.",
      "The Madagascar form develops characteristic folds in the upper shields when given enough light.",
      "Slightly more sensitive to cold than P. bifurcatum.",
    ],
  },
  {
    slug: "andinum",
    wateringSensitivity: "medium",
    lightRequirement: "high",
    coldTolerance: "moderate",
    growthType: "pup-forming",
    seasonalNotes:
      "Tends to form shields in early summer and fertile fronds later in the season. Fertile frond tips may continue growing even after the spore patch has formed.",
    mountingNotes:
      "Prefers bright light and rather loose moss, evenly moist but not wet. Rough bark mounting is ideal.",
    propagationNotes:
      "Forms pups, but not freely. Particularly prone to rhizome rot when small — easier to start with a large plant. Spore propagation is among the hardest in the genus.",
    cultivationTips: [
      "Allow to dry out more between waterings, especially if it has a thick mass of shields.",
      "May be more sensitive to high temperatures than most Platycerium — one Florida grower leaves it outside on cool windy nights as a key to success.",
      "Treat like P. elephantotis: bright light, loose moss, evenly moist.",
      "The only Platycerium native to the Americas.",
    ],
  },
  {
    slug: "bifurcatum",
    wateringSensitivity: "low",
    lightRequirement: "medium",
    coldTolerance: "very hardy",
    growthType: "pup-forming",
    seasonalNotes:
      "Shields typically tan to brown in spring and summer. New green shields form during late summer and fall. Fertile fronds remain green and form most of the year, each living two to three years.",
    mountingNotes:
      "Extremely adaptable. Boards, baskets, trees, balls — all work. As the rhizome elongates, the bud moves forward and the plant may come loose. Periodically trim the rear and remount.",
    propagationNotes:
      "Pups prolifically. Eventually forms more plants than anyone needs. The solution is to keep only one or two large specimens and limit pups by removing new buds.",
    cultivationTips: [
      "Can take a light frost, often grown outdoors in south Florida and coastal southern California.",
      "Most common causes of death: overwatering when home, or drying out to root damage on vacation.",
      "Importation of the wild species is rare since cultivars are better adapted to cultivation.",
      "The most tolerant and forgiving Platycerium — what most beginners start with.",
    ],
  },
  {
    slug: "coronarium",
    wateringSensitivity: "high",
    lightRequirement: "low",
    coldTolerance: "tender",
    growthType: "pup-forming",
    seasonalNotes:
      "In nature, light levels tend to be low but some specimens grow in nearly full sun.",
    mountingNotes:
      "Mount in a ball or position the bud below the bottom edge of the board so the horizontal rhizome branch can grow freely. Heavy imported shields (over 1/2 inch thick) hold too much water — let the importer establish the plant first.",
    propagationNotes:
      "Forms pups by rhizome branching (unique method — the rhizome grows horizontally and emerges to the side). Not from root tips like other pup-forming species.",
    cultivationTips: [
      "Moderately difficult mainly because getting it truly established is the challenge.",
      "Once established, it is a tough plant that can live for a long time — but can still be killed by overwatering.",
      "Stands cool temperatures best when dry. Not cold-hardy.",
      "In nature, nearly always ant-inhabited — may actually attract insects.",
    ],
  },
  {
    slug: "elephantotis",
    wateringSensitivity: "medium",
    lightRequirement: "high",
    coldTolerance: "moderate",
    growthType: "pup-forming",
    seasonalNotes:
      "Very seasonal. Each spring, shields from the year before die. Trim dead shield tops so new shields can grow upright. During summer it forms a new shield mass, then fertile fronds.",
    mountingNotes:
      "Standard plaque or basket. Moss need not be particularly loose. Removing pups from this species is particularly difficult — let pups become large before removal.",
    propagationNotes:
      "Pups freely in bright warm conditions. Rarely grown from spore — doing so is reportedly difficult. Under ideal conditions, some sporelings volunteer.",
    cultivationTips: [
      "Wants bright tropical locations with high temperatures and dry periods.",
      "Can wilt dramatically and recover completely — don't panic during dry spells.",
      "If kept wet and under low light, rot sets in quickly. This is the main failure mode.",
      "Cool temperatures cause problems. Keep warm.",
      "Treat cut shield edges with terramycin when removing pups.",
    ],
  },
  {
    slug: "ellisii",
    wateringSensitivity: "medium",
    lightRequirement: "medium",
    coldTolerance: "moderate",
    growthType: "pup-forming",
    seasonalNotes:
      "Grows round shields in spring and early summer, fertile fronds during late summer and fall. Shields begin turning very dark brown near the center in fall, spreading to the edge.",
    mountingNotes:
      "Plaques strongly preferred over baskets due to shallow roots. The rhizome grows upward quickly. When newest shields don't fully cover older ones, remove the plant, trim back, repack moss around the rhizome and into shield gaps. May need trimming annually.",
    propagationNotes:
      "Pups freely in mid-summer when kept in moist, warm, bright conditions with moss packed into shield gaps. Lack of pup formation signals a trim is needed.",
    cultivationTips: [
      "Its shields are thin with large air spaces between them — stores almost no water. Relies on sustained high humidity.",
      "Pack sphagnum moss between the shields and around the rhizome — this is critical for long-term health.",
      "Fertile fronds are wide and need some shading (waxy coating helps retain water but doesn't replace shade).",
      "Not as simple as P. bifurcatum but not difficult — unique and interesting.",
    ],
  },
  {
    slug: "grande",
    wateringSensitivity: "high",
    lightRequirement: "medium",
    coldTolerance: "moderate",
    growthType: "solitary",
    seasonalNotes:
      "Slow-maturing. Some first fertile fronds grow undivided with only one spore patch, causing confusion with P. superbum.",
    mountingNotes:
      "Grown the same as P. superbum but less cold-tolerant and just as prone to rot with excess water.",
    propagationNotes:
      "Spore culture is routine. Nearly all P. grande in collections are collected and imported. Rare in the trade.",
    cultivationTips: [
      "Rare in the trade. Look for labels like 'True P. grande,' 'Philippine P. grande,' or lists that contain both P. grande and P. superbum.",
      "Some dealers don't accept the 1970 separation and sell the Australian plant as P. grande.",
      "A few growers feel P. grande does not grow as large as P. superbum, but given proper care both become giants.",
      "Native habitat is being destroyed by slash-and-burn clearing in the Philippines.",
    ],
  },
  {
    slug: "hillii",
    wateringSensitivity: "low",
    lightRequirement: "medium",
    coldTolerance: "hardy",
    growthType: "pup-forming",
    seasonalNotes:
      "Shield fronds develop seasonally. Fertile frond color shifts with light intensity.",
    mountingNotes:
      "Shield fronds grow flat against the plaque, making watering difficult. Insert a plastic watering tube into the moss early for later effectiveness. Less tendency to grow outward and fall off than P. bifurcatum.",
    propagationNotes:
      "Pups freely. Easy to propagate. Tissue cultured in quantity (especially cv. Pumila).",
    cultivationTips: [
      "Wide fertile fronds sunburn easier than P. bifurcatum — use lower light levels.",
      "Very similar care to P. bifurcatum otherwise.",
      "Natural range is entirely in moist tropical lowland areas but not considered less cold-hardy than P. bifurcatum.",
    ],
  },
  {
    slug: "holttumii",
    wateringSensitivity: "medium",
    lightRequirement: "high",
    coldTolerance: "moderate",
    growthType: "solitary",
    seasonalNotes:
      "From bright locations in monsoon forests — should be given high light and kept more moist during the growing season.",
    mountingNotes:
      "Standard board or box. Nearly all plants in the trade are imported from Thailand — availability depends on when importations are made.",
    propagationNotes:
      "Almost entirely spore-propagated. Occasional rhizome branching has been reported by a few growers but is very rare.",
    cultivationTips: [
      "Be cautious with newly shipped plants — give a preventative terramycin treatment for shipping damage.",
      "Avoid spraying the bud directly with strong insecticides.",
      "Cannot be expected to tolerate the cold temperatures given for P. superbum.",
      "Very difficult to distinguish from P. wandae when small — look for frills on the shields at the bud (P. wandae has them, P. holttumii does not).",
    ],
  },
  {
    slug: "madagascariense",
    wateringSensitivity: "medium",
    lightRequirement: "medium",
    coldTolerance: "moderate",
    growthType: "pup-forming",
    seasonalNotes:
      "Under fluorescent lights, the rhizome may grow 2-3 inches out from the roots before fertile fronds form. In higher light the rhizome is shorter. Often grows two fertile fronds at once.",
    mountingNotes:
      "Mount in loose moss or osmunda fiber to keep roots from being constantly wet. Shields cover the top of the moss and the whole plant becomes ball-shaped over time.",
    propagationNotes:
      "Pups form but removal is often unsuccessful — let pups become quite large before cutting. Spore culture is not unusually difficult. Sporophytes allowed to reach 1 inch before transplanting.",
    cultivationTips: [
      "High humidity (60%+) is essential. Some growers succeed in humidity chambers under fluorescent light.",
      "The longest anyone has kept one alive is about ten years — this may be near its natural lifespan.",
      "Ant-inhabited in nature; attracts other insects in cultivation. Not easily damaged by insecticides, so constant insect control is feasible and essential.",
      "Shield veins form tall ridges surrounding little valleys — the only species with this feature (P. ridleyi is similar but ridges run to the edge without forming valleys).",
    ],
  },
  {
    slug: "quadridichotomum",
    wateringSensitivity: "medium",
    lightRequirement: "high",
    coldTolerance: "moderate",
    growthType: "pup-forming",
    seasonalNotes:
      "Survives extreme dry periods in a dormant state — shields dead, fertile fronds rolled up lengthwise like tubes (hairy undersides facing out, reducing surface area). Whether cultivation requires enforced dormancy is debated.",
    mountingNotes:
      "Marcel Lecoufle reported it does well under the same conditions as Cattleya orchids.",
    propagationNotes:
      "Pups at an early age but not in great numbers. Spore culture is not unusually difficult.",
    cultivationTips: [
      "Probably the rarest and least-understood Platycerium.",
      "Warm temperatures seem best.",
      "Not prone to insects like P. ridleyi and P. madagascariense.",
      "In nature, grows on limestone rocks rather than trees — the only Platycerium on the drier western side of Madagascar.",
      "Shields lack the thick corky tissue of most species — more like P. stemaria.",
    ],
  },
  {
    slug: "ridleyi",
    wateringSensitivity: "high",
    lightRequirement: "high",
    coldTolerance: "tender",
    growthType: "solitary",
    seasonalNotes:
      "The smallest Platycerium that reproduces only by spores. Natural lifespan may be 10-15 years.",
    mountingNotes:
      "In southern California, often kept on its back in treefern or plastic pots. In other areas, plaqued normally. Use loose, open moss. Many growers consider air movement the most important factor.",
    propagationNotes:
      "Spore only — no pups. Spore collection requires catching the spore patch as it is released in one mass. Sporeling growth rates vary dramatically (from fastest in the genus to barely 1.5 inches in five years) depending on light and fertilizer. Vitamin B1 may be important for sporelings that tend to form elongated rhizomes with few roots.",
    cultivationTips: [
      "Air circulation is the key — grows high in the canopy where air movement is best.",
      "Bright light, loose open moss, and protection from cool temperatures.",
      "Definitely attracts insects — slugs and snails are problems. Rhizome rot has claimed many young plants.",
      "Young plants tend to have particularly long rhizomes that break during shipping — this is fatal.",
      "As the plant ages, spaces between shields make the rhizome longer and the danger of breakage increases.",
    ],
  },
  {
    slug: "stemaria",
    wateringSensitivity: "low",
    lightRequirement: "low",
    coldTolerance: "moderate",
    growthType: "pup-forming",
    seasonalNotes:
      "Fertile fronds form year-round. Shields are seasonal — green in late summer, brown in fall. Shields die very quickly (faster than any other Platycerium), which can be mistaken for rot.",
    mountingNotes:
      "Does well in low light and moist conditions. Fills a basket or covers a plaque easily. Wide shields and large fertile fronds are easily damaged by wind — use a protected outdoor location.",
    propagationNotes:
      "Pups fairly easily in the most moist parts of the moss. Almost never grown from spore.",
    cultivationTips: [
      "In low light and moist conditions, produces lush dark green growth and tall shields — spore patches remain tan and may not mature.",
      "In higher light, fertile fronds form more hair on the upper surface and spore patches mature to dark brown.",
      "If accidentally allowed to dry, it wilts tremendously but usually recovers fully.",
      "Tips and edges of fertile fronds burn more easily by insecticides than any other Platycerium — use extra pups for testing sprays.",
      "Some growers feel this species should never have temperatures below 50F.",
    ],
  },
  {
    slug: "superbum",
    wateringSensitivity: "high",
    lightRequirement: "high",
    coldTolerance: "hardy",
    growthType: "solitary",
    seasonalNotes:
      "Young plants form shields only — one growing right, the next left, two to four per year. Each new shield rolls beautifully against the older ones. When shields are about 2 feet tall, the first fertile frond can be expected.",
    mountingNotes:
      "The main requirement is space. Young plants do well on plaques; for large plants, attach smaller boards to larger ones without remounting. Keeping it on a plaque with a small amount of moss makes overwatering difficult. In Australia, vegetable scraps (especially banana peels) placed in the shield basket are beneficial.",
    propagationNotes:
      "Spore only — no pups. Spore culture is routine. Tissue cultured in quantity in California and exported from the Netherlands. Seven to eight years from spore to fertile frond is normal.",
    cultivationTips: [
      "Probably requires less water for its size than any other Platycerium. Truly sensitive to overwatering.",
      "Does well in a variety of light levels. The only difficulty with full sun is the flat upper surface of fertile fronds may sunburn.",
      "If dry, can take temperatures slightly below freezing for short periods.",
      "As the rhizome elongates, the bud moves farther from the mount and the plant loses vigor. Cut back the rear and remount.",
    ],
  },
  {
    slug: "veitchii",
    wateringSensitivity: "high",
    lightRequirement: "very high",
    coldTolerance: "very hardy",
    growthType: "pup-forming",
    seasonalNotes:
      "Adapted to drought — withstands months without water in habitat. High light and low moisture produce the most distinctive specimens.",
    mountingNotes:
      "Standard plaque or basket. Pups through the sides of treefern pots freely.",
    propagationNotes:
      "Pups freely. Easy to propagate.",
    cultivationTips: [
      "Very high light is required to show its signature traits fully: white-haired fertile fronds, upright posture, and long shield-frond fingers.",
      "In less light, fertile fronds droop, have fewer hairs, and shield fingers are shorter.",
      "The amount of water may also affect formation of the fingers on the shields.",
      "Overwatering is the main difficulty.",
      "True P. veitchii is almost identical to the old cultivar Lemoinei. Early importations were actually forms of P. bifurcatum, still sometimes sold as 'green veitchii.'",
    ],
  },
  {
    slug: "wallichii",
    wateringSensitivity: "medium",
    lightRequirement: "high",
    coldTolerance: "moderate",
    growthType: "solitary",
    seasonalNotes:
      "Shields may all be brown while fertile fronds are still green. Plants from India are smaller and more apt to go dormant than those from Thailand.",
    mountingNotes:
      "Standard mounting. Plants from Thailand (which shares habitat with P. holttumii) should be adapted to monsoon-forest conditions with definite wet and dry seasons.",
    propagationNotes:
      "Spore only — pups are extremely rare. Green spores indicate short viability — they germinate quickly. A pad of moist moss kept below a spore patch may develop volunteer sporelings.",
    cultivationTips: [
      "Few hobbyists grow this successfully. More often dies from stalled dormancy than rot — plants enter dormancy and never come back.",
      "Growers disagree: one gives no water while dormant, another waters well year-round so it doesn't go dormant.",
      "Plants from India may need cool temperatures during dormancy. Plants from Thailand should be treated like P. holttumii.",
      "The future of this species in the hobby probably depends on sporelings raised in cultivation rather than imports.",
    ],
  },
  {
    slug: "wandae",
    wateringSensitivity: "high",
    lightRequirement: "high",
    coldTolerance: "moderate",
    growthType: "solitary",
    seasonalNotes:
      "Forms fertile fronds at a much smaller size than the other giant species.",
    mountingNotes:
      "Adequate space is the main requirement. Almost as sensitive to overwatering as P. superbum. Culture methods are the same as for P. superbum except it is less cold-tolerant.",
    propagationNotes:
      "Spore only — no pups. Nearly all plants in the trade are cultivated sporelings. Spore culture is not particularly difficult. Sporophytes form quickly.",
    cultivationTips: [
      "The largest Platycerium — about 1/3 larger than P. superbum.",
      "Distinguished from other giants by having small frills on the edges of its shields at the bud.",
      "Not as prone to shipping damage as P. holttumii.",
      "Temperature range is not as low as P. superbum.",
      "Large species like P. wandae depend on leaves and trash falling from above to fill spaces between shields. In collections, pack these spaces with sphagnum moss (not peat — too wet).",
    ],
  },
];
