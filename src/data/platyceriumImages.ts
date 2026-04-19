// Base URL for Firebase Storage. Update this after uploading images.
// Pattern: https://firebasestorage.googleapis.com/v0/b/{BUCKET}/o/platycerium-archive%2FImages%2F{FILE}?alt=media
// Or if using a custom domain / CDN: https://your-cdn.com/platycerium-archive/Images/
export const PLATYCERIUM_IMAGE_BASE =
    "https://firebasestorage.googleapis.com/v0/b/bb-folio.firebasestorage.app/o/platycerium-archive%2FImages%2F";
export const PLATYCERIUM_IMAGE_SUFFIX = "?alt=media";

// Filenames are stored exactly as they exist on disk / in Firebase Storage
// (with %20 etc. already in the name). We only need to encode the remaining
// special chars that aren't already percent-encoded.
export function platyceriumImageUrl(filename: string): string {
  const encoded = encodeURIComponent(filename);
  return `${PLATYCERIUM_IMAGE_BASE}${encoded}${PLATYCERIUM_IMAGE_SUFFIX}`;
}

export type SpeciesImage = {
  filename: string;
  alt: string;
};

// Each species' images, first entry is the "main" card preview.
// Filenames match what was scraped from halling.com and uploaded to storage.
// Filenames must exactly match what's on disk / in Firebase Storage.
// Many contain literal %20 from the original curl download.
export const speciesImages: Record<string, SpeciesImage[]> = {
  alcicorne: [
    { filename: "Alcicorne.png", alt: "P. alcicorne specimen" },
    { filename: "Dwg%20Alcicorne.gif", alt: "Line drawing of P. alcicorne" },
    { filename: "alc_af2.jpg", alt: "P. alcicorne African form" },
    { filename: "alc_mg1.jpg", alt: "P. alcicorne Madagascan form" },
    { filename: "045a_346x500.jpg", alt: "P. alcicorne detail" },
    { filename: "alcicorne1.jpg", alt: "P. alcicorne mounted" },
    { filename: "Alcico4.jpg", alt: "P. alcicorne shield fronds" },
  ],
  andinum: [
    { filename: "Andinum5.png", alt: "P. andinum specimen" },
    { filename: "Dwg%20Andinum.gif", alt: "Line drawing of P. andinum" },
    { filename: "Andinum.jpg", alt: "P. andinum in habitat" },
    { filename: "platyprofgoodaaa.jpg", alt: "P. andinum profile" },
    { filename: "Andinium.jpg", alt: "P. andinum mounted" },
    { filename: "IMG_8830.JPG", alt: "P. andinum detail" },
    { filename: "Andinu7.jpg", alt: "P. andinum growth" },
    { filename: "Andinu8.jpg", alt: "P. andinum fronds" },
  ],
  bifurcatum: [
    { filename: "Bifurcatum_Tree.png", alt: "P. bifurcatum on tree" },
    { filename: "Dwg%20Bifurcatum.gif", alt: "Line drawing of P. bifurcatum" },
    { filename: "Netherlands1.jpg", alt: "P. bifurcatum 'Netherlands'" },
    { filename: "Netherlands3.jpg", alt: "P. bifurcatum 'Netherlands' detail" },
    { filename: "Netherlands%20Huntington.png", alt: "P. bifurcatum at Huntington" },
    { filename: "Bifurcatum%20Netherlands.png", alt: "P. bifurcatum 'Netherlands' fronds" },
    { filename: "P.%20forgii.png", alt: "P. bifurcatum cv. forgii" },
    { filename: "P.%20Japanese%20Hybrid.png", alt: "P. bifurcatum Japanese Hybrid" },
    { filename: "Bifurc1.png", alt: "P. bifurcatum specimen" },
    { filename: "SouthSeas.jpg", alt: "P. bifurcatum South Seas form" },
    { filename: "Longwood%20Gardens.png", alt: "P. bifurcatum at Longwood Gardens" },
    { filename: "Kingii.png", alt: "P. bifurcatum cv. Kingii" },
  ],
  coronarium: [
    { filename: "Coronarium1.png", alt: "P. coronarium specimen" },
    { filename: "Corona1.jpg", alt: "P. coronarium shield fronds" },
    { filename: "CoronariumRhizone.png", alt: "P. coronarium rhizome detail" },
    { filename: "Corona2.jpg", alt: "P. coronarium mounted" },
    { filename: "Coronarium3.png", alt: "P. coronarium fertile fronds" },
    { filename: "Corona3.png", alt: "P. coronarium mature" },
  ],
  elephantotis: [
    { filename: "Elephantotis.jpg", alt: "P. elephantotis specimen" },
    { filename: "Dwg%20Elephantotis.jpg", alt: "Drawing of P. elephantotis" },
    { filename: "Elephantotis%20Bud%20Hair.png", alt: "P. elephantotis bud hair detail" },
    { filename: "Elephantotis%20Hair.png", alt: "P. elephantotis frond hair" },
  ],
  elemaria: [
    { filename: "Elemaria%202.png", alt: "P. elemaria hybrid" },
    { filename: "elemaria.JPG", alt: "P. elemaria specimen" },
    { filename: "Elemaria%20Sanchez.jpg", alt: "P. elemaria cv. Sanchez" },
  ],
  ellisii: [
    { filename: "Ellisii2.png", alt: "P. ellisii specimen" },
    { filename: "Dwg%20Ellisii.gif", alt: "Line drawing of P. ellisii" },
    { filename: "Diversifolium.png", alt: "P. ellisii cv. diversifolium" },
    { filename: "Ellissii%20Shield.png", alt: "P. ellisii shield frond" },
    { filename: "Ellisi%20Bud.png", alt: "P. ellisii bud" },
  ],
  grande: [
    { filename: "Grande1.png", alt: "P. grande specimen" },
    { filename: "Dwg%20Grande.gif", alt: "Line drawing of P. grande" },
    { filename: "Journal.png", alt: "P. grande journal illustration" },
    { filename: "Grande7.png", alt: "P. grande fronds" },
    { filename: "Grande10.jpg", alt: "P. grande mature" },
  ],
  hillii: [
    { filename: "Hillii1.jpg", alt: "P. hillii specimen" },
    { filename: "Dwg%20hillii.gif", alt: "Line drawing of P. hillii" },
    { filename: "Jimmie.jpg", alt: "P. hillii cv. Jimmie" },
    { filename: "Bloomei.jpg", alt: "P. hillii cv. Bloomei" },
    { filename: "Diversifolium.jpg", alt: "P. hillii cv. diversifolium" },
    { filename: "Panama.jpg", alt: "P. hillii Panama form" },
    { filename: "Panama3A.png", alt: "P. hillii Panama detail" },
    { filename: "HulaHands.jpg", alt: "P. hillii Hula Hands" },
    { filename: "HulaHands%20Fingers.png", alt: "P. hillii Hula Hands fingers" },
    { filename: "bloomei3.png", alt: "P. hillii Bloomei form" },
    { filename: "Hillii2.jpg", alt: "P. hillii mounted" },
    { filename: "Bloomei5.png", alt: "P. hillii Bloomei detail" },
    { filename: "Geni.png", alt: "P. hillii cv. Geni" },
    { filename: "Mayii.png", alt: "P. hillii cv. Mayii" },
    { filename: "SD%20hillii%20harrow%20form.jpg", alt: "P. hillii Harrow form" },
    { filename: "SD%20Hillii%20Spore%20Patch.jpg", alt: "P. hillii spore patch" },
  ],
  holttumii: [
    { filename: "HoltumiiFronds%20MalaysiaPlayceriun.jpg", alt: "P. holttumii in Malaysia" },
    { filename: "Holttumii,%20Facebook,%20.jpg", alt: "P. holttumii specimen" },
    { filename: "Holtumii%20%20from%20FB.jpg", alt: "P. holttumii fronds" },
  ],
  madagascariense: [
    { filename: "madagascariense.jpg", alt: "P. madagascariense specimen" },
    { filename: "Madagascarienes.png", alt: "P. madagascariense fronds" },
    { filename: "Madaga1.jpg", alt: "P. madagascariense detail" },
    { filename: "Madaga3.jpg", alt: "P. madagascariense shield" },
    { filename: "Madaga2.jpg", alt: "P. madagascariense pup" },
    { filename: "Madagascarienese1_small.png", alt: "P. madagascariense young" },
    { filename: "Erawan.png", alt: "P. erawan (suspected hybrid/sport)" },
  ],
  quadridichotomum: [
    { filename: "Quadridichotomum.png", alt: "P. quadridichotomum specimen" },
    { filename: "Dwg%20Quadridichotomum.gif", alt: "Line drawing of P. quadridichotomum" },
    { filename: "Quadridichotomum2.png", alt: "P. quadridichotomum detail" },
    { filename: "QuadridichotomumFacebook.png", alt: "P. quadridichotomum fronds" },
  ],
  ridleyi: [
    { filename: "Ridleyi5.png", alt: "P. ridleyi specimen" },
    { filename: "Dwg%20Ridleyi.gif", alt: "Line drawing of P. ridleyi" },
    { filename: "Ridley2.jpg", alt: "P. ridleyi mounted" },
    { filename: "Ridleyi%20Watercolor.png", alt: "P. ridleyi watercolor illustration" },
    { filename: "Ridleyii%20Wide%20Fronds.jpg", alt: "P. ridleyi wide fronds" },
    { filename: "Ridleyii%20Wide%20Fronds%202.jpg", alt: "P. ridleyi wide fronds detail" },
  ],
  stemaria: [
    { filename: "Stemaria4.png", alt: "P. stemaria specimen" },
    { filename: "Dwg%20Stemaria.gif", alt: "Line drawing of P. stemaria" },
    { filename: "stamaria2.png", alt: "P. stemaria fronds" },
    { filename: "Stemaria3.png", alt: "P. stemaria shield" },
    { filename: "Stemria%20spore.png", alt: "P. stemaria spore patch" },
    { filename: "Stemar1.png", alt: "P. stemaria mounted" },
    { filename: "Stemar2.png", alt: "P. stemaria detail" },
    { filename: "Stemria%20Laurentii.png", alt: "P. stemaria cv. Laurentii" },
    { filename: "Stemria%20Hawkes.png", alt: "P. stemaria cv. Hawke" },
    { filename: "Stemaria%20Three.png", alt: "P. stemaria group" },
    { filename: "Stemaria%20'Hawk'.png", alt: "P. stemaria Hawk form" },
    { filename: "Stemaria%20Bud%20Hair.png", alt: "P. stemaria bud hair" },
  ],
  superbum: [
    { filename: "Superbum4.png", alt: "P. superbum specimen" },
    { filename: "Dwg%20Superbum.gif", alt: "Line drawing of P. superbum" },
    { filename: "superb3.png", alt: "P. superbum fronds" },
    { filename: "superb4.png", alt: "P. superbum detail" },
    { filename: "Superb1.jpg", alt: "P. superbum mounted" },
    { filename: "Superb2.jpg", alt: "P. superbum shield" },
    { filename: "Superb3.jpg", alt: "P. superbum in garden" },
    { filename: "Superb4.jpg", alt: "P. superbum mature" },
    { filename: "Superb5.jpg", alt: "P. superbum large" },
    { filename: "Superb6.jpg", alt: "P. superbum outdoor" },
    { filename: "Cabage.png", alt: "P. superbum 'Cabbage' form" },
    { filename: "CabbageDwarf3.jpg", alt: "P. superbum dwarf cabbage" },
    { filename: "CabbageDwarf.png", alt: "P. superbum dwarf cabbage detail" },
  ],
  veitchii: [
    { filename: "Veitch1.jpg", alt: "P. veitchii specimen" },
    { filename: "Dwg%20Veitchii.gif", alt: "Line drawing of P. veitchii" },
    { filename: "Veitch2.jpg", alt: "P. veitchii silver form" },
    { filename: "Veitch3.jpg", alt: "P. veitchii fronds" },
    { filename: "Veitch13.jpg", alt: "P. veitchii mature" },
    { filename: "Lemoinei.png", alt: "P. veitchii 'Lemoinei'" },
    { filename: "Veitchii%20Japanese%20Hybrid.png", alt: "P. veitchii Japanese Hybrid" },
    { filename: "Veitchii%20Japanese%20Hybrid%202.png", alt: "P. veitchii Japanese Hybrid detail" },
    { filename: "Veitchii%20'Pulimum'.png", alt: "P. veitchii 'Pulimum'" },
    { filename: "Veitchii%20'Silver%20Frond'.png", alt: "P. veitchii 'Silver Frond'" },
    { filename: "Veitchii%20Mt%20Stuart%20form%20Q'land%20AU.png", alt: "P. veitchii Mt Stuart form" },
    { filename: "Veitchii1.png", alt: "P. veitchii vertical fronds" },
  ],
  wallichii: [
    { filename: "P1010037-1.jpg", alt: "P. wallichii specimen" },
    { filename: "Dwg%20Wallichii.gif", alt: "Line drawing of P. wallichii" },
    { filename: "Wallichii%20Spore%20Patch.png", alt: "P. wallichii spore patch" },
  ],
  wandae: [
    { filename: "Wandae7.png", alt: "P. wandae specimen" },
    { filename: "Dwg%20Wandae.gif", alt: "Line drawing of P. wandae" },
    { filename: "Wandae%20Singapore.jpg", alt: "P. wandae at Gardens by the Bay" },
    { filename: "Wandae%20Frills%20Singapore.jpg", alt: "P. wandae frill detail" },
    { filename: "Wandae%20Spore%20Patch_A%20.png", alt: "P. wandae spore patch A" },
    { filename: "Wandae%20Spore%20Patch%20B%20.png", alt: "P. wandae spore patch B" },
    { filename: "Wandae.png", alt: "P. wandae mature" },
  ],
  willinckii: [
    { filename: "Willinckii%201.png", alt: "P. willinckii specimen" },
    { filename: "Dwg%20Willinckii.gif", alt: "Line drawing of P. willinckii" },
    { filename: "Willinckii%202.png", alt: "P. willinckii fronds" },
    { filename: "Weeks.jpg", alt: "P. willinckii cv. Weeks" },
    { filename: "Weeks%20spore.jpg", alt: "P. willinckii Weeks spore" },
    { filename: "Willincjii1.png", alt: "P. willinckii mounted" },
    { filename: "Willinckii2.png", alt: "P. willinckii detail" },
    { filename: "Willinckii3.png", alt: "P. willinckii shield" },
    { filename: "Willinckii4.png", alt: "P. willinckii fertile fronds" },
    { filename: "Little%20will.jpg", alt: "P. willinckii pup" },
    { filename: "Willin19.jpg", alt: "P. willinckii collection" },
    { filename: "Schofield.jpg", alt: "P. willinckii cv. Schofield" },
    { filename: "Willin1.jpg", alt: "P. willinckii mature" },
    { filename: "Willinckii%20FairchileTG.png", alt: "P. willinckii at Fairchild" },
    { filename: "Bloomei6.png", alt: "P. willinckii cv. Bloomei" },
    { filename: "Willinckii%20'Piti'.png", alt: "P. willinckii 'Piti'" },
    { filename: "MtLewis-Fernfactory.jpg", alt: "P. willinckii Mt Lewis" },
    { filename: "Willinckii%20King%20Goko.jpg", alt: "P. willinckii 'King Goko'" },
  ],
};
