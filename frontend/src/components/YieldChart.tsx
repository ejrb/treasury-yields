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
  "#FF5733", // Vivid Red-Orange
  "#33FF57", // Bright Green
  "#3357FF", // Bold Blue
  "#FF33A8", // Magenta Pink
  "#FFBD33", // Vibrant Yellow
  "#33FFF5", // Aqua
  "#FF3333", // Bright Red
  "#8D33FF", // Purple
  "#FF8C33", // Orange
  "#33FF8C", // Light Green
];

const YieldCurveChart = ({ data }: { data: FlattenedRate[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
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
