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
      "P. coronarium, P. ridleyi, and P. elephantotis are especially prone to overwatering — err dry.",
      "Water more in hot/dry weather, less in cool/cloudy. In winter, most species need very little.",
      "pH 5.5–6.0 is ideal. Hard well water is too alkaline. Rainwater or RO water is best.",
      "Rinse the frond surface occasionally to clear dust and mineral buildup.",
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
    ],
  },
  {
    id: "fertilizing",
    title: "Fertilizing",
    icon: "sprout",
    points: [
      "Every other month. More is not better — platyceriums are light feeders.",
      "Rotate fertilizer types. Slow-release tablets under the shields are low-risk.",
      "Test new fertilizers on a spare pup before treating older plants (per Roy Vail).",
    ],
  },
  {
    id: "pests",
    title: "Pests",
    icon: "bug",
    points: [
      "Common problems: scale, mealy bug, black stag fungus.",
      "Use insecticides carefully — exposed root systems make these plants chemical-sensitive.",
      "Isolate affected plants immediately. Infestations are usually further along than they look.",
      "Greenhouse environments are significantly easier to manage for pest control.",
    ],
  },
  {
    id: "environment",
    title: "Environment",
    icon: "sun",
    points: [
      "Bright, filtered light — not direct full sun. 63–73% shade cloth is standard.",
      "Exceptions: P. bifurcatum tolerates full sun. P. veitchii needs it.",
      "Humidity is non-negotiable. Misting, trays, or greenhouse enclosure for dry climates.",
      "Frost can kill. Bring outdoor plants inside if temps drop near freezing.",
      "Mount with airflow behind the root ball. Flat surfaces trap moisture and invite rot.",
    ],
  },
];
