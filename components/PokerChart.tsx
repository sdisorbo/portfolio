"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { PokerSession } from "@/data/poker";

export default function PokerChart({ sessions }: { sessions: PokerSession[] }) {
  if (sessions.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center rounded-xl border border-dashed border-border text-mahogany/30 text-sm">
        No sessions yet. The graph will get better. Probably.
      </div>
    );
  }

  let running = 0;
  const data = [
    { date: "Start", pnl: 0 },
    ...sessions.map((s) => {
      running += s.net;
      return { date: s.date, pnl: running };
    }),
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D8" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#3B1F1A99" }} />
        <YAxis tick={{ fontSize: 11, fill: "#3B1F1A99" }} tickFormatter={(v) => `$${v}`} />
        <Tooltip formatter={(v) => [`$${v}`, "P&L"]} contentStyle={{ borderRadius: 8, border: "1px solid #E8E0D8", fontSize: 12 }} />
        <ReferenceLine y={0} stroke="#3B1F1A44" strokeDasharray="4 4" />
        <Line type="monotone" dataKey="pnl" stroke="#7C3D2E" strokeWidth={2} dot={{ r: 4, fill: "#7C3D2E" }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
