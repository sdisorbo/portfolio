import { visited } from "@/data/travel";
import { redRecs, whiteRecs, dessertRecs } from "@/data/wine-recs";
import TravelMap from "@/components/TravelMap";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        const pct = partial ? Math.round((rating - (star - 1)) * 100) : 0;
        return (
          <span key={star} className="relative inline-block text-base leading-none">
            <span className="text-mahogany/20">★</span>
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden text-accent"
                style={{ width: filled ? "100%" : `${pct}%` }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
      <span className="text-xs text-mahogany/40 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function WineRecList({ recs }: { recs: { name: string; region: string; rating?: number; notes?: string; link?: string }[] }) {
  if (recs.length === 0) {
    return <p className="text-mahogany/40 text-sm italic">Recommendations coming soon.</p>;
  }
  return (
    <ul className="space-y-3">
      {recs.map((w) => {
        const Wrapper = w.link ? "a" : "div";
        const props = w.link ? { href: w.link, target: "_blank", rel: "noopener noreferrer" } : {};
        return (
          <li key={w.name}>
            <Wrapper
              {...(props as any)}
              className="block p-4 rounded-xl border border-border bg-card hover:border-accent hover:shadow-sm transition-all"
            >
              <p className="font-medium text-mahogany">{w.name} {w.link && "→"}</p>
              <p className="text-sm text-mahogany/50">{w.region}</p>
              {w.rating !== undefined && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-mahogany/40">My Rating:</span>
                  <StarRating rating={w.rating} />
                </div>
              )}
              {w.notes && <p className="text-sm text-mahogany/60 mt-1 italic">{w.notes}</p>}
            </Wrapper>
          </li>
        );
      })}
    </ul>
  );
}

export default function Interests() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      <h1 className="text-4xl font-bold tracking-tight">Interests</h1>

      {/* Travel */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">✈️ Travel</h2>
        <TravelMap />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {visited.map((d) => (
            <div key={d.isoCode} className="p-4 rounded-xl border border-border bg-card">
              <p className="font-medium text-mahogany">{d.country}</p>
              {d.cities && (
                <p className="text-sm text-mahogany/50 mt-0.5">
                  {d.cities.map((c) => c.name).join(", ")}
                </p>
              )}
              {d.notes && <p className="text-sm text-mahogany/60 mt-1 italic">{d.notes}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Wine Recs */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">🍷 Wine Recommendations</h2>
        <p className="text-xs text-mahogany/40 mb-8 italic">A curated list of bottles worth seeking out</p>

        <div className="space-y-10">
          <div>
            <h3 className="font-medium text-lg mb-4">Red</h3>
            <WineRecList recs={redRecs} />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">White</h3>
            <WineRecList recs={whiteRecs} />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-4">Dessert</h3>
            <WineRecList recs={dessertRecs} />
          </div>
        </div>
      </section>
    </div>
  );
}
