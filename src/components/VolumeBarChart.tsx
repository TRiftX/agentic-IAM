import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

export default function VolumeBarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxIdx = data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0);
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 24, right: 4, left: 4, bottom: 0 }}>
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#5C5D54", fontSize: 11, fontFamily: "JetBrains Mono" }}
        />
        <Tooltip
          cursor={{ fill: "#D6FF3F0D" }}
          contentStyle={{
            background: "#141511",
            border: "1px solid #262720",
            borderRadius: 6,
            fontSize: 12,
            color: "#F4F5EF",
          }}
          labelStyle={{ color: "#9B9C92" }}
        />
        <Bar dataKey="value" radius={[4, 4, 4, 4]} maxBarSize={28}>
          {data.map((_, i) => (
            <Cell key={i} fill={i === maxIdx ? "#D6FF3F" : "#2A2C22"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
