export interface PokerSession {
  date: string;
  location: string;
  buyIn: number;
  cashOut: number;
  net: number;
  notes?: string;
}

export const sessions: PokerSession[] = [
  // Add sessions here
  // { date: "2025-01-15", location: "Home game", buyIn: 100, cashOut: 145, net: 45, notes: "Flopped a set, ran well." },
];

export const stats = {
  totalSessions: sessions.length,
  totalNet: sessions.reduce((sum, s) => sum + s.net, 0),
  biggestWin: sessions.length ? Math.max(...sessions.map((s) => s.net)) : 0,
  biggestLoss: sessions.length ? Math.min(...sessions.map((s) => s.net)) : 0,
  winRate: sessions.length ? sessions.filter((s) => s.net > 0).length / sessions.length : 0,
};
