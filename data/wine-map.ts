// ─────────────────────────────────────────────────────────────
// Wine map configuration.
//
// `wineCountries` are highlighted on the world map and are clickable.
// For countries with `regionTopoUrl`, clicking does a hazy zoom into a
// region-level map (Wine Folly style). Add more detailed countries by
// giving them a `regionTopoUrl` + a `projection` centered on them.
//
// `visitedRegions` / notes / photos can also be edited live from the
// admin panel (scroll to the bottom of the home page).
// ─────────────────────────────────────────────────────────────

export interface RegionNote {
  /** region name as it appears in that country's topojson */
  region: string;
  visited?: boolean;
  note?: string;
  photos?: string[]; // /public paths or committed uploads
}

export interface WineCountry {
  name: string;
  isoNumeric: number; // matches world-atlas country id
  blurb?: string;
  /** topojson of that country's regions for the drill-down view */
  regionTopoUrl?: string;
  /** projection for the region view, centered on the country */
  projection?: { center: [number, number]; scale: number };
  regions?: RegionNote[];
}

// world-atlas @2 numeric country ids
export const wineCountries: WineCountry[] = [
  {
    name: "Italy",
    isoNumeric: 380,
    blurb: "Sangiovese, Nebbiolo, and 350+ native grapes across 20 regions.",
    regionTopoUrl:
      "https://raw.githubusercontent.com/openpolis/geojson-italy/master/topojson/limits_IT_regions.topo.json",
    projection: { center: [12.5, 42], scale: 2200 },
    regions: [
      { region: "Toscana", visited: true, note: "Chianti + Brunello country." },
      { region: "Piemonte", visited: true, note: "Barolo & Barbaresco." },
    ],
  },
  {
    name: "France",
    isoNumeric: 250,
    blurb: "Bordeaux, Burgundy, Champagne, the Rhône, the Loire.",
    projection: { center: [2.5, 46.5], scale: 2200 },
    regions: [],
  },
  {
    name: "Spain",
    isoNumeric: 724,
    blurb: "Tempranillo in Rioja & Ribera del Duero, Cava in Catalonia.",
    projection: { center: [-3.7, 40], scale: 2000 },
    regions: [],
  },
  {
    name: "United States",
    isoNumeric: 840,
    blurb: "Napa, Sonoma, Willamette, and the Finger Lakes.",
    projection: { center: [-98, 39], scale: 700 },
    regions: [],
  },
  {
    name: "Portugal",
    isoNumeric: 620,
    blurb: "Port from the Douro; whites from Vinho Verde.",
    projection: { center: [-8, 39.5], scale: 3200 },
    regions: [],
  },
  {
    name: "Argentina",
    isoNumeric: 32,
    blurb: "Malbec from high-altitude Mendoza.",
    projection: { center: [-65, -35], scale: 700 },
    regions: [],
  },
  {
    name: "Chile",
    isoNumeric: 152,
    blurb: "Cabernet & Carménère from the Central Valley.",
    projection: { center: [-71, -35], scale: 900 },
    regions: [],
  },
];

export const WORLD_TOPO =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// A soft palette used to color regions in the drill-down view.
export const REGION_PALETTE = [
  "#7C3D2E", "#B5533F", "#C9814B", "#9C6B3F", "#8FA05A",
  "#5A8F7B", "#4E7A99", "#7A5A99", "#B0567F", "#C97B92",
  "#6B8E23", "#A0522D", "#CD853F", "#5F9EA0", "#8B5A83",
  "#D2691E", "#708238", "#996633", "#4682B4", "#9932CC",
];
