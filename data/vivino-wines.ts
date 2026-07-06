// ─────────────────────────────────────────────────────────────
// My wine ratings (imported from my winealytics spreadsheet).
// The Interests page features a random red + white each day,
// seeded by the date so it rotates daily. Each links to a Vivino
// search for that bottle.
// ─────────────────────────────────────────────────────────────

export type WineType = "red" | "white" | "rose";

export interface Wine {
  winery: string;
  varietal: string;
  region: string;
  type: WineType;
  vintage?: string;
  rating: number; // 0–5
  sparkling?: boolean;
  link: string; // Vivino search for this wine
}

// My Vivino profile.
export const VIVINO_PROFILE = "https://www.vivino.com/users/sam.disorbo";

export const wines: Wine[] = [
  { winery: "Toasted Head", varietal: "Merlot", region: "California", type: "red", vintage: "2017", rating: 1.6, link: "https://www.vivino.com/search/wines?q=Toasted+Head+Merlot" },
  { winery: "Woodbridge", varietal: "Merlot", region: "California", type: "red", vintage: "2014", rating: 3.6, link: "https://www.vivino.com/search/wines?q=Woodbridge+Merlot" },
  { winery: "California Traditions", varietal: "Chardonnay", region: "California", type: "white", rating: 2.9, link: "https://www.vivino.com/search/wines?q=California+Traditions+Chardonnay" },
  { winery: "Jacob's Creek", varietal: "Cabernet Sauvignon", region: "Austrailia", type: "red", vintage: "2022", rating: 3.8, link: "https://www.vivino.com/search/wines?q=Jacob%27s+Creek+Cabernet+Sauvignon" },
  { winery: "Dark Horse", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2021", rating: 2.1, link: "https://www.vivino.com/search/wines?q=Dark+Horse+Pinot+Noir" },
  { winery: "Josh", varietal: "Zinfandel", region: "California", type: "red", vintage: "2022", rating: 2.4, link: "https://www.vivino.com/search/wines?q=Josh+Zinfandel" },
  { winery: "50 Provinces", varietal: "Red Blend", region: "Spain", type: "red", vintage: "2022", rating: 2.5, link: "https://www.vivino.com/search/wines?q=50+Provinces+Red+Blend" },
  { winery: "Gabbiano", varietal: "Chianti", region: "Italy", type: "red", vintage: "2021", rating: 3.8, link: "https://www.vivino.com/search/wines?q=Gabbiano+Chianti" },
  { winery: "Campo Viejo", varietal: "Rioja", region: "Spain", type: "red", vintage: "2017", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Campo+Viejo+Rioja" },
  { winery: "Low Fog", varietal: "Chardonnay", region: "California", type: "white", vintage: "2022", rating: 4.3, link: "https://www.vivino.com/search/wines?q=Low+Fog+Chardonnay" },
  { winery: "Kiaora", varietal: "Sauvignon Blanc", region: "New Zealand", type: "white", vintage: "2021", rating: 1.1, link: "https://www.vivino.com/search/wines?q=Kiaora+Sauvignon+Blanc" },
  { winery: "Apertus", varietal: "Bordeaux", region: "France", type: "red", vintage: "2021", rating: 2.9, link: "https://www.vivino.com/search/wines?q=Apertus+Bordeaux" },
  { winery: "St. Julian", varietal: "Cotton Candy", region: "United States", type: "rose", rating: 2.0, link: "https://www.vivino.com/search/wines?q=St.+Julian+Cotton+Candy" },
  { winery: "Hectare", varietal: "Cabernet Sauvignon", region: "United States", type: "red", rating: 1.6, link: "https://www.vivino.com/search/wines?q=Hectare+Cabernet+Sauvignon" },
  { winery: "Aura Kutral", varietal: "Sauvignon Blanc", region: "Chile", type: "white", vintage: "2021", rating: 2.6, link: "https://www.vivino.com/search/wines?q=Aura+Kutral+Sauvignon+Blanc" },
  { winery: "Honoro Vera", varietal: "Rioja", region: "Spain", type: "red", vintage: "2020", rating: 3.8, link: "https://www.vivino.com/search/wines?q=Honoro+Vera+Rioja" },
  { winery: "St. Chateau Michelle", varietal: "Riesling", region: "Washington", type: "white", vintage: "2022", rating: 3.7, link: "https://www.vivino.com/search/wines?q=St.+Chateau+Michelle+Riesling" },
  { winery: "Belvino", varietal: "Prosecco", region: "Italy", type: "white", rating: 3.2, sparkling: true, link: "https://www.vivino.com/search/wines?q=Belvino+Prosecco" },
  { winery: "Leyda", varietal: "Pinot Noir", region: "Chile", type: "red", vintage: "2021", rating: 3.9, link: "https://www.vivino.com/search/wines?q=Leyda+Pinot+Noir" },
  { winery: "Dr. Loosen", varietal: "Riesling", region: "Germany", type: "white", vintage: "2022", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Dr.+Loosen+Riesling" },
  { winery: "Montresor", varietal: "Soave", region: "Italy", type: "white", vintage: "2022", rating: 3.1, link: "https://www.vivino.com/search/wines?q=Montresor+Soave" },
  { winery: "Monsanto", varietal: "Chianti", region: "Italy", type: "red", vintage: "2019", rating: 4.1, link: "https://www.vivino.com/search/wines?q=Monsanto+Chianti" },
  { winery: "Alma", varietal: "White Blend", region: "Spain", type: "white", rating: 3.6, link: "https://www.vivino.com/search/wines?q=Alma+White+Blend" },
  { winery: "Antano", varietal: "Rioja", region: "Spain", type: "red", vintage: "2018", rating: 2.5, link: "https://www.vivino.com/search/wines?q=Antano+Rioja" },
  { winery: "Vega Madrono", varietal: "Rioja", region: "Spain", type: "red", rating: 2.7, link: "https://www.vivino.com/search/wines?q=Vega+Madrono+Rioja" },
  { winery: "Merayo", varietal: "Mencia", region: "Spain", type: "red", vintage: "2022", rating: 4.5, link: "https://www.vivino.com/search/wines?q=Merayo+Mencia" },
  { winery: "Lan", varietal: "Rioja", region: "Spain", type: "red", vintage: "2015", rating: 3.5, link: "https://www.vivino.com/search/wines?q=Lan+Rioja" },
  { winery: "Marques de Caceres", varietal: "Rioja", region: "Spain", type: "red", vintage: "2018", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Marques+de+Caceres+Rioja" },
  { winery: "Bar Dog", varietal: "Pinot Grigio", region: "California", type: "white", vintage: "2022", rating: 2.9, link: "https://www.vivino.com/search/wines?q=Bar+Dog+Pinot+Grigio" },
  { winery: "Clos du Bois", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2019", rating: 3.8, link: "https://www.vivino.com/search/wines?q=Clos+du+Bois+Pinot+Noir" },
  { winery: "Chateau de Costis", varietal: "Bordeaux", region: "France", type: "red", vintage: "2019", rating: 2.2, link: "https://www.vivino.com/search/wines?q=Chateau+de+Costis+Bordeaux" },
  { winery: "Schmitt Sohne", varietal: "Riesling", region: "Germany", type: "white", vintage: "2022", rating: 2.7, link: "https://www.vivino.com/search/wines?q=Schmitt+Sohne+Riesling" },
  { winery: "Lapis Luna", varietal: "Cabernet Sauvignon", region: "California", type: "red", vintage: "2021", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Lapis+Luna+Cabernet+Sauvignon" },
  { winery: "The Collection", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2021", rating: 4.5, link: "https://www.vivino.com/search/wines?q=The+Collection+Pinot+Noir" },
  { winery: "Domaine", varietal: "Malbec", region: "Argentina", type: "red", vintage: "2022", rating: 2.2, link: "https://www.vivino.com/search/wines?q=Domaine+Malbec" },
  { winery: "Giardino", varietal: "Pinot Grigio", region: "Italy", type: "white", rating: 2.9, link: "https://www.vivino.com/search/wines?q=Giardino+Pinot+Grigio" },
  { winery: "Jean-Luc Colombo", varietal: "Rose", region: "France", type: "red", vintage: "2022", rating: 3.8, link: "https://www.vivino.com/search/wines?q=Jean-Luc+Colombo+Rose" },
  { winery: "Franciscan", varietal: "Cabernet Sauvignon", region: "California", type: "red", vintage: "2021", rating: 1.6, link: "https://www.vivino.com/search/wines?q=Franciscan+Cabernet+Sauvignon" },
  { winery: "Lan", varietal: "Rioja", region: "Spain", type: "red", vintage: "2017", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Lan+Rioja" },
  { winery: "Agua de Piedra", varietal: "Malbec", region: "Argentina", type: "red", vintage: "2021", rating: 2.6, link: "https://www.vivino.com/search/wines?q=Agua+de+Piedra+Malbec" },
  { winery: "Cabriz", varietal: "Port", region: "Portugal", type: "red", vintage: "2019", rating: 3.9, link: "https://www.vivino.com/search/wines?q=Cabriz+Port" },
  { winery: "Apothic Red", varietal: "Red Blend", region: "California", type: "red", rating: 1.8, link: "https://www.vivino.com/search/wines?q=Apothic+Red+Red+Blend" },
  { winery: "Yealands", varietal: "Pinot Noir", region: "New Jersey", type: "red", rating: 3.1, link: "https://www.vivino.com/search/wines?q=Yealands+Pinot+Noir" },
  { winery: "Channings Daughters", varietal: "White Blend", region: "Hamptons", type: "white", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Channings+Daughters+White+Blend" },
  { winery: "Channings Daughters", varietal: "Rosato Syrah", region: "Hamptons", type: "rose", rating: 3.7, link: "https://www.vivino.com/search/wines?q=Channings+Daughters+Rosato+Syrah" },
  { winery: "Channings Daughters", varietal: "Moscato", region: "Hamptons", type: "white", rating: 3.1, link: "https://www.vivino.com/search/wines?q=Channings+Daughters+Moscato" },
  { winery: "Wolffer Estate", varietal: "Rose", region: "Hamptons", type: "rose", vintage: "2023", rating: 3.9, link: "https://www.vivino.com/search/wines?q=Wolffer+Estate+Rose" },
  { winery: "Wolffer Estate", varietal: "Pinot Noir", region: "Hamptons", type: "red", vintage: "2021", rating: 4.3, link: "https://www.vivino.com/search/wines?q=Wolffer+Estate+Pinot+Noir" },
  { winery: "Sparkling Pointe", varietal: "Sparkling Rouge", region: "Hamptons", type: "red", vintage: "2020", rating: 4.1, sparkling: true, link: "https://www.vivino.com/search/wines?q=Sparkling+Pointe+Sparkling+Rouge" },
  { winery: "Duck Walk", varietal: "Cabernet Sauvignon", region: "Hamptons", type: "red", rating: 3.5, link: "https://www.vivino.com/search/wines?q=Duck+Walk+Cabernet+Sauvignon" },
  { winery: "Meadowlark", varietal: "Cabernet Franc", region: "Hamptons", type: "red", rating: 4.3, link: "https://www.vivino.com/search/wines?q=Meadowlark+Cabernet+Franc" },
  { winery: "Meadowlark", varietal: "Red Blend", region: "Hamptons", type: "red", rating: 4.3, link: "https://www.vivino.com/search/wines?q=Meadowlark+Red+Blend" },
  { winery: "Barbera D'Alba", varietal: "Red Blend", region: "Italy", type: "red", vintage: "2021", rating: 4.2, link: "https://www.vivino.com/search/wines?q=Barbera+D%27Alba+Red+Blend" },
  { winery: "Muller Thurgaua", varietal: "Pinot Grigio", region: "New Zealand", type: "white", vintage: "2022", rating: 2.8, link: "https://www.vivino.com/search/wines?q=Muller+Thurgaua+Pinot+Grigio" },
  { winery: "Mirassou", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2021", rating: 3.5, link: "https://www.vivino.com/search/wines?q=Mirassou+Pinot+Noir" },
  { winery: "Piquepoul Noir", varietal: "Red Blend", region: "California", type: "red", vintage: "2017", rating: 4.1, link: "https://www.vivino.com/search/wines?q=Piquepoul+Noir+Red+Blend" },
  { winery: "DOCG", varietal: "Chianti", region: "Italy", type: "red", vintage: "2014", rating: 4.5, link: "https://www.vivino.com/search/wines?q=DOCG+Chianti" },
  { winery: "The Pinot Project", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2021", rating: 2.1, link: "https://www.vivino.com/search/wines?q=The+Pinot+Project+Pinot+Noir" },
  { winery: "Indaba", varietal: "Chardonnay", region: "South Africa", type: "white", vintage: "2022", rating: 1.8, link: "https://www.vivino.com/search/wines?q=Indaba+Chardonnay" },
  { winery: "Aplanta", varietal: "Red Blend", region: "Portugal", type: "red", rating: 3.1, link: "https://www.vivino.com/search/wines?q=Aplanta+Red+Blend" },
  { winery: "Bogle", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2022", rating: 1.9, link: "https://www.vivino.com/search/wines?q=Bogle+Pinot+Noir" },
  { winery: "Rickshaw", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2021", rating: 2.5, link: "https://www.vivino.com/search/wines?q=Rickshaw+Pinot+Noir" },
  { winery: "OTWC", varietal: "Pinot Noir", region: "Oregon", type: "red", vintage: "2021", rating: 2.5, link: "https://www.vivino.com/search/wines?q=OTWC+Pinot+Noir" },
  { winery: "La Crema", varietal: "Chardonnay", region: "California", type: "white", vintage: "2022", rating: 2.8, link: "https://www.vivino.com/search/wines?q=La+Crema+Chardonnay" },
  { winery: "Ryan Patrick", varietal: "Chardonnay", region: "Washington", type: "white", vintage: "2021", rating: 4.1, link: "https://www.vivino.com/search/wines?q=Ryan+Patrick+Chardonnay" },
  { winery: "Duck Pond", varietal: "Pinot Noir", region: "Oregon", type: "red", vintage: "2021", rating: 2.9, link: "https://www.vivino.com/search/wines?q=Duck+Pond+Pinot+Noir" },
  { winery: "Herederos Del Marques de Riscal", varietal: "Rioja", region: "Spain", type: "red", vintage: "2019", rating: 2.9, link: "https://www.vivino.com/search/wines?q=Herederos+Del+Marques+de+Riscal+Rioja" },
  { winery: "Milbrandt", varietal: "Zinfandel", region: "Washington", type: "red", vintage: "2022", rating: 2.4, link: "https://www.vivino.com/search/wines?q=Milbrandt+Zinfandel" },
  { winery: "Bully Hill", varietal: "Red Blend", region: "California", type: "red", vintage: "2022", rating: 2.2, link: "https://www.vivino.com/search/wines?q=Bully+Hill+Red+Blend" },
  { winery: "Canoe Ridge", varietal: "Cabernet Sauvignon", region: "California", type: "red", vintage: "2021", rating: 0.5, link: "https://www.vivino.com/search/wines?q=Canoe+Ridge+Cabernet+Sauvignon" },
  { winery: "Farmhouse", varietal: "Red Blend", region: "California", type: "red", vintage: "2021", rating: 2.5, link: "https://www.vivino.com/search/wines?q=Farmhouse+Red+Blend" },
  { winery: "Sparkling Pointe", varietal: "Champagne", region: "Hamptons", type: "white", vintage: "2019", rating: 2.4, sparkling: true, link: "https://www.vivino.com/search/wines?q=Sparkling+Pointe+Champagne" },
  { winery: "Dreaming Tree", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2021", rating: 3.2, link: "https://www.vivino.com/search/wines?q=Dreaming+Tree+Pinot+Noir" },
  { winery: "Cotes Du Rhone", varietal: "Red Blend", region: "France", type: "red", vintage: "2018", rating: 2.8, link: "https://www.vivino.com/search/wines?q=Cotes+Du+Rhone+Red+Blend" },
  { winery: "Casale Mattia", varietal: "Prosecco", region: "Italy", type: "white", rating: 3.1, sparkling: true, link: "https://www.vivino.com/search/wines?q=Casale+Mattia+Prosecco" },
  { winery: "Crane Lake", varietal: "Pinot Noir", region: "California", type: "red", vintage: "2016", rating: 2.9, link: "https://www.vivino.com/search/wines?q=Crane+Lake+Pinot+Noir" },
  { winery: "Campo Viejo", varietal: "Rioja", region: "Spain", type: "red", vintage: "2021", rating: 2.2, link: "https://www.vivino.com/search/wines?q=Campo+Viejo+Rioja" },
  { winery: "Woodbridge", varietal: "Cabernet Sauvignon", region: "California", type: "red", vintage: "2022", rating: 2.1, link: "https://www.vivino.com/search/wines?q=Woodbridge+Cabernet+Sauvignon" },
  { winery: "Mezzacorona", varietal: "Chardonnay", region: "Italy", type: "white", vintage: "2022", rating: 2.7, link: "https://www.vivino.com/search/wines?q=Mezzacorona+Chardonnay" },
  { winery: "Mawby", varietal: "Sparking Red", region: "Michigan", type: "red", rating: 0.4, sparkling: true, link: "https://www.vivino.com/search/wines?q=Mawby+Sparking+Red" },
];
