import { Wine } from "@/data/wines";

export default function WineCard({ name, region, vintage, rating, notes, date }: Wine) {
  return (
    <div className="p-5 rounded-xl border border-border bg-card hover:border-accent hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-mahogany">{name}</h3>
        <span className="text-sm text-mahogany/50">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
      </div>
      <p className="text-xs text-mahogany/50 mb-2">{region} · {vintage} · {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</p>
      <p className="text-sm text-mahogany/70 leading-relaxed">{notes}</p>
    </div>
  );
}
