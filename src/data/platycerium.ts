// 1 = easiest … 5 = difficult / little understood (per herbhalling.com)
export type CareDifficulty = 1 | 2 | 3 | 4 | 5;

export const difficultyLabel: Record<CareDifficulty, string> = {
  1: "Easiest",
  2: "Fairly easy",
  3: "Requires experience",
  4: "Somewhat difficult",
  5: "Difficult / little understood",
};

export type Propagation = "pups" | "spore" | "both";

// Biogeographical regions per Kreier & Schneider, American Journal of Botany 2006.
export type BiogeographicalRegion = 1 | 2 | 3;

export const regionLabel: Record<BiogeographicalRegion, string> = {
  1: "Indochina, Malaysia, New Guinea & Australia",
  2: "Australia",
  3: "Africa, Madagascar & South America",
};

export type SporePattern =
  | "on lobes"
  | "on pods"
  | "between first & second frond division"
  | "on tips";

export type Platycerium = {
  slug: string;
  scientificName: string;
  commonNames?: string[];
  nativeOrigin: string[];
  difficulty: CareDifficulty;
  propagation: Propagation;
  biogeographicalRegion?: BiogeographicalRegion;
  sporePattern?: SporePattern;
  complex?: string;
  isHybrid?: boolean; // true for named hybrids like P. elemaria
  isBigFive?: boolean; // one of the 5 large platyceriums
  hasHybrids: boolean;
  notableHybrids?: string[];
  closestRelatives?: string[];
  summary?: string; // 2–4 line overview shown in the card
  notes?: string;   // full prose shown when expanded
  difficultyReason?: string; // short explanation of the difficulty rating
  physicalDescription?: string; // morphological overview: shields, fertile fronds, bud, size
  imageUrl?: string;
  dataFilled: boolean;
};

