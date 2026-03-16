"use client";
import {
  ComposedChart, Area, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface RatingPoint {
  date: string;
  rating: number;
  leagueHigh?: number;
  leagueLow?: number;
}

function formatDate(dateStr: string) {
  const [, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}`;
}

export default function RedSoxRatingChart({ data }: { data: RatingPoint[] }) {
  if (!data || data.length === 0) {
    return <p className="text-mahogany/40 text-sm italic mt-4">No rating history available.</p>;
  }

  const formatted = data.map((d) => ({ ...d, label: formatDate(d.date) }));
  const lastIdx = formatted.length - 1;

  return (
    <div className="mt-6 p-4 rounded-xl border border-border bg-card">
      <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-4">ELO Rating History — 2025 Season</p>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={formatted} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d1d5db" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#d1d5db" stopOpacity={0.35} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#3B1F1A99" }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11, fill: "#3B1F1A99" }} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid #E8E0D8", borderRadius: 8, fontSize: 12 }}
            formatter={(v: unknown, name: unknown) => {
              const val = typeof v === "number" ? v.toFixed(1) : String(v);
              const label = name === "leagueHigh" ? "League High" : name === "leagueLow" ? "League Low" : "BOS ELO";
              return [val, label];
            }}
          />

          {/* Shaded band: fill leagueHigh down to baseline with gray, then mask with white up to leagueLow */}
          <Area
            type="natural"
            dataKey="leagueHigh"
            stroke="#9ca3af"
            strokeWidth={1}
            strokeDasharray="4 4"
            fill="url(#bandGrad)"
            dot={false}
            legendType="none"
            isAnimationActive={false}
          />
          <Area
            type="natural"
            dataKey="leagueLow"
            stroke="#9ca3af"
            strokeWidth={1}
            strokeDasharray="4 4"
            fill="#FFFFFF"
            dot={false}
            legendType="none"
            isAnimationActive={false}
          />

          {/* Main BOS line */}
          <Line
            type="natural"
            dataKey="rating"
            stroke="#bd3b3b"
            strokeWidth={2.5}
            dot={(props: any) => {
              if (props.index !== lastIdx) return <g key={props.index} />;
              return (
                <circle
                  key="end-dot"
                  cx={props.cx}
                  cy={props.cy}
                  r={5}
                  fill="white"
                  stroke="#bd3b3b"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 4, fill: "#bd3b3b" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
