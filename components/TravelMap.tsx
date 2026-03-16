"use client";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { visited } from "@/data/travel";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO 3166-1 numeric codes for visited countries
const isoNumericMap: Record<string, number> = {
  USA: 840,
  ITA: 380,
  FRA: 250,
  ESP: 724,
  HRV: 191,
  GBR: 826,
  ISL: 352,
  IRL: 372,
};

const visitedNumeric = new Set(visited.map((d) => isoNumericMap[d.isoCode]).filter(Boolean));

const allCityPins = visited.flatMap((d) => d.cities ?? []);

export default function TravelMap() {
  return (
    <ComposableMap projectionConfig={{ scale: 140 }} className="w-full rounded-xl border border-border bg-card">
      <Geographies geography={GEO_URL}>
        {({ geographies }: { geographies: any[] }) =>
          geographies.map((geo: any) => {
            const isVisited = visitedNumeric.has(Number(geo.id));
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={isVisited ? "#7C3D2E" : "#E8E0D8"}
                stroke="#F8F5F0"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: isVisited ? "#3B1F1A" : "#d8cfc6" },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
      {allCityPins.map((city) => (
        <Marker key={city.name} coordinates={city.coordinates}>
          <circle r={3} fill="#F8F5F0" stroke="#3B1F1A" strokeWidth={1} />
          <title>{city.name}</title>
        </Marker>
      ))}
    </ComposableMap>
  );
}