export const platyceriums: Platycerium[] = [
  {
    slug: "alcicorne",
    scientificName: "Platycerium alcicorne",
    commonNames: ["P. alcicorne 'Vassei'"],
    nativeOrigin: ["East Africa", "Madagascar"],
    difficulty: 1,
    propagation: "pups",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: false,
    closestRelatives: [
      "P. ellisii",
      "P. hillii",
      "P. ridleyi",
      "P. madagascariense",
    ],
    physicalDescription:
      "A medium-sized pup-forming species occurring in two distinct forms. The African form produces yellow-green, waxy, nearly hairless shield fronds that turn rich brown when dead. The Madagascan form has darker green shields covered in trichomes; dead shields become nearly black. Under adequate light the Madagascan form develops characteristic folds in the upper half of each shield. Fertile fronds are narrow with two or three divisions and frequently show a fold at the center of the first division. Spore patches occur between the first and second frond division. The Madagascan form includes both wide-frond and narrow-frond variants, the latter traceable to early importations by Marcel Lecoufle.",
    difficultyReason:
      "Platycerium alcicorne pups freely, is slightly more cold-tolerant than most platys, and has a predictable winter-dormant rhythm. Minimizing water during dormancy is straightforward and the plant recovers reliably.",
    summary:
      "Occurs as two distinct forms — African and Madagascan — long thought to be separate species (P. alcicorne and P. vassei). The African form is easy and winter-dormant; the Madagascan form is harder to find and grow.",
    notes:
      "Occurs in two distinct forms — African (East Africa) and Madagascan — long thought to be separate species (P. alcicorne vs. P. vassei) but now recognized as the same plant. The African form is the easier of the two: pups freely, slightly more cold-tolerant than most platyceriums, and shield fronds stay yellow-green, waxy, and hairless (rich brown when dead). The Madagascan form is harder to find and grow, with dark hairy shields, deeply ridged contours, and two fertile-frond morphs (wide or narrow); develops proper shield folds only with adequate light. Both forms are slightly more cold-sensitive than P. bifurcatum and cannot tolerate significant frost. Goes dormant in winter — shield fronds die back in late summer/fall, and water and fertilizer should be minimized through the dormant period. The African form is less tolerant of excess water than the Madagascan.",
    dataFilled: true,
  },
  {
    slug: "bifurcatum",
    scientificName: "Platycerium bifurcatum",
    commonNames: ["Common Staghorn"],
    nativeOrigin: ["Australia", "Indonesia", "New Guinea"],
    difficulty: 1,
    propagation: "pups",
    biogeographicalRegion: 2,
    complex: "Bifurcatum complex",
    hasHybrids: true,
    notableHybrids: [
      "P. bifurcatum 'Electrofolia' (bifurcatum × veitchii)",
      "P. ×diversifolium (bifurcatum × hillii)",
      "'Japanese Hybrid'",
    ],
    closestRelatives: ["P. hillii", "P. veitchii", "P. willinckii"],
    physicalDescription:
      "A medium-sized pup-forming species with considerable natural variation across its range. Shield fronds have divided tips forming pointed lobes that extend forward; they are typically tan to brown in spring and summer, with new green shields appearing in late summer and fall. Fertile fronds are generally narrow, held upright with the tips drooping, and bear a moderate covering of trichomes. Each fertile frond persists for two to three years. Spore patches form between the first and second frond division. The rhizome elongates over time, causing the bud to advance progressively away from the mounting surface.",
    difficultyReason:
      "Platycerium bifurcatum tolerates 40–90°F with brief dips near 25°F, handles light from filtered to full sun, and pups prolifically. It's the most forgiving platycerium in cultivation — what most beginners start with.",
    summary:
      "The common staghorn — probably the most cultivated platycerium in the world and the namesake of the Bifurcatum complex. Easy, pups prolifically, tolerates a wide temperature range and light from filtered to full sun.",
    notes:
      "Probably the most common platycerium in cultivation and the namesake of the Bifurcatum complex (with hillii, veitchii, willinckii). Easy to grow: tolerates 40–90°F with brief dips near 25°F, and can be conditioned to full sun or kept in morning / filtered light. Reliably produces pups — \"volunteers\" — which makes it one of the easiest platyceriums to propagate. Fertile fronds live 2–3 years. In the Northern Hemisphere, December is the best time to remount, as new shields start forming then. Humidity is non-negotiable — even well-established plants can decline without it. Named hybrids include 'Electrofolia' (× veitchii), P. ×diversifolium (× hillii), and the informally-labeled 'Japanese Hybrid'. Regional cultivar lineages trace to Indonesia (Celebes), Polynesia, and Hawaii.",
    dataFilled: true,
  },
  {
    slug: "hillii",
    scientificName: "Platycerium hillii",
    nativeOrigin: ["Queensland, Australia"],
    difficulty: 1,
    propagation: "pups",
    biogeographicalRegion: 2,
    complex: "Bifurcatum complex",
    hasHybrids: true,
    notableHybrids: ["P. ×diversifolium (bifurcatum × hillii)"],
    closestRelatives: ["P. bifurcatum", "P. willinckii"],
    physicalDescription:
      "A medium-sized pup-forming species closely related to P. bifurcatum, with all types of intergrades between the two found among cultivars. In its purest form, shield fronds are rounded along the top edge without lobes or undulations, and grow flat against the mounting surface rather than forming a debris-collecting nest. Fertile fronds are broad, deep green, and bear few trichomes — distinctly wider than those of P. bifurcatum, making them more susceptible to sunburn.",
    difficultyReason:
      "Platycerium hillii is a very hardy Queensland native that pups readily. Its shield fronds grow tight to the mount and the fertile fronds collect their own dew at night, so watering mistakes are forgiven more than most.",
    summary:
      "Hardy Queensland native that pups prolifically. Shield fronds grow tight against the mount, and the fertile fronds collect dew at night — best remounted in November.",
    notes:
      "Native to Queensland, Australia. Very hardy and pups freely. Shield fronds grow tight to the mount, which makes watering the root ball a challenge — collecting water in the fertile fronds at night via dew is a natural adaptation. November is the recommended remount window. Shield fronds develop seasonally, primarily in fall and winter. Fertile-frond color shifts darker or lighter with light intensity. The cultivar 'Bloomei', once placed under P. hillii, has been reclassified under P. willinckii.",
    dataFilled: true,
  },
  {
    slug: "veitchii",
    scientificName: "Platycerium veitchii",
    commonNames: ["Silver Elkhorn"],
    nativeOrigin: ["Eastern Australia"],
    difficulty: 1,
    propagation: "pups",
    biogeographicalRegion: 2,
    complex: "Bifurcatum complex",
    hasHybrids: true,
    notableHybrids: ["P. bifurcatum 'Electrofolia' (bifurcatum × veitchii)"],
    closestRelatives: ["P. bifurcatum", "P. hillii"],
    physicalDescription:
      "A medium-sized pup-forming species adapted to semi-arid conditions, distinguished by a dense covering of white trichomes that gives the entire plant a silvery appearance. The tops of the shield fronds extend into thin, elongated fingers — a morphological trait unique within the genus. Under high light, fertile fronds are held erect and the trichome coverage is heaviest; in lower light they tend to droop, with reduced hair density and shorter shield fingers. Spore patches occur between the first and second frond division. In habitat the species grows on sandstone near springs and can endure months of drought.",
    difficultyReason:
      "Platycerium veitchii is rugged and drought-adapted — it withstands months without water in habitat and pups freely. The only real failure modes are overwatering or starving it of light, both of which are easy to avoid once you know.",
    summary:
      "The Silver Elkhorn of semi-arid eastern Australia. Drought-tolerant and rugged; high light is essential to get the silvery, vertical form with long shield-frond fingers.",
    notes:
      "Closely related to P. bifurcatum; grows on rocks near springs in semi-arid eastern-Australian basins with only ~25 inches of annual rainfall. Easy, rugged, and pups freely. Adapted to drought — withstands months without water but suffers from overwatering. High light is the key to expressing its signature traits: white-haired fertile fronds (the source of its silvery color), vertical fertile-frond posture, and longer shield-frond fingers. Low light flattens all three: drooping fronds, fewer hairs, shorter fingers.",
    dataFilled: true,
  },
  {
    slug: "willinckii",
    scientificName: "Platycerium willinckii",
    commonNames: ["Java Staghorn"],
    nativeOrigin: ["Java", "Lesser Sunda Islands"],
    difficulty: 1,
    propagation: "both",
    biogeographicalRegion: 2,
    complex: "Bifurcatum complex",
    hasHybrids: false,
    closestRelatives: ["P. bifurcatum"],
    physicalDescription:
      "A medium-sized pup-forming species, though it produces pups less freely than P. bifurcatum. Shield fronds are very tall and deeply lobed; the tissue between the veins at the top typically dies away, leaving the upper portion as a skeletal network of veins. Fertile fronds are long and pendulous, emerging edgewise from the bud before arching downward. Trichome coverage is heavier on the underside than the upper surface. Some individuals develop a broad, flat cluster of pointed, recurving fingers at the fertile frond tips. The bud is comparatively small; newly received plants may remain dormant for an extended period before resuming growth.",
    difficultyReason:
      "Platycerium willinckii is easy overall and unfussy about medium light, moist moss, and moderate temperatures. It's slower and less cold-tolerant than P. bifurcatum, but has no specific problems that trip beginners up.",
    summary:
      "Java Staghorn — easy but slower and less cold-hardy than P. bifurcatum. Mature plants can carry twice as many fertile fronds; white-haired undersides shield against heat and water loss.",
    notes:
      "Native to Java and the Lesser Sunda Islands. Easy overall, though reports diverge: Thailand growers see rot, Southern California growers see thriving plants. Pups but less freely than P. bifurcatum, so most American trade plants are pup-grown. Green spore germinate quickly on very moist moss. Prefers medium light and moist moss, and despite the moisture preference is not prone to rot. Slower and less cold-tolerant than P. bifurcatum. Mature plants can carry around 12 fertile fronds (vs. ~6 for bifurcatum). White hairs on fertile fronds shield against heat and water loss. Plants often stay inactive for a while after shipping.",
    dataFilled: true,
  },
  {
    slug: "grande",
    scientificName: "Platycerium grande",
    nativeOrigin: ["Philippines"],
    difficulty: 2,
    propagation: "spore",
    biogeographicalRegion: 1,
    sporePattern: "on lobes",
    isBigFive: true,
    hasHybrids: false,
    closestRelatives: ["P. superbum", "P. holttumii", "P. wandae"],
    physicalDescription:
      "A large solitary species. Shield fronds are deeply lobed and form a basket that collects debris and rainwater. The principal diagnostic feature is the fertile frond, which divides into two large lobes of roughly equal size, each bearing its own spore patch — distinguishing it from P. superbum, which produces a single undivided spore patch per frond. Juvenile specimens may produce undivided first fertile fronds, complicating identification. The bud bears light green trichomes and is partially concealed by frills from the shield margins. The species is slow to reach reproductive maturity.",
    difficultyReason:
      "Platycerium grande follows predictable requirements once set up — 50% shade cloth, filtered sun, 40–90°F — but it's slower-maturing and less cold-tolerant than P. superbum, and hard to source. Manageable, not beginner-friendly.",
    summary:
      "Philippine giant, separated from P. superbum in 1970. Rare in the trade and distinctly harder to grow than P. superbum, with the signature trait of two equal-size spore patches per fertile lobe.",
    notes:
      "One of the Big Five large platyceriums. Native to the Philippines; formally separated from P. superbum in 1970 (prior to that both were called P. grande). Very difficult to source in the trade and harder to grow than P. superbum. Does not produce volunteer pups. Distinguishing trait: two spore patches of equal size per fertile lobe. Wants ~50% shade cloth and tolerates full filtered sun; temperature range 40–90°F, slightly less cold-tolerant than P. superbum. Slow-maturing — specimens can take years to throw their first fertile frond. Conservation note: native range is being destroyed by slash-and-burn clearing.",
    dataFilled: true,
  },
  {
    slug: "superbum",
    scientificName: "Platycerium superbum",
    nativeOrigin: ["Australia"],
    difficulty: 2,
    propagation: "spore",
    biogeographicalRegion: 1,
    sporePattern: "on lobes",
    isBigFive: true,
    hasHybrids: true,
    notableHybrids: ["Possible P. wandae × P. superbum (uncertain)"],
    closestRelatives: ["P. grande", "P. holttumii", "P. wandae"],
    physicalDescription:
      "One of the largest solitary species, native to eastern Australia. Shield fronds are deeply lobed and may exceed 1.3 m in height; their upper margins extend forward, creating a basket-like cavity behind them that collects organic debris and rainwater. Successive shields curl back into this cavity before being overlaid by new growth. Juvenile plants produce shields exclusively, alternating left and right, at a rate of two to four per year. Each fertile frond bears a single oval to subtriangular spore patch, brown at maturity, and terminates in fingers of variable length. The bud is clothed in light green trichomes and partially obscured by frills from adjacent shield margins.",
    difficultyReason:
      "Platycerium superbum is surprisingly tolerant of full sun, hardy to 30°F for short stretches, and forgiving about conditions. The main traps are sunburn on fertile fronds when it's too hot and prolonged cold — both easy to avoid.",
    summary:
      "Australian giant, the easier half of the former P. grande complex. Sun-tolerant and forgiving; doesn't pup and produces one spore patch per fertile frond.",
    notes:
      "One of the Big Five large platyceriums. Native to Australia; distinguished from P. grande in 1970 after decades of conflated naming. Considered easy to grow and very tolerant of full sun — notably easier than P. grande. Does not pup; produces one spore patch per fertile frond. Hardy to 30°F for short periods, range roughly 30–100°F; prolonged cold isn't tolerated. Likes brighter light than the average staghorn, but fertile fronds can sunburn on the upper surface if temperatures run too high. Some specimens grow on rocks in the wild. A possible wandae × superbum hybrid has been documented but is not firmly classified.",
    dataFilled: true,
  },
  {
    slug: "wandae",
    scientificName: "Platycerium wandae",
    commonNames: ["Queen Staghorn"],
    nativeOrigin: ["New Guinea"],
    difficulty: 2,
    propagation: "spore",
    biogeographicalRegion: 1,
    sporePattern: "on lobes",
    isBigFive: true,
    hasHybrids: true,
    notableHybrids: ["Possible P. wandae × P. superbum (uncertain)"],
    closestRelatives: [
      "P. superbum",
      "P. grande",
      "P. wallichii",
      "P. holttumii",
    ],
    physicalDescription:
      "The largest species in the genus, reaching approximately one-third larger than P. superbum at maturity. Shield fronds are erect and lobed along their upper margins, forming a tall, open basket. Fertile fronds are bilobed, with a smaller elevated lobe and a larger pendulous lobe, each bearing a brown spore patch — a morphology shared with P. holttumii. The species is distinguished from other large solitary platyceriums by the small pointed frills along the shield margins near the bud, a feature unique to P. wandae. Notably, fertile fronds appear at a significantly younger developmental stage than in other giant species.",
    difficultyReason:
      "Platycerium wandae needs greenhouse-grade conditions — bright filtered shade (more than most platys), 60–100°F, damage below 40°F — but its requirements are consistent and well-understood. Demanding on environment, not on technique.",
    summary:
      "One of the Big Five and the largest staghorn in the genus — roughly 30% bigger than P. superbum. The only one of the five with a frill around the bud. New Guinea native; throws fertile fronds at a younger age than any other giant.",
    notes:
      "The largest staghorn in the genus — grows roughly 30% larger than P. superbum. Native to New Guinea. No volunteer pups; propagation is via spore. Temperature range 60–100°F; damage occurs below 40°F. Wants bright filtered shade (more than most platyceriums) — 50% shade cloth or greenhouse is ideal. Shield fronds are very upright and lobed along the top, forming a basket-like crown. Most similar to P. holttumii in fertile-frond structure. Notable for throwing fertile fronds at a younger age than any other giant platycerium.",
    dataFilled: true,
  },
  {
    slug: "andinum",
    scientificName: "Platycerium andinum",
    commonNames: ["American Staghorn"],
    nativeOrigin: ["Peru", "Bolivia"],
    difficulty: 3,
    propagation: "both",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: true,
    notableHybrids: [
      "P. andinum × P. madagascariense (Roy Vail)",
      "P. elemaria (andinum × elephantotis)",
    ],
    closestRelatives: [
      "P. elephantotis",
      "P. quadridichotomum",
      "P. ellisii",
      "P. alcicorne",
    ],
    physicalDescription:
      "A tall, slender pup-forming species and the only member of the genus native to the Americas. Fertile fronds may exceed 2 m in habitat but are typically shorter in cultivation; they bear a dense covering of trichomes on the underside and a lighter covering above. The spore patch is dark brown, positioned at the second frond division — a placement shared with P. quadridichotomum. Shield fronds have an even, moderately dense trichome covering on both surfaces. The bud is prominent and clothed in long, pale green trichomes. Fertile frond tips may continue elongating after the spore patch has formed. Growth is sequential: shield fronds develop in early summer followed by fertile fronds later in the season.",
    difficultyReason:
      "Platycerium andinum is prone to rhizome rot when small and picky about mounting (rough bark, never palms). Mature care is moderate, but getting it through the early years takes attention, and propagating from spore is among the hardest in the genus.",
    summary:
      "The only staghorn naturally growing in the Americas — native to Peru's Río Huallaga valley. Tall slender form with spore patches centered on the fertile fronds; general care is moderate, but spore propagation is among the hardest in the genus.",
    notes:
      "The only staghorn naturally growing in the Americas, native to the Tropical Dry Forest of Peru's Río Huallaga valley — a habitat reduced to roughly 12,000 acres and still shrinking. The cultivar 'Blake' is considered the most natural form in cultivation. Tall slender staghorns; shield fronds form a distinctive bowl-shaped crown that encircles the host tree. Fertile fronds droop with spore patches concentrated in the center (not the tips), linking it genetically to P. quadridichotomum, P. ellisii, and P. alcicorne. Needs bright indirect light, rough-bark mounting (quinilla-style — not palms), and roughly 35 inches of annual rainfall in habitat. Prone to rhizome rot when small; general care is moderate, but spore propagation is considered one of the most difficult in the genus. Propagates by pups from horizontal rhizomes; 10–20 years to form a crown in the wild, faster on a mounted pole.",
    dataFilled: true,
  },
  {
    slug: "elephantotis",
    scientificName: "Platycerium elephantotis",
    commonNames: ["Angola Staghorn", "Elephant Ear Fern"],
    nativeOrigin: ["Tropical Africa"],
    difficulty: 3,
    propagation: "pups",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: true,
    notableHybrids: ["P. elemaria (andinum × elephantotis)"],
    closestRelatives: ["P. stemaria", "P. alcicorne"],
    physicalDescription:
      "A large pup-forming species distinguished by its massive, bright green shield fronds — a trait that has earned it the informal name 'lettuce staghorn.' Fertile fronds are broad, entire-margined (lacking the notches or fingers typical of other species), and pendulous, giving rise to the common name 'elephant ear fern.' Growth is strongly seasonal: the previous year's shields die in spring, followed by a flush of new shield growth in summer and fertile frond production later in the season. Trimming the dead shield tops allows new shields to develop more erectly. Mature basket-mounted specimens may exceed 1 m in height.",
    difficultyReason:
      "Platycerium elephantotis pups freely in bright warm conditions, but rot sets in quickly under low light. Growth is very seasonal — getting the light and water timing right across spring shed and summer regrowth is what separates thriving from failing.",
    summary:
      "The Elephant Ear Fern of tropical Africa, named for its massive rounded shields. Wants bright warm conditions and pups freely — but rot sets in quickly under low light.",
    notes:
      "Named for its massive, rounded, bright-green shield fronds that resemble elephant ears. Many hobbyists struggle with it, but grown in bright warm conditions it performs well and pups freely. Fertile fronds are long, very wide, hang downward, and lack notches. Low light invites rot. If the plant wilts during a dry spell, it typically recovers fully. Highly seasonal: shields shed in spring, new shields form during summer. Parent of the hybrid P. elemaria (with P. andinum). Cultivar 'Paulo Forti' is notable.",
    dataFilled: true,
  },
  {
    slug: "elemaria",
    scientificName: "Platycerium elemaria",
    nativeOrigin: [],
    difficulty: 3,
    propagation: "both",
    isHybrid: true,
    hasHybrids: false,
    closestRelatives: ["P. andinum", "P. elephantotis", "P. stemaria"],
    physicalDescription:
      "A confirmed hybrid (P. andinum x P. elephantotis), not a naturally occurring species. Fertile fronds are dark green with a waxy adaxial surface. Shield frond morphology and overall habit are intermediate between the parent species. The plant is medium-sized and pup-forming.",
    difficultyReason:
      "Platycerium elemaria tolerates cooler temperatures than either parent, which gives it more climate flexibility — but rot from overwatering is the main failure mode and catches most growers at least once.",
    summary:
      "A named hybrid, not a natural species — P. andinum × P. elephantotis (DNA-verified). Tolerates cooler temperatures than either parent; rot from overwatering is the usual failure mode.",
    notes:
      "A named hybrid — not a natural species. Originally thought to include P. stemaria parentage, but recent DNA testing confirms it as P. andinum × P. elephantotis. Tolerates lower temperatures than either parent and has been grown successfully outdoors in Southern California. Most common failure mode is rot from overwatering. Fertile fronds are dark green with a waxy upper surface; shield behavior differs from both parents. Notable cultivar: 'Sanchez'. Listed here for completeness — not represented in the phylogeny tree, which covers natural species only.",
    dataFilled: true,
  },
  {
    slug: "ellisii",
    scientificName: "Platycerium ellisii",
    nativeOrigin: ["Eastern Madagascar"],
    difficulty: 3,
    propagation: "pups",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: false,
    closestRelatives: ["P. alcicorne"],
    physicalDescription:
      "A small to medium pup-forming species closely allied to the African form of P. alcicorne, sharing a yellow-green coloration and waxy frond surface. Fertile fronds are consistently broad and divide into only two terminal points — the primary diagnostic distinction from P. alcicorne. Shield fronds are thin; the vein architecture creates air spaces up to 2.5 cm wide between successive shields, limiting the plant's capacity to store water. The rhizome advances upward rapidly, with shallow roots concentrated immediately below the bud. In habitat the species is epiphytic on mangroves, often on stems as narrow as 1.5 cm in diameter. Three forms are recognized in cultivation: the standard form, a 'diversifolium' form bearing additional terminal divisions on the fertile fronds, and a broad-leaved form with fertile fronds reaching 20 cm across.",
    difficultyReason:
      "Platycerium ellisii develops wide gaps between its shield fronds that don't hold water, so the plant depends almost entirely on sustained high humidity and solid shade. The microclimate has to be consistent — one dry stretch can be fatal.",
    summary:
      "Madagascar mangrove native with distinctive wide gaps between its shield fronds. Relies heavily on atmospheric humidity — Roy Vail stuffs the gaps with sphagnum to help with water retention.",
    notes:
      "Native to the mangrove belt of eastern Madagascar. Challenging in cultivation — demands very high humidity and solid shade. Distinctive shield fronds develop wide gaps (up to an inch) between them, which dry out quickly and make the plant reliant on atmospheric moisture rather than stored water. Roy Vail recommends stuffing sphagnum moss into those gaps to help retain water; the species supports the broader hypothesis that platyceriums draw significant moisture from dew and ambient humidity. Cultivar 'diversifolium' has extra fertile-frond tips.",
    dataFilled: true,
  },
  {
    slug: "holttumii",
    scientificName: "Platycerium holttumii",
    nativeOrigin: ["Southeast Asia", "Malaysia"],
    difficulty: 3,
    propagation: "spore",
    biogeographicalRegion: 1,
    sporePattern: "on lobes",
    isBigFive: true,
    hasHybrids: false,
    closestRelatives: ["P. superbum", "P. grande", "P. wandae"],
    physicalDescription:
      "A large solitary species allied to P. grande, P. superbum, and P. wandae. Fertile fronds are bilobed: a smaller, elevated lobe and a larger, pendulous lobe, both bearing spore patches. Shield fronds are lobed and erect, forming an open basket. The bud is clothed in pale green trichomes. The species is distinguished from P. wandae by the absence of marginal frills on the shields near the bud — the principal diagnostic character separating the two. Juvenile specimens of the four related giants (P. grande, P. holttumii, P. superbum, P. wandae) are essentially indistinguishable until mature shield fronds develop.",
    difficultyReason:
      "Platycerium holttumii wants bright light plus consistently high humidity, and is noticeably less cold-tolerant than P. superbum. New imports often need a preventative terramycin treatment to survive the transition — not a beginner plant.",
    summary:
      "One of the Big Five. SE Asian giant named for Dr. R. E. Holttum of Kew. Fertile fronds have two spore-bearing lobes (one small and elevated, one large and hanging). Wants bright light and high humidity; propagates almost entirely by spore.",
    notes:
      "Named after Dr. R. E. Holttum of Kew. Native to Southeast Asia and Malaysia. Moderate-to-advanced difficulty; wants bright light with high humidity. Water more frequently and keep extra moist during the growing season. Temperature range ~60–100°F; noticeably less cold-tolerant than P. superbum. Primary propagation is spore — rhizome branching (and therefore pups) happens only occasionally. Fertile fronds have two spore-bearing lobes: one smaller and elevated, one larger that hangs down. Distinguished from P. wandae by the absence of small frills on the shields at the bud. New imports benefit from a preventative terramycin treatment to guard against bacterial infection.",
    dataFilled: true,
  },
  {
    slug: "stemaria",
    scientificName: "Platycerium stemaria",
    commonNames: ["Triangle Staghorn"],
    nativeOrigin: ["Tropical Africa"],
    difficulty: 3,
    propagation: "pups",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: false,
    closestRelatives: ["P. elephantotis", "P. alcicorne"],
    physicalDescription:
      "A medium-sized pup-forming species. Shield fronds are tall, broad, and wavy along the upper margin; they are relatively thin and develop spaces between them that accumulate debris. Shield senescence is notably rapid — the transition from green to brown occurs so quickly it can be mistaken for rot. Emerging shields are characteristically pure white. Fertile fronds are broad, often glossy on the adaxial surface and densely covered in trichomes beneath. A single plant may produce fertile fronds varying considerably in length and number of terminal tips, but all divide into two primary lobes, each subdividing once more. Two spore patches are borne per fertile frond, one on each primary lobe, turning dark brown at maturity.",
    difficultyReason:
      "Platycerium stemaria thrives in low-light microclimates that are easy to get wrong. Overly long fertile fronds are a warning sign that light is too low — and when that happens, spore-patch viability suffers before the visual signs become obvious.",
    summary:
      "The Triangle Staghorn of tropical Africa, normally grown in low light. Tall wavy shields with wide, hairy-undersided fertile fronds. Cultivars 'Laurentii' and 'Hawke' are particularly notable.",
    notes:
      "African species, distinct from the other African platyceriums. Normally grown in low light; if fertile fronds stretch unusually long, it's a sign the light is too low and spore-patch viability suffers. Shields are tall, wide, and wavy at the tip; fertile fronds are wide, shiny on top and hairy beneath, typically forking twice with one spore patch per main lobe (two per frond). Notable cultivars include 'Laurentii' (sometimes treated as P. stemaria laurentii in phylogenies — a little-known cultivar) and 'Hawke' (an extreme form with very wide fertile fronds and short fingers). Once suspected to be a parent of the hybrid P. elemaria, but DNA testing ruled that out in favor of P. andinum × P. elephantotis.",
    dataFilled: true,
  },
  {
    slug: "coronarium",
    scientificName: "Platycerium coronarium",
    commonNames: ["Crown Staghorn"],
    nativeOrigin: ["Taiwan", "Malaysia"],
    difficulty: 4,
    propagation: "both",
    biogeographicalRegion: 1,
    sporePattern: "on pods",
    hasHybrids: false,
    closestRelatives: ["P. ridleyi"],
    physicalDescription:
      "A pup-forming species with unusually thick, corky shield fronds that may be light green and waxy. At maturity the accumulated shields form a crown-shaped mass. Fertile fronds develop as a long, twisted cluster bearing spore patches on the underside of kidney-shaped lobes (spore pods) — a morphology shared only with P. ridleyi. The entire spore mass may detach and fall as a single unit. Pup formation follows a mechanism unique within the genus: the rhizome branches horizontally behind the shields, extends laterally, and emerges as a new bud at the same height as the parent, producing a ring of individuals around the host tree trunk.",
    difficultyReason:
      "Platycerium coronarium has cork-like shields that are lightweight and fool people into overwatering. Its horizontal rhizome also demands unusual mounting (wire basket or under-board) — neither is obvious from standard platy care. Becomes tough once it's dialed in, but the path there is fussy.",
    summary:
      "Crown Staghorn of Taiwan and Malaysia. Shields are cork-like and easily overwatered; the horizontal rhizome demands basket or under-board mounting. Shares spore-pod morphology only with P. ridleyi.",
    notes:
      "Named for the crown-like mass its mature shields form. Native to Taiwan and Malaysia, where temperatures in habitat never drop below 80°F. Difficult to grow in America but becomes a tough, long-lived plant once established — provided it isn't overwatered. The shields are cork-like and roughly 1/2 inch thick, which makes them light but also very easy to overwater. The rhizome grows horizontally and pushes pups out through the shields, so mounting must accommodate that: a wire basket or a board where the rhizome sits below works well. Thrives in very high humidity; in cool climates, let it dry out in anticipation of colder temps. Along with P. ridleyi, one of only two platyceriums with spore pods (stalked kidney-shaped fertile lobes with spore on the underside) rather than patches.",
    dataFilled: true,
  },
  {
    slug: "madagascariense",
    scientificName: "Platycerium madagascariense",
    nativeOrigin: ["Central Madagascar"],
    difficulty: 4,
    propagation: "both",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: true,
    notableHybrids: [
      "P. andinum × P. madagascariense (Roy Vail)",
      "P. erawan (suspected hybrid or sport)",
    ],
    closestRelatives: ["P. alcicorne"],
    physicalDescription:
      "A pup-forming species with a shield frond morphology unique within the genus. Veins on the shield surface form tall ridges enclosing shallow valleys, creating a distinctive quilted or honeycombed pattern. New shields are thin and light green, darkening to a rich green at maturity. They cover the top of the rooting medium without collecting debris behind them. The valley architecture creates extensive air spaces between successive shields; in habitat these are colonized by ants and the orchid Cymbidiella rhodochila. The rhizome elongates progressively due to these inter-shield spaces, and the entire plant gradually assumes a spherical form. Fertile fronds are moderate in size; the species frequently produces two simultaneously. P. ridleyi bears superficially similar shield ridges, but in that species the ridges run continuously to the margin without forming enclosed valleys. The two species are not closely related.",
    difficultyReason:
      "Platycerium madagascariense is chlorine-sensitive — it needs RO, distilled, or filtered water — and really wants a high-humidity greenhouse to thrive. It tolerates a wide temperature range but rewards precise, controlled conditions that home setups rarely provide.",
    summary:
      "Central-Madagascar endemic from moist forests at 1000–2000 ft. Chlorine-sensitive — wants RO or distilled water and greenhouse humidity. Mature plants develop a distinctive spherical base.",
    notes:
      "Endemic to central Madagascar, growing at 1000–2000 ft in moist forests. Considered challenging; survives 32–110°F in cultivation but does best in a high-humidity greenhouse. Sensitive to chlorine and other chemicals — reverse-osmosis, distilled, or filtered water is recommended. Propagates reliably by both pups (best removed when 0.5–3 inches) and spore, and small sporelings often appear on moss under fertile fronds for up to two years after sowing. Mature plants develop a spherical basal form. One of four Platycerium species native to Madagascar; P. alcicorne (Madagascan form) also occurs there. P. erawan is a suspected hybrid or sport tied to this species.",
    dataFilled: true,
  },
  {
    slug: "quadridichotomum",
    scientificName: "Platycerium quadridichotomum",
    nativeOrigin: ["Western Madagascar"],
    difficulty: 5,
    propagation: "pups",
    biogeographicalRegion: 3,
    sporePattern: "between first & second frond division",
    hasHybrids: false,
    closestRelatives: ["P. stemaria", "P. andinum"],
    physicalDescription:
      "Among the smallest pup-forming species. The epithet refers to the fertile fronds, which typically branch to produce four terminal tips. Fertile fronds are pendulous with undulate margins; the adaxial surface may develop stellate trichomes under high light, while the abaxial surface bears a dense covering of tan trichomes. The spore patch is dark brown, positioned at the second frond division. Shield fronds are disproportionately tall for the plant's overall size, spreading outward at the apex without lobing, and lack the corky tissue characteristic of most species. During the prolonged dry dormancy of its native habitat, shield fronds die and fertile fronds roll lengthwise into tubes, exposing the trichome-covered undersurface outward and reducing evaporative surface area. Uniquely among platyceriums, the species is lithophytic rather than epiphytic in habitat, growing on limestone outcrops on the drier western coast of Madagascar.",
    difficultyReason:
      "Platycerium quadridichotomum is the rarest and least-understood platycerium. Its native habitat has an extreme dry dormancy, but expert growers disagree sharply about whether to enforce that dormancy in cultivation — there is no settled playbook.",
    summary:
      "Arguably the rarest and least-understood platycerium — native to western Madagascar's limestone dry country. Extreme seasonal dormancy in habitat (fronds roll up, brown and crispy) though cultivation opinions on dormancy diverge sharply.",
    notes:
      "Arguably the rarest and least-understood platycerium. Native to drier western Madagascar, where it grows on limestone rocks rather than trees. Experiences a dramatic seasonal cycle: a long dry dormancy during which shields are crispy and brown, followed by a wet-season flush of emerald-green growth. Expert opinions on dormancy conflict — Charles Alford reports his best plants are well-watered year-round with no enforced dormancy, contradicting the natural rhythm. Upper frond surfaces can become hairy in bright light. Fertile fronds branch into four tips, hang downward with wavy edges, and roll up tightly during dormancy. Shield fronds are unusually tall for the plant's size and lack lobes.",
    dataFilled: true,
  },
  {
    slug: "ridleyi",
    scientificName: "Platycerium ridleyi",
    commonNames: ["Ridley's Staghorn"],
    nativeOrigin: ["Malay Peninsula"],
    difficulty: 5,
    propagation: "spore",
    biogeographicalRegion: 1,
    sporePattern: "on pods",
    hasHybrids: false,
    closestRelatives: ["P. coronarium", "P. madagascariense"],
    physicalDescription:
      "The smallest solitary species in the genus, rarely exceeding 1 m across the fertile fronds. Fertile fronds — particularly in juvenile specimens — closely resemble deer antlers, making this species the most literal embodiment of the common name 'staghorn fern.' Spore patches develop on the underside of spoon-shaped lobes (spore pods), a morphology shared only with P. coronarium; the entire spore mass tends to be released as a single unit. Shield fronds bear tall, continuous vein ridges that extend to the margin, creating inter-shield air spaces that in habitat are packed with ant-deposited debris in the lower two-thirds. These spaces cause the rhizome to become notably elongated. Mature shields are tan and somewhat lustrous. The bud is small and inconspicuous.",
    difficultyReason:
      "Platycerium ridleyi grows high in the tree canopy in habitat where air circulation is constant — replicating that indoors is the real barrier, not humidity alone. It produces only spore pods (no pups), so even propagation is hard. A grail plant for a reason.",
    summary:
      "The grail of platycerium keepers — Malay Peninsula canopy native. Hardest to grow away from native humidity, but air circulation is the real key. One of only two species with spore pods instead of patches.",
    notes:
      "Named for J. Ridley, author of Ferns of the Malay Peninsula. Possibly the most sought-after platycerium — and one of the hardest to grow in low-humidity regions. Grows high in the tree canopy in habitat, where air circulation is best; replicating that circulation is the key to success in private collections. Loosely-packed moss in an open orchid pot is a solid baseline medium. Counterintuitively, some growers report success in closed humidity chambers with little air movement and infrequent watering. Along with P. coronarium, one of only two platyceriums that produce spore pods — spoon-shaped stalked lobes with spore on the underside — rather than patches. No vegetative pups.",
    dataFilled: true,
  },
  {
    slug: "wallichii",
    scientificName: "Platycerium wallichii",
    commonNames: ["Indian Staghorn"],
    nativeOrigin: ["Thailand", "Northern India", "Burma", "Yunnan (China)"],
    difficulty: 5,
    propagation: "spore",
    biogeographicalRegion: 1,
    sporePattern: "on lobes",
    isBigFive: true,
    hasHybrids: false,
    closestRelatives: ["P. holttumii", "P. grande", "P. superbum", "P. wandae"],
    physicalDescription:
      "A large solitary species reaching approximately 1.3 m in habitat, though typically smaller in cultivation. Shield fronds are tall and spreading, with numerous rounded lobes along the upper margins forming an open basket. Shields may be fully brown while fertile fronds remain green. Fertile fronds display prominently raised veins on the adaxial surface. Frond morphology is highly variable in cultivation: a primary pendulous lobe bearing the main spore patch may be flanked by one or more secondary lobes (some fertile, some sterile), and in well-developed specimens the frond can become fan-shaped, with outermost lobes grading into shield-like structures. The fertile region extends forward and may bear marginal points.",
    difficultyReason:
      "Platycerium wallichii more often dies from stalled dormancy than outright rot — plants enter dormancy and simply never come back. Growers disagree on whether to withhold water during the dry season or not, and pups are extremely rare, so you mostly get one shot per plant.",
    summary:
      "One of the Big Five. Indian Staghorn of monsoon forests from Thailand to Yunnan. The only one of the five that occasionally produces pups (very rarely). More often dies from stalled dormancy than outright rot.",
    notes:
      "Native to monsoon forests of Thailand, Northern India, Burma, and China's Yunnan province — a habitat it shares with P. holttumii. Difficult in collections: plants may die outright from rot, but more commonly slide into a dormancy they never emerge from. Pups are very rare; propagation is via spore. Spore is green, which signals short viability — it germinates quickly and wants a pad of moist moss under the spore patch for sporelings to establish. Temperature range 60–100°F, and it really wants humid-greenhouse conditions. Growers disagree sharply on dormancy management — some withhold water during the dry season, others water year-round.",
    dataFilled: true,
  },
];
