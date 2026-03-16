export interface WineRec {
  name: string;
  region: string;
  rating?: number; // out of 5
  notes?: string;
  link?: string;
}

export const redRecs: WineRec[] = [
  { name: "The Prisoner Red Blend", region: "Napa Valley, California", rating: 4.3, link: "https://www.vivino.com/en/the-prisoner-red-blend-california/w/7069?year=2021&price_id=37864885" },
  { name: "Justin 2021 Cabernet Sauvignon", region: "Paso Robles, California", rating: 4.1, link: "https://www.vivino.com/en/us-justin-cabernet-sauvignon/w/3462?ref=nav-search" },
];

export const whiteRecs: WineRec[] = [
  { name: "Gazela Vinho Verde", region: "Minho, Portugal", rating: 3.8, notes: "Cheap but reliable.", link: "https://www.vivino.com/en/gazela-vinho-verde-branco/w/1166569?year=2024&price_id=40264564" },
];

export const dessertRecs: WineRec[] = [
  { name: "Graham's 10 Year Tawny Port", region: "Douro, Portugal", rating: 4.2, link: "https://www.vivino.com/en/w-j-graham-s-ten-year-old-tawny-port/w/1145628?price_id=27058725" },
];
