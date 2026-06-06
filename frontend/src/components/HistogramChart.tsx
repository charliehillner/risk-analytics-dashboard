import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatShortCurrency } from "../utils/formatters";
import { chartColors } from "../themes/colors";

type HistogramBin = {
  range: string;
  lowerBound: number;
  upperBound: number;
  count: number;
};

type Props = {
  values: number[];
  median: number;
  percentile5: number;
  percentile95: number;
  bins?: number;
};

export function HistogramChart({
  values,
  median,
  percentile5,
  percentile95,
  bins = 20,
}: Props) {
  if (values.length === 0) {
    return null;
  }

  const data = buildHistogram(values, bins);
  const medianBin = findBin(median, data);
  const p5Bin = findBin(percentile5, data);
  const p95Bin = findBin(percentile95, data);

  return (
    <div className="chart-container">
      <h2>Distribution of Final Values</h2>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <ReferenceLine
            x={medianBin}
            stroke={chartColors.median}
            strokeWidth={2}
            label={{
              value: "Median",
              fill: chartColors.median,
              fontWeight: 600,
            }}
          />
          <ReferenceLine
            x={p5Bin}
            stroke={chartColors.risk}
            strokeWidth={2}
            label={{
              value: "P5",
              fill: chartColors.risk,
              fontWeight: 600,
            }}
          />
          <ReferenceLine
            x={p95Bin}
            stroke={chartColors.opportunity}
            strokeWidth={2}
            label={{
              value: "P95",
              fill: chartColors.opportunity,
              fontWeight: 600,
            }}
          />
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
        lowerBound: min,
        upperBound: max,
        count: values.length,
      },
    ];
  }

  const binWidth = (max - min) / bins;

  const histogram: HistogramBin[] = Array.from({ length: bins }, (_, index) => {
    const lower = min + index * binWidth;
    const upper = lower + binWidth;

    return {
      range: `${formatShortCurrency(lower)}-${formatShortCurrency(upper)}`,
      lowerBound: lower,
      upperBound: upper,
      count: 0,
    };
  });

  for (const value of values) {
    const index = Math.min(Math.floor((value - min) / binWidth), bins - 1);

    histogram[index].count++;
  }

  return histogram;
}

function findBin(value: number, histogram: HistogramBin[]): string {
  const bin = histogram.find(
    (b, index) =>
      value >= b.lowerBound &&
      (value < b.upperBound || index === histogram.length - 1),
  );

  return bin?.range ?? histogram[0].range;
}
