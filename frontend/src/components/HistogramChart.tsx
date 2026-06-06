import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
        range: formatCurrency(min),
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

function formatShortCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k`;
  }

  return Math.round(value).toString();
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}