export type FernSociety = {
  name: string;
  websiteUrl?: string;
  facebookName?: string;
  region: string;
  websiteStatus: "working" | "broken" | "none";
};

export const fernSocieties: FernSociety[] = [
  {
    name: "American Fern Society",
    websiteUrl: "https://amerfernsoc.org",
    facebookName: "American Fern Society",
    region: "United States",
    websiteStatus: "working",
  },
  {
    name: "British Pteridological Society",
    facebookName: "British Pteridological Society",
    region: "United Kingdom",
    websiteStatus: "broken",
  },
  {
    name: "Delaware Valley Fern & Wildflower Society",
    region: "United States",
    websiteStatus: "broken",
  },
  {
    name: "Hardy Fern Foundation",
    websiteUrl: "https://hardyferns.org",
    facebookName: "Hardy Fern Foundation",
    region: "United States",
    websiteStatus: "working",
  },
  {
    name: "Los Angeles International Fern Society",
    websiteUrl: "https://laifs.org",
    facebookName: "Los Angeles Int Fern Society",
    region: "United States",
    websiteStatus: "working",
  },
  {
    name: "Malaysia Platycerium Society (MPS)",
    facebookName: "Malaysia Platycerium Society (MPS)",
    region: "Malaysia",
    websiteStatus: "none",
  },
  {
    name: "New York Fern Society",
    websiteUrl: "https://hort.net",
    region: "United States",
    websiteStatus: "working",
  },
  {
    name: "San Diego Fern Society",
    websiteUrl: "https://sandiegofernsociety.com",
    facebookName: "San Diego Fern Society",
    region: "United States",
    websiteStatus: "working",
  },
  {
    name: "San Francisco Bay Area Fern Society",
    facebookName: "San Francisco Bay Area Fern Society",
    region: "United States",
    websiteStatus: "none",
  },
  {
    name: "San Francisco Fern Society",
    facebookName: "San Francisco Fern Society",
    region: "United States",
    websiteStatus: "broken",
  },
  {
    name: "Sarasota Fern Society",
    facebookName: "Sarasota Fern Society",
    region: "United States",
    websiteStatus: "broken",
  },
  {
    name: "Fern Society Southern Africa",
    facebookName: "Fern Society Southern Africa",
    region: "South Africa",
    websiteStatus: "broken",
  },
  {
    name: "Texas Gulf Coast Fern Society",
    facebookName: "Texas Gulf Coast Fern Society",
    region: "United States",
    websiteStatus: "broken",
  },
  {
    name: "Tropical Fern & Exotic Plant Society",
    websiteUrl: "https://tfeps.org",
    facebookName: "Tropical Fern and Exotic Plant Society",
    region: "United States",
    websiteStatus: "working",
  },
  {
    name: "Western Australia Fern Society",
    facebookName: "Western Australia Fern Society",
    region: "Australia",
    websiteStatus: "broken",
  },
];

export type Book = {
  title: string;
  author: string;
  description: string;
  searchUrl: string;
  pdfUrl?: string;
  featured?: boolean;
};

function googleSearch(title: string, author: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(`${title} ${author}`)}`;
}

export const books: Book[] = [
  {
    title: "Platycerium Hobbyist's Handbook",
    author: "Roy Vail",
    description:
      "The essential reference for Platycerium keepers. Roy Vail's handbook is widely cited across the community and remains one of the most detailed practical guides ever written for the genus. A free PDF is available.",
    searchUrl: googleSearch("Platycerium Hobbyist's Handbook", "Roy Vail"),
    pdfUrl:
      "https://zabel.com.au/russell-zabel-platycerium-ferns/wp-content/uploads/2020/07/Platycerium-Hobbyists-Handbook.pdf",
    featured: true,
  },
  {
    title: "Platycerium: The Fascinating Staghorn Fern",
    author: "Patra Sangdanuch",
    description:
      "A modern, highly visual guide covering species, hybrids, and conservation. 2025 revised edition.",
    searchUrl: googleSearch(
      "Platycerium The Fascinating Staghorn Fern",
      "Patra Sangdanuch",
    ),
  },
  {
    title: "Growing Staghorns: A Guide to Growing Platycerium Species from Spore",
    author: "Wayne Boyce",
    description: "A practical guide focused on growing ferns from spores.",
    searchUrl: googleSearch(
      "Growing Staghorns A Guide to Growing Platycerium Species from Spore",
      "Wayne Boyce",
    ),
  },
  {
    title: "Platyceriums: Growing the Staghorn Ferns",
    author: "Don Callard",
    description: "Covers care, cultivation, and species identification.",
    searchUrl: googleSearch(
      "Platyceriums Growing the Staghorn Ferns",
      "Don Callard",
    ),
  },
  {
    title: "Platycerium Fern Facts",
    author: "Wendy Franks",
    description:
      "Detailed descriptions and black-and-white photos of various species. A historical reference.",
    searchUrl: googleSearch("Platycerium Fern Facts", "Wendy Franks"),
  },
  {
    title: "A Monograph of the Fern Genus Platycerium",
    author: "E. Hennipman",
    description:
      "A comprehensive scientific and botanical study of the genus Platycerium.",
    searchUrl: googleSearch(
      "A Monograph of the Fern Genus Platycerium",
      "E. Hennipman",
    ),
  },
  {
    title: "How To Grow Platycerium For One Year Guidebook",
    author: "NHK Bizarre Plants Cultivation",
    description: "A specialized, step-by-step growing guide from Japan.",
    searchUrl: googleSearch(
      "How To Grow Platycerium For One Year Guidebook",
      "NHK Bizarre Plants",
    ),
  },
  {
    title: "King of the Ferns: The Australian Staghorn Fern Experience",
    author: "",
    description:
      "A celebration of staghorn ferns in the Australian growing context.",
    searchUrl: googleSearch(
      "King of the Ferns The Australian Staghorn Fern Experience",
      "",
    ),
  },
];
