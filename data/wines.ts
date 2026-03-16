export interface Wine {
  name: string;
  region: string;
  vintage: number;
  rating: 1 | 2 | 3 | 4 | 5;
  notes: string;
  date: string; // ISO date string
}

export const wines: Wine[] = [
  // Add entries here — e.g.:
  // { name: "Barolo Classico", region: "Piedmont, Italy", vintage: 2018, rating: 5, notes: "Exceptional depth, long finish.", date: "2024-11-12" },
];
