"use client";
import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import {
  wineCountries,
  WineCountry,
  RegionNote,
  WORLD_TOPO,
  REGION_PALETTE,
} from "@/data/wine-map";
import annotationsData from "@/data/wine-annotations.json";

const annotations = (annotationsData as {
  regions: Record<string, Record<string, RegionNote>>;
}).regions;

// Merge static region notes with admin-committed annotations for a country.
function mergedRegions(c: WineCountry | null): RegionNote[] {
  if (!c) return [];
  const map: Record<string, RegionNote> = {};
  for (const r of c.regions ?? []) map[r.region.toLowerCase()] = { ...r };
  const extra = annotations?.[c.name] ?? {};
  for (const [name, a] of Object.entries(extra)) {
    const base = map[name.toLowerCase()] ?? {};
    map[name.toLowerCase()] = { ...base, ...a, region: name };
  }
  return Object.values(map);
}

const byNumeric: Record<number, WineCountry> = {};
wineCountries.forEach((c) => (byNumeric[c.isoNumeric] = c));
const wineSet = new Set(wineCountries.map((c) => c.isoNumeric));

function regionName(geo: any): string {
  const p = geo.properties || {};
  return (
    p.reg_name || p.name || p.NAME || p.NAME_1 || p.Name || p.region || "—"
  );
}

export default function WineMap() {
  const [active, setActive] = useState<WineCountry | null>(null);
  const [hazing, setHazing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = useMemo(() => mergedRegions(active), [active]);

  const visitedRegionSet = useMemo(
    () =>
      new Set(
        regions.filter((r) => r.visited).map((r) => r.region.toLowerCase())
      ),
    [regions]
  );

  // Hazy cloud transition, then swap views.
  function enterCountry(c: WineCountry) {
    setHazing(true);
    setSelectedRegion(null);
    window.setTimeout(() => {
      setActive(c);
      // let the new map mount under the haze, then clear it
      window.setTimeout(() => setHazing(false), 220);
    }, 380);
  }

  function backToWorld() {
    setHazing(true);
    window.setTimeout(() => {
      setActive(null);
      setSelectedRegion(null);
      window.setTimeout(() => setHazing(false), 220);
    }, 380);
  }

  const activeRegionNote =
    regions.find(
      (r) => r.region.toLowerCase() === selectedRegion?.toLowerCase()
    ) ?? null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-[#eef3f6] to-[#dfe8ec]">
      {/* Header bar */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2">
        {active ? (
          <button
            onClick={backToWorld}
            className="rounded-md border border-border bg-card/90 px-3 py-1 text-xs font-medium text-mahogany backdrop-blur hover:border-accent"
          >
            ← World
          </button>
        ) : (
          <span className="rounded-md border border-border bg-card/80 px-3 py-1 text-[11px] uppercase tracking-widest text-mahogany/50 backdrop-blur">
            Wine map · click a highlighted country
          </span>
        )}
        {active && (
          <span className="rounded-md border border-border bg-card/90 px-3 py-1 text-xs font-semibold text-mahogany backdrop-blur">
            {active.name}
          </span>
        )}
      </div>

      {/* Map */}
      <div className="aspect-[16/10] w-full">
        {!active ? (
          <ComposableMap
            projection="geoEqualEarth"
            projectionConfig={{ scale: 155 }}
            className="h-full w-full"
          >
            <ZoomableGroup center={[10, 30]} zoom={1} minZoom={1} maxZoom={5}>
              <Geographies geography={WORLD_TOPO}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => {
                    const isWine = wineSet.has(Number(geo.id));
                    const c = byNumeric[Number(geo.id)];
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={isWine && c ? () => enterCountry(c) : undefined}
                        fill={isWine ? "#7C3D2E" : "#E8E0D8"}
                        stroke="#F8F5F0"
                        strokeWidth={0.5}
                        style={{
                          default: {
                            outline: "none",
                            cursor: isWine ? "pointer" : "default",
                          },
                          hover: {
                            outline: "none",
                            fill: isWine ? "#9C4A37" : "#ded5cb",
                          },
                          pressed: { outline: "none", fill: "#5a2b20" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        ) : active.regionTopoUrl ? (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: active.projection?.center ?? [0, 0],
              scale: active.projection?.scale ?? 1000,
            }}
            className="h-full w-full"
          >
            <Geographies geography={active.regionTopoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo, i) => {
                  const name = regionName(geo);
                  const isVisited = visitedRegionSet.has(name.toLowerCase());
                  const isSel =
                    selectedRegion?.toLowerCase() === name.toLowerCase();
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => setSelectedRegion(name)}
                      fill={REGION_PALETTE[i % REGION_PALETTE.length]}
                      stroke={isVisited || isSel ? "#3B1F1A" : "#FFFFFF"}
                      strokeWidth={isVisited || isSel ? 2 : 0.6}
                      style={{
                        default: { outline: "none", cursor: "pointer", opacity: 0.9 },
                        hover: { outline: "none", opacity: 1 },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        ) : (
          // Country with no region topojson yet — zoom the world map onto it.
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              center: active.projection?.center ?? [0, 0],
              scale: active.projection?.scale ?? 800,
            }}
            className="h-full w-full"
          >
            <Geographies geography={WORLD_TOPO}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => {
                  const isActive = Number(geo.id) === active.isoNumeric;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={isActive ? "#7C3D2E" : "#E8E0D8"}
                      stroke="#F8F5F0"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        )}
      </div>

      {/* Info footer / region detail */}
      <div className="border-t border-border bg-card/70 px-4 py-3 backdrop-blur">
        {!active ? (
          <p className="text-xs text-mahogany/50">
            {wineCountries.length} wine countries highlighted. Region-level
            breakdowns available for{" "}
            {wineCountries.filter((c) => c.regionTopoUrl).map((c) => c.name).join(", ")}.
          </p>
        ) : activeRegionNote ? (
          <div>
            <p className="text-sm font-semibold text-mahogany">
              {activeRegionNote.region}
              {activeRegionNote.visited && (
                <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                  Visited
                </span>
              )}
            </p>
            {activeRegionNote.note && (
              <p className="mt-1 text-xs text-mahogany/60">{activeRegionNote.note}</p>
            )}
            {activeRegionNote.photos && activeRegionNote.photos.length > 0 && (
              <div className="mt-2 flex gap-2 overflow-x-auto">
                {activeRegionNote.photos.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={activeRegionNote.region}
                    className="h-16 w-auto rounded-md border border-border object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-mahogany/60">
            {active.blurb}{" "}
            {active.regionTopoUrl
              ? "Click a region to see notes."
              : "Region-level detail coming soon."}
          </p>
        )}
      </div>

      {/* Hazy cloud overlay */}
      <div
        className={`pointer-events-none absolute inset-0 z-30 transition-opacity duration-500 ${
          hazing ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.95), rgba(240,244,247,0.85) 60%, rgba(223,232,236,0.9))",
          backdropFilter: hazing ? "blur(10px)" : "blur(0px)",
        }}
      />
    </div>
  );
}
