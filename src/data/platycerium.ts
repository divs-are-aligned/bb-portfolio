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
    difficultyReason:
      "Platycerium wallichii more often dies from stalled dormancy than outright rot — plants enter dormancy and simply never come back. Growers disagree on whether to withhold water during the dry season or not, and pups are extremely rare, so you mostly get one shot per plant.",
    summary:
      "One of the Big Five. Indian Staghorn of monsoon forests from Thailand to Yunnan. The only one of the five that occasionally produces pups (very rarely). More often dies from stalled dormancy than outright rot.",
    notes:
      "Native to monsoon forests of Thailand, Northern India, Burma, and China's Yunnan province — a habitat it shares with P. holttumii. Difficult in collections: plants may die outright from rot, but more commonly slide into a dormancy they never emerge from. Pups are very rare; propagation is via spore. Spore is green, which signals short viability — it germinates quickly and wants a pad of moist moss under the spore patch for sporelings to establish. Temperature range 60–100°F, and it really wants humid-greenhouse conditions. Growers disagree sharply on dormancy management — some withhold water during the dry season, others water year-round.",
    dataFilled: true,
  },
];
