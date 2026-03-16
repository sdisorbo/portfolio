"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export interface RatingEntry {
  date: string;
  rapid?: number;
  blitz?: number;
  bullet?: number;
}

export default function ChessRatingChart({ data }: { data: RatingEntry[] }) {
  if (data.length === 0) {
    return (
      <p className="text-mahogany/40 text-sm italic mt-4">
        No rating history available yet.
      </p>
    );
  }

  return (
    <div className="mt-6 p-4 rounded-xl border border-border bg-card">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#3B1F1A99" }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11, fill: "#3B1F1A99" }} domain={["auto", "auto"]} />
          <Tooltip
            contentStyle={{ background: "#fff", border: "1px solid #E8E0D8", borderRadius: 8, fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="rapid" name="Rapid" stroke="#7C3D2E" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="blitz" name="Blitz" stroke="#3B1F1A" strokeWidth={2} dot={false} connectNulls />
          <Line type="monotone" dataKey="bullet" name="Bullet" stroke="#b87a6a" strokeWidth={2} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
