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
    ],
  },
  {
    country: "Italy",
    isoCode: "ITA",
    cities: [
      { name: "Rome", coordinates: [12.5, 41.9] },
      { name: "Florence", coordinates: [11.25, 43.77] },
      { name: "Venice", coordinates: [12.32, 45.44] },
    ],
  },
  {
    country: "France",
    isoCode: "FRA",
    cities: [
      { name: "Paris", coordinates: [2.35, 48.85] },
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
];
