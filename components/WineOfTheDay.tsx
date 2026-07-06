import { wines, VIVINO_PROFILE, Wine } from "@/data/vivino-wines";

// Deterministic daily index: same for everyone on a given day, rotates daily.
function dailyPick(list: Wine[], salt: number): Wine | null {
  if (list.length === 0) return null;
  const day = Math.floor(Date.now() / 86_400_000); // days since epoch (UTC)
  return list[(day + salt) % list.length];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" title={`${rating.toFixed(1)} / 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        const p = partial ? Math.round((rating - (star - 1)) * 100) : 0;
        return (
          <span key={star} className="relative inline-block text-lg leading-none">
            <span className="text-mahogany/20">★</span>
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden text-accent"
                style={{ width: filled ? "100%" : `${p}%` }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
      <span className="text-sm font-medium text-mahogany/60 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function FlavorBars({ wine }: { wine: Wine }) {
  if (!wine.profile?.length) return null;
  return (
    <div className="space-y-2.5">
      {wine.profile.map((ax) => (
        <div key={ax.low} className="flex items-center gap-2 text-[11px]">
          <span className="w-14 text-right text-mahogany/50">{ax.low}</span>
          <div className="relative h-1.5 flex-1 rounded-full bg-offwhite border border-border">
            <span
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-sm"
              style={{ left: `${ax.value}%` }}
            />
          </div>
          <span className="w-14 text-mahogany/50">{ax.high}</span>
        </div>
      ))}
    </div>
  );
}

function WineFeatureCard({ wine, label }: { wine: Wine; label: string }) {
  const dot = wine.type === "red" ? "bg-[#7C3D2E]" : "bg-[#C9B458]";
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm sm:flex-row">
      {/* Bottle */}
      <div className="flex w-full items-center justify-center sm:w-28 sm:shrink-0">
        {wine.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={wine.image}
            alt={wine.name}
            className="h-44 w-auto object-contain sm:h-48"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center rounded-lg bg-gradient-to-b from-offwhite to-border text-4xl">
            🍷
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
          <span className="text-[10px] font-mono uppercase tracking-widest text-mahogany/40">
            {label}
          </span>
        </div>

        <div>
          <h3 className="font-semibold leading-tight text-mahogany">
            {wine.name}
            {wine.vintage ? ` ${wine.vintage}` : ""}
          </h3>
          <p className="text-xs text-mahogany/50">
            {[wine.winery, wine.region, wine.country].filter(Boolean).join(" · ")}
          </p>
        </div>

        <Stars rating={wine.rating} />

        {wine.review && (
          <p className="text-sm leading-relaxed text-mahogany/70 italic">“{wine.review}”</p>
        )}

        {wine.notes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {wine.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-border bg-offwhite px-2 py-0.5 text-[11px] text-mahogany/60"
              >
                {n}
              </span>
            ))}
          </div>
        )}

        <FlavorBars wine={wine} />

        {wine.link && (
          <a
            href={wine.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto w-fit text-xs font-medium text-accent hover:underline"
          >
            View review on Vivino →
          </a>
        )}
      </div>
    </div>
  );
}

export default function WineOfTheDay() {
  const red = dailyPick(
    wines.filter((w) => w.type === "red"),
    0
  );
  const white = dailyPick(
    wines.filter((w) => w.type === "white"),
    1
  );

  return (
    <div>
      <div className="mb-4 flex items-baseline justify-between">
        <p className="text-xs uppercase tracking-widest text-mahogany/40">
          Today&apos;s pours · one red, one white
        </p>
        <a
          href={VIVINO_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-accent hover:underline"
        >
          My Vivino profile →
        </a>
      </div>

      {red || white ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {red && <WineFeatureCard wine={red} label="Red of the day" />}
          {white && <WineFeatureCard wine={white} label="White of the day" />}
        </div>
      ) : (
        <p className="text-sm italic text-mahogany/40">
          No wines yet — add reviews in data/vivino-wines.ts.
        </p>
      )}
    </div>
  );
}
