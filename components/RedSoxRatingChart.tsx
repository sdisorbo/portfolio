"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export interface RatingPoint {
  date: string;
  rating: number;
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

  return (
    <div className="mt-6 p-4 rounded-xl border border-border bg-card">
      <p className="text-xs uppercase tracking-widest text-mahogany/40 mb-4">ELO Rating History — 2025 Season</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={formatted} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#3B1F1A99" }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11, fill: "#3B1F1A99" }} domain={["auto", "auto"]} />
          <ReferenceLine y={1500} stroke="#E8E0D8" strokeDasharray="4 4" label={{ value: "avg", fontSize: 10, fill: "#3B1F1A55" }} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid #E8E0D8", borderRadius: 8, fontSize: 12 }}
            formatter={(v: unknown) => typeof v === "number" ? v.toFixed(1) : String(v)}
          />
          <Line type="monotone" dataKey="rating" name="ELO" stroke="#bd3b3b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
