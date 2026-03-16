interface ChessRating {
  last: { rating: number; date: number };
  best: { rating: number; date: number };
}

interface ChessData {
  chess_rapid?: ChessRating;
  chess_blitz?: ChessRating;
  chess_bullet?: ChessRating;
}

export default function ChessStats({ data }: { data: ChessData }) {
  const formats = [
    { key: "chess_rapid" as const, label: "Rapid", emoji: "⏱️" },
    { key: "chess_blitz" as const, label: "Blitz", emoji: "⚡" },
    { key: "chess_bullet" as const, label: "Bullet", emoji: "🔫" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {formats.map(({ key, label, emoji }) => {
        const info = data[key];
        if (!info) return null;
        return (
          <div key={key} className="p-5 rounded-xl border border-border bg-card">
            <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-2">{emoji} {label}</p>
            <p className="text-3xl font-bold text-mahogany mb-1">{info.last.rating}</p>
            <p className="text-xs text-mahogany/50">Best: <span className="font-medium">{info.best.rating}</span></p>
          </div>
        );
      })}
    </div>
  );
}
