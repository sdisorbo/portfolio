// ─────────────────────────────────────────────────────────────
// Your Vivino cellar.
//
// Vivino has no public API and its pages are login-gated, so this
// can't be auto-scraped. Paste your reviews here by hand (or export
// them) and the Interests page will automatically feature a random
// red + white each day, seeded by the date so it rotates daily.
//
// To add a wine: copy an entry below and fill it in.
//   - image:   the bottle image URL from Vivino (right-click the
//              bottle → Copy Image Address), or a /public path.
//   - link:    the URL of that specific review/wine on Vivino.
//   - rating:  your rating, 0–5 (decimals allowed, e.g. 4.5).
//   - profile: a "structure" bar chart (0–100). Vivino shows these
//              as Light↔Bold, Smooth↔Tannic, Dry↔Sweet, Soft↔Acidic.
//   - notes:   the flavor tags Vivino lists (e.g. "Black Fruit").
// ─────────────────────────────────────────────────────────────

export type WineType = "red" | "white";

export interface FlavorAxis {
  /** left-hand label, e.g. "Light" */
  low: string;
  /** right-hand label, e.g. "Bold" */
  high: string;
  /** 0 = fully low, 100 = fully high */
  value: number;
}

export interface Wine {
  name: string;
  winery?: string;
  vintage?: string;
  region: string;
  country?: string;
  type: WineType;
  rating: number; // 0–5
  review?: string; // your written review
  notes: string[]; // flavor tags
  profile?: FlavorAxis[]; // structure bars
  image?: string; // bottle image URL or /public path
  link?: string; // link to this wine's Vivino review
}

// Your Vivino profile (the "see all my reviews" link).
export const VIVINO_PROFILE = "https://www.vivino.com/users/sam.disorbo";

// Replace these samples with your real Vivino reviews.
export const wines: Wine[] = [
  {
    name: "Brunello di Montalcino",
    winery: "Biondi-Santi",
    vintage: "2016",
    region: "Tuscany",
    country: "Italy",
    type: "red",
    rating: 4.6,
    review:
      "Structured and age-worthy — dried cherry, leather, and tobacco with a long, savory finish. A benchmark Sangiovese.",
    notes: ["Red Fruit", "Leather", "Tobacco", "Earth", "Oak"],
    profile: [
      { low: "Light", high: "Bold", value: 78 },
      { low: "Smooth", high: "Tannic", value: 72 },
      { low: "Dry", high: "Sweet", value: 12 },
      { low: "Soft", high: "Acidic", value: 68 },
    ],
    image:
      "https://images.vivino.com/thumbs/pEluUcuKQVOWWnbNqu6nzw_pb_x600.png",
    link: "https://www.vivino.com/users/sam.disorbo",
  },
  {
    name: "Barolo",
    winery: "Vietti Castiglione",
    vintage: "2018",
    region: "Piedmont",
    country: "Italy",
    type: "red",
    rating: 4.4,
    review:
      "Rose petal, tar, and red cherry. Firm tannins now but beautifully perfumed — classic Nebbiolo.",
    notes: ["Red Fruit", "Floral", "Tar", "Spices"],
    profile: [
      { low: "Light", high: "Bold", value: 74 },
      { low: "Smooth", high: "Tannic", value: 80 },
      { low: "Dry", high: "Sweet", value: 10 },
      { low: "Soft", high: "Acidic", value: 70 },
    ],
    image:
      "https://images.vivino.com/thumbs/goBhs5FUS_yUZ6Q9qBEXPg_pb_x600.png",
    link: "https://www.vivino.com/users/sam.disorbo",
  },
  {
    name: "Sancerre",
    winery: "Henri Bourgeois",
    vintage: "2022",
    region: "Loire Valley",
    country: "France",
    type: "white",
    rating: 4.2,
    review:
      "Crisp and mineral — grapefruit, cut grass, and wet stone. Razor-sharp acidity, textbook Sauvignon Blanc.",
    notes: ["Citrus", "Green Apple", "Mineral", "Herbal"],
    profile: [
      { low: "Light", high: "Bold", value: 32 },
      { low: "Smooth", high: "Tannic", value: 8 },
      { low: "Dry", high: "Sweet", value: 14 },
      { low: "Soft", high: "Acidic", value: 82 },
    ],
    image:
      "https://images.vivino.com/thumbs/1u_zTctBRHKp2Bn0_9lWDA_pb_x600.png",
    link: "https://www.vivino.com/users/sam.disorbo",
  },
  {
    name: "Chablis Premier Cru",
    winery: "William Fèvre",
    vintage: "2021",
    region: "Burgundy",
    country: "France",
    type: "white",
    rating: 4.5,
    review:
      "Lemon curd, oyster shell, and a touch of flint. Precise and saline with a long finish — everything Chardonnay should be.",
    notes: ["Citrus", "Mineral", "White Flowers", "Bread"],
    profile: [
      { low: "Light", high: "Bold", value: 46 },
      { low: "Smooth", high: "Tannic", value: 10 },
      { low: "Dry", high: "Sweet", value: 12 },
      { low: "Soft", high: "Acidic", value: 74 },
    ],
    image:
      "https://images.vivino.com/thumbs/YO7Ss5nLQiSSMbYh5vp0DA_pb_x600.png",
    link: "https://www.vivino.com/users/sam.disorbo",
  },
];
