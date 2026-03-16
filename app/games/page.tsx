import ChessStats from "@/components/ChessStats";
import ChessRatingChart, { RatingEntry } from "@/components/ChessRatingChart";

const CHESS_USER = "samdisorbo";
const HEADERS = { "User-Agent": "portfolio-site" };

async function getChessStats() {
  try {
    const res = await fetch(`https://api.chess.com/pub/player/${CHESS_USER}/stats`, {
      next: { revalidate: 3600 },
      headers: HEADERS,
    });
    return res.json();
  } catch {
    return {};
  }
}

async function getChessRatingHistory(): Promise<RatingEntry[]> {
  try {
    // 1. Fetch list of monthly archives
    const archivesRes = await fetch(`https://api.chess.com/pub/player/${CHESS_USER}/games/archives`, {
      next: { revalidate: 86400 },
      headers: HEADERS,
    });
    const { archives } = await archivesRes.json();
    if (!archives?.length) return [];

    const recentArchives: string[] = archives;

    // 3. Fetch each month's games in parallel
    const monthly = await Promise.all(
      recentArchives.map(async (url: string) => {
        const parts = url.split("/");
        const year = parts[parts.length - 2];
        const month = parts[parts.length - 1];
        const date = `${year}-${month}`;

        try {
          const gamesRes = await fetch(url, {
            next: { revalidate: 86400 },
            headers: HEADERS,
          });
          const { games } = await gamesRes.json();
          if (!games?.length) return { date };

          // Find the last game played per time control
          const lastByControl: Record<string, { rating: number }> = {};
          for (const game of games) {
            const tc: string = game.time_class;
            if (!["rapid", "blitz", "bullet"].includes(tc)) continue;
            const isWhite = game.white.username.toLowerCase() === CHESS_USER.toLowerCase();
            const rating: number = isWhite ? game.white.rating : game.black.rating;
            lastByControl[tc] = { rating };
          }

          const entry: RatingEntry = { date };
          if (lastByControl.rapid)  entry.rapid  = lastByControl.rapid.rating;
          if (lastByControl.blitz)  entry.blitz  = lastByControl.blitz.rating;
          if (lastByControl.bullet) entry.bullet = lastByControl.bullet.rating;
          return entry;
        } catch {
          return { date };
        }
      })
    );

    return monthly.filter((e) => e.rapid || e.blitz || e.bullet);
  } catch {
    return [];
  }
}

export default async function Games() {
  const [chessData, ratingHistory] = await Promise.all([getChessStats(), getChessRatingHistory()]);
  const lastUpdated = new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      <h1 className="text-4xl font-bold tracking-tight">Games</h1>

      {/* Chess */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-2xl font-semibold">♟️ Chess</h2>
          <span className="text-xs text-mahogany/40">Last updated: {lastUpdated}</span>
        </div>
        <p className="text-mahogany/70 text-sm leading-relaxed mb-6">
          I am an avid chess player, despite my low rating. Follow me in my journey to becoming a better player.
          My 2026 goal is to reach 1200 in blitz.
        </p>
        <ChessStats data={chessData} />
        <ChessRatingChart data={ratingHistory} />
        <p className="mt-4 text-xs text-mahogany/40">
          Live data from{" "}
          <a href={`https://www.chess.com/member/${CHESS_USER}`} target="_blank" className="hover:text-accent underline">
            chess.com/member/{CHESS_USER}
          </a>
        </p>
      </section>
    </div>
  );
}
