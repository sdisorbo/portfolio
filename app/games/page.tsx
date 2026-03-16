import ChessStats from "@/components/ChessStats";
import ChessRatingChart, { RatingEntry } from "@/components/ChessRatingChart";
import RedSoxRatingChart, { RatingPoint } from "@/components/RedSoxRatingChart";

const CHESS_USER = "samdisorbo";
const HEADERS = { "User-Agent": "portfolio-site" };
const MLB_BASE = "https://raw.githubusercontent.com/sdisorbo/samalytics-mlb/master/data/output";

// ── Chess ──────────────────────────────────────────────────

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
    const archivesRes = await fetch(`https://api.chess.com/pub/player/${CHESS_USER}/games/archives`, {
      next: { revalidate: 86400 },
      headers: HEADERS,
    });
    const { archives } = await archivesRes.json();
    if (!archives?.length) return [];

    const recentArchives: string[] = archives;

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

// ── Red Sox / MLB ──────────────────────────────────────────

interface StandingEntry {
  team: string;
  team_abbr: string;
  division: string;
  elo_rating: number;
  elo_change_7d: number;
  wins: number;
  losses: number;
  run_diff: number;
  playoff_probability: number;
  win_ds: number;
  win_cs: number;
  win_ws: number;
}

interface PlayoffOddsEntry {
  team: string;
  win_wildcard?: number;
  win_ds: number;
  win_cs: number;
  win_ws: number;
}

async function getRedSoxStanding(): Promise<(StandingEntry & { rank: number }) | null> {
  try {
    const res = await fetch(`${MLB_BASE}/standings.json`, { next: { revalidate: 3600 } });
    const data: StandingEntry[] = await res.json();
    const bos = data.find((t) => t.team_abbr === "BOS");
    if (!bos) return null;
    const rank = [...data].sort((a, b) => b.elo_rating - a.elo_rating).findIndex((t) => t.team_abbr === "BOS") + 1;
    return { ...bos, rank };
  } catch {
    return null;
  }
}

async function getRedSoxRatingHistory(): Promise<RatingPoint[]> {
  try {
    const res = await fetch(`${MLB_BASE}/team_ratings_history.json`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data["BOS"] as RatingPoint[]) ?? [];
  } catch {
    return [];
  }
}

async function getRedSoxPlayoffOdds(): Promise<PlayoffOddsEntry | null> {
  try {
    const res = await fetch(`${MLB_BASE}/playoff_odds.json`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return (data.results as PlayoffOddsEntry[])?.find((t) => t.team === "BOS") ?? null;
  } catch {
    return null;
  }
}

function pct(val: number | undefined) {
  if (val == null) return "—";
  return `${Math.round(val * 100)}%`;
}

function sign(n: number) {
  return n >= 0 ? `+${n.toFixed(1)}` : n.toFixed(1);
}

// ── Page ───────────────────────────────────────────────────

export default async function Games() {
  const [chessData, ratingHistory, bosStanding, bosHistory, bosOdds] = await Promise.all([
    getChessStats(),
    getChessRatingHistory(),
    getRedSoxStanding(),
    getRedSoxRatingHistory(),
    getRedSoxPlayoffOdds(),
  ]);

  const lastUpdated = new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
      <h1 className="text-4xl font-bold tracking-tight">Games</h1>

      {/* MLB */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">⚾ MLB Prediction Engine</h2>
        <p className="text-mahogany/70 text-sm leading-relaxed mb-6">
          I was a massive FiveThirtyEight sports analytics fan — it&apos;s what got me into sports analytics and
          programming in general. Since the sports pages have since been suspended, I thought I&apos;d do my best to
          recreate their work. Below find the live rating for my team, the Boston Red Sox.
        </p>

        {bosStanding ? (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              <div className="p-5 rounded-xl border border-border bg-card">
                <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-2">ELO Rating</p>
                <p className="text-3xl font-bold text-mahogany">{Math.round(bosStanding.elo_rating)}</p>
                <p className="text-xs text-mahogany/50 mt-1">
                  7d: <span className={bosStanding.elo_change_7d >= 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {sign(bosStanding.elo_change_7d)}
                  </span>
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-2">League Rank</p>
                <p className="text-3xl font-bold text-mahogany">#{bosStanding.rank}</p>
                <p className="text-xs text-mahogany/50 mt-1">of 30 teams</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-2">Record</p>
                <p className="text-3xl font-bold text-mahogany">{bosStanding.wins}–{bosStanding.losses}</p>
                <p className="text-xs text-mahogany/50 mt-1">Run diff: {bosStanding.run_diff > 0 ? `+${bosStanding.run_diff}` : bosStanding.run_diff}</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-2">Playoff Odds</p>
                <p className="text-3xl font-bold text-mahogany">{pct(bosStanding.playoff_probability)}</p>
                <p className="text-xs text-mahogany/50 mt-1">make playoffs</p>
              </div>
            </div>

            {/* Playoff round odds */}
            {bosOdds && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-1">Win Div. Series</p>
                  <p className="text-2xl font-semibold text-mahogany">{pct(bosOdds.win_ds)}</p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-1">Win Ch. Series</p>
                  <p className="text-2xl font-semibold text-mahogany">{pct(bosOdds.win_cs)}</p>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-1">Win World Series</p>
                  <p className="text-2xl font-semibold text-mahogany">{pct(bosOdds.win_ws)}</p>
                </div>
              </div>
            )}

            <RedSoxRatingChart data={bosHistory} />
          </>
        ) : (
          <p className="text-mahogany/40 text-sm italic">MLB data unavailable — check back during the season.</p>
        )}

        <p className="mt-4 text-xs text-mahogany/40">
          Powered by my{" "}
          <a href="https://samalytics-mlb.vercel.app/standings" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">
            MLB Prediction Engine
          </a>
          {" "}— ELO ratings &amp; playoff odds updated daily.
        </p>
      </section>

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
