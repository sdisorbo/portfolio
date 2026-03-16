export interface Restaurant {
  name: string;
  city: string;
  country: string;
  rating: 1 | 2 | 3 | 4 | 5;
  notes: string;
  date: string;
}

export const restaurants: Restaurant[] = [
  // Add entries here
];
