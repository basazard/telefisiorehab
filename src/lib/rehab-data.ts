export const weekly = [
  { d: "Mon", reps: 32, compliance: 78, minutes: 16 },
  { d: "Tue", reps: 28, compliance: 72, minutes: 13 },
  { d: "Wed", reps: 41, compliance: 88, minutes: 19 },
  { d: "Thu", reps: 36, compliance: 84, minutes: 17 },
  { d: "Fri", reps: 45, compliance: 92, minutes: 21 },
  { d: "Sat", reps: 30, compliance: 70, minutes: 12 },
  { d: "Sun", reps: 48, compliance: 95, minutes: 23 },
];

export const rom = [
  { w: "W1", v: 42 },
  { w: "W2", v: 50 },
  { w: "W3", v: 58 },
  { w: "W4", v: 65 },
  { w: "W5", v: 72 },
  { w: "W6", v: 80 },
];

export const strength = [
  { w: "W1", v: 38 },
  { w: "W2", v: 44 },
  { w: "W3", v: 49 },
  { w: "W4", v: 57 },
  { w: "W5", v: 63 },
  { w: "W6", v: 71 },
];

export const patients = [
  {
    name: "Bagus Besar Bagaskara",
    cond: "Post-ACL knee",
    compliance: 87,
    score: 7.8,
    last: "Today",
  },
  { name: "Marcus Holt", cond: "Rotator cuff", compliance: 64, score: 6.2, last: "Yesterday" },
  { name: "Priya Shah", cond: "Lower-back pain", compliance: 92, score: 8.4, last: "Today" },
  { name: "Jonas Weber", cond: "Hip replacement", compliance: 71, score: 6.9, last: "2 days ago" },
  { name: "Sofia Rossi", cond: "Ankle sprain", compliance: 95, score: 9.0, last: "Today" },
];

export const scoreData = [
  { m: "Jan", v: 5.2 },
  { m: "Feb", v: 5.8 },
  { m: "Mar", v: 6.5 },
  { m: "Apr", v: 6.9 },
  { m: "May", v: 7.4 },
  { m: "Jun", v: 7.8 },
];

export const sessions = [
  { p: "Sofia Rossi", e: "Ankle mobility · 12 min", c: 98, d: "Today, 09:12" },
  { p: "Bagus Besar Bagaskara", e: "Quad strengthening · 18 min", c: 87, d: "Today, 08:30" },
  { p: "Priya Shah", e: "Core stability · 22 min", c: 92, d: "Yesterday, 18:05" },
  { p: "Marcus Holt", e: "Shoulder ROM · 15 min", c: 64, d: "Yesterday, 10:40" },
  { p: "Jonas Weber", e: "Hip abduction · 14 min", c: 71, d: "2 days ago, 09:00" },
  { p: "Sofia Rossi", e: "Balance training · 10 min", c: 96, d: "3 days ago, 08:20" },
];

export const chartAxis = "oklch(0.50 0.03 210)";
export const chartGrid = "oklch(0.90 0.02 195)";
export const chartPrimary = "oklch(0.58 0.11 195)";
export const chartAccent = "oklch(0.72 0.13 165)";
export const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
};
