export interface CityPin {
  name: string;
  coordinates: [number, number]; // [longitude, latitude] — react-simple-maps convention
}

export interface Destination {
  country: string;
  isoCode: string; // ISO 3166-1 alpha-3
  cities?: CityPin[];
  notes?: string;
}

export const visited: Destination[] = [
  {
    country: "United States",
    isoCode: "USA",
    cities: [
      { name: "Boston", coordinates: [-71.06, 42.36] },
      { name: "New York", coordinates: [-74.01, 40.71] },
      { name: "Los Angeles", coordinates: [-118.24, 34.05] },
      { name: "San Francisco", coordinates: [-122.42, 37.77] },
      { name: "Ann Arbor", coordinates: [-83.74, 42.28] },
      { name: "Orlando", coordinates: [-81.38, 28.54] },
      { name: "Detroit", coordinates: [-83.05, 42.33] },
      { name: "Nashville", coordinates: [-86.78, 36.16] },
      { name: "Charlotte", coordinates: [-80.84, 35.23] },
    ],
  },
  {
    country: "Italy",
    isoCode: "ITA",
    cities: [
      { name: "Rome", coordinates: [12.5, 41.9] },
      { name: "Florence", coordinates: [11.25, 43.77] },
      { name: "Venice", coordinates: [12.32, 45.44] },
      { name: "Naples", coordinates: [14.27, 40.85] },
    ],
  },
  {
    country: "France",
    isoCode: "FRA",
    cities: [
      { name: "Paris", coordinates: [2.35, 48.85] },
      { name: "Normandy", coordinates: [-0.36, 49.18] },
    ],
  },
  {
    country: "Spain",
    isoCode: "ESP",
    cities: [
      { name: "Madrid", coordinates: [-3.70, 40.42] },
      { name: "Barcelona", coordinates: [2.15, 41.39] },
      { name: "Pamplona", coordinates: [-1.64, 42.82] },
    ],
  },
  {
    country: "Croatia",
    isoCode: "HRV",
    cities: [
      { name: "Split", coordinates: [16.44, 43.51] },
    ],
  },
  {
    country: "United Kingdom",
    isoCode: "GBR",
    cities: [
      { name: "London", coordinates: [-0.13, 51.51] },
    ],
  },
  {
    country: "Iceland",
    isoCode: "ISL",
    cities: [
      { name: "Reykjavik", coordinates: [-21.82, 64.13] },
    ],
  },
  {
    country: "Ireland",
    isoCode: "IRL",
    cities: [
      { name: "Dublin", coordinates: [-6.27, 53.35] },
    ],
  },
  {
    country: "Norway",
    isoCode: "NOR",
    cities: [
      { name: "Oslo", coordinates: [10.75, 59.91] },
      { name: "Bergen", coordinates: [5.32, 60.39] },
    ],
  },
  {
    country: "Portugal",
    isoCode: "PRT",
    cities: [
      { name: "Lisbon", coordinates: [-9.14, 38.72] },
      { name: "Porto", coordinates: [-8.61, 41.15] },
      { name: "São Miguel, Azores", coordinates: [-25.5, 37.78] },
    ],
  },
];
