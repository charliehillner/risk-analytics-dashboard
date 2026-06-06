import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatShortCurrency } from "../utils/formatters";

type HistogramBin = {
  range: string;
  count: number;
};

type Props = {
  values: number[];
  bins?: number;
};

export function HistogramChart({ values, bins = 20 }: Props) {
  if (values.length === 0) {
    return null;
  }

  const data = buildHistogram(values, bins);

  return (
    <div className="chart-container">
      <h2>Distribution of Final Values</h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function buildHistogram(values: number[], bins: number): HistogramBin[] {
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (min === max) {
    return [
      {
        range: formatCurrency(min, 0),
        count: values.length,
      },
    ];
  }

  const binWidth = (max - min) / bins;

  const histogram: HistogramBin[] = Array.from({ length: bins }, (_, index) => {
    const lower = min + index * binWidth;
    const upper = lower + binWidth;

    return {
      range: `${formatShortCurrency(lower)}–${formatShortCurrency(upper)}`,
      count: 0,
    };
  });

  for (const value of values) {
    const index = Math.min(
      Math.floor((value - min) / binWidth),
      bins - 1
    );

    histogram[index].count++;
  }

  return histogram;
}