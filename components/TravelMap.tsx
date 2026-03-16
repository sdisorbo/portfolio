"use client";
import { useState, useRef, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { visited, Destination } from "@/data/travel";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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

const numericToDestination: Record<number, Destination> = {};
visited.forEach((d) => {
  const num = isoNumericMap[d.isoCode];
  if (num) numericToDestination[num] = d;
});

const visitedNumeric = new Set(visited.map((d) => isoNumericMap[d.isoCode]).filter(Boolean));
const allCityPins = visited.flatMap((d) => d.cities ?? []);

interface PopupState {
  x: number;
  y: number;
  destination: Destination;
}

export default function TravelMap() {
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const [popup, setPopup] = useState<PopupState | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCountryClick = useCallback((geo: any, evt: React.MouseEvent) => {
    const dest = numericToDestination[Number(geo.id)];
    if (!dest) return;
    evt.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rawX = evt.clientX - rect.left;
    const rawY = evt.clientY - rect.top;

    // Clamp popup within container bounds
    const popupW = 220;
    const popupH = 110;
    const x = rawX + popupW + 16 > rect.width ? rawX - popupW - 4 : rawX + 12;
    const y = rawY + popupH + 16 > rect.height ? rawY - popupH - 4 : rawY + 12;

    setPopup({ x, y, destination: dest });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl border border-border bg-card overflow-hidden"
      onClick={() => setPopup(null)}
    >
      {/* Zoom buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(z * 1.5, 10)); }}
          className="w-7 h-7 rounded bg-card border border-border text-mahogany hover:bg-accent/10 font-bold text-base flex items-center justify-center select-none"
          aria-label="Zoom in"
        >+</button>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(z / 1.5, 1)); }}
          className="w-7 h-7 rounded bg-card border border-border text-mahogany hover:bg-accent/10 font-bold text-base flex items-center justify-center select-none"
          aria-label="Zoom out"
        >−</button>
      </div>

      <ComposableMap projectionConfig={{ scale: 140 }} className="w-full">
        <ZoomableGroup
          zoom={zoom}
          center={center}
          onMoveEnd={({ zoom: z, coordinates }: { zoom: number; coordinates: [number, number] }) => {
            setZoom(z);
            setCenter(coordinates);
          }}
        >
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
                      default: { outline: "none", cursor: isVisited ? "pointer" : "default" },
                      hover: { outline: "none", fill: isVisited ? "#5a2b20" : "#d8cfc6", cursor: isVisited ? "pointer" : "default" },
                      pressed: { outline: "none" },
                    }}
                    onClick={isVisited ? (evt: React.MouseEvent) => handleCountryClick(geo, evt) : undefined}
                  />
                );
              })
            }
          </Geographies>
          {allCityPins.map((city) => (
            <Marker key={city.name} coordinates={city.coordinates}>
              <circle r={3} fill="#F8F5F0" stroke="#3B1F1A" strokeWidth={1} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Popup */}
      {popup && (
        <div
          className="absolute z-20 bg-card border border-border rounded-xl shadow-lg p-4 w-52 pointer-events-auto"
          style={{ left: popup.x, top: popup.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-mahogany/40 hover:text-mahogany text-xs leading-none"
            onClick={() => setPopup(null)}
            aria-label="Close"
          >✕</button>
          <p className="font-semibold text-mahogany pr-4">{popup.destination.country}</p>
          {popup.destination.cities && popup.destination.cities.length > 0 && (
            <p className="text-sm text-mahogany/60 mt-1">
              {popup.destination.cities.map((c) => c.name).join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
