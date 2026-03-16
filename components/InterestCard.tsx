interface InterestCardProps {
  title: string;
  description: string;
  mysterious?: boolean;
}

export default function InterestCard({ title, description, mysterious = false }: InterestCardProps) {
  return (
    <div
      className={`p-6 rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-[1.01] ${
        mysterious
          ? "border-mahogany/30 bg-mahogany text-offwhite"
          : "border-border bg-card hover:border-accent"
      }`}
    >
      <h3 className={`font-semibold text-lg mb-2 ${mysterious ? "text-offwhite" : "text-mahogany"}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${mysterious ? "text-offwhite/60" : "text-mahogany/60"}`}>
        {description}
      </p>
      {mysterious && (
        <p className="mt-3 text-xs text-offwhite/30 italic">More soon.</p>
      )}
    </div>
  );
}
