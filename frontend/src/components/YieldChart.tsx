import { memo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { YieldCurve } from "../hooks/useFetchYields";

type FlattenedRate = { date: string } & Record<string, string>;

export const flattenYields = (yieldCurves: YieldCurve[]) => {
  const flattenedData = yieldCurves[0].rates.map((rate, index) => {
    const result: FlattenedRate = { date: rate.date };

    yieldCurves.forEach((curve) => {
      result[curve.term.name] = curve.rates[index]?.rate;
    });

    return result;
  });

  return flattenedData;
};

const strokeColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A8",
  "#FFBD33",
  "#33FFF5",
  "#FF3333",
  "#8D33FF",
  "#FF8C33",
  "#33FF8C",
];

const YieldCurveChart = ({ data }: { data: FlattenedRate[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fill: "#666" }}
          tickLine={false}
          padding={{ left: 20, right: 20 }}
          angle={-45}
          height={60}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#666" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip />
        <Legend />

        {Object.keys(data[0])
          .filter((key) => key !== "date")
          .map((key, i) => (
            <Line
              type="monotone"
              dataKey={key}
              key={key}
              stroke={strokeColors[i % strokeColors.length]}
            />
          ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default memo(YieldCurveChart);
