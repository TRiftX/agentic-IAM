import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

export default function BreakdownChart({
  data,
}: {
  data: { i: number; risk: number; trust: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 24, right: 4, left: 4, bottom: 4 }}>
        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
        <Line type="monotone" dataKey="trust" stroke="#F4F5EF" strokeWidth={1.75} dot={false} />
        <Line type="monotone" dataKey="risk" stroke="#D6FF3F" strokeWidth={2.25} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
