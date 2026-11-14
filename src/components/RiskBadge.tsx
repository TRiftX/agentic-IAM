import { riskColor, riskLabel } from "../lib/utils";
import type { RiskLevel } from "../types";

export default function RiskBadge({ level, score }: { level: RiskLevel; score?: number }) {
  const color = riskColor[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium font-mono"
      style={{ color, backgroundColor: `${color}1A`, border: `1px solid ${color}40` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
      {riskLabel[level]}
      {typeof score === "number" && <span className="opacity-70">{score}</span>}
    </span>
  );
}
