export default function Gauge({
  value,
  max = 100,
  label,
  delta,
}: {
  value: number;
  max?: number;
  label: string;
  delta?: string;
}) {
  const pct = Math.min(1, Math.max(0, value / max));
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const arcLength = Math.PI * radius;
  const dashOffset = arcLength * (1 - pct);

  const angleDeg = 180 - pct * 180;
  const rad = (angleDeg * Math.PI) / 180;
  const needleX = cx + (radius - 10) * Math.cos(rad);
  const needleY = cy - (radius - 10) * Math.sin(rad);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 118" className="w-full max-w-[220px]">
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#262720"
          strokeWidth={12}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#D6FF3F"
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#F4F5EF" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={5} fill="#F4F5EF" />
        {delta && (
          <g>
            <rect x={needleX - 22} y={needleY - 30} width="44" height="20" rx="10" fill="#D6FF3F" />
            <text x={needleX} y={needleY - 16} textAnchor="middle" fontSize="11" fontWeight={600} fill="#17200A">
              {delta}
            </text>
          </g>
        )}
      </svg>
      <p className="-mt-2 font-mono text-2xl font-semibold text-text-primary">{value}</p>
      <p className="text-xs text-text-secondary">{label}</p>
    </div>
  );
}
