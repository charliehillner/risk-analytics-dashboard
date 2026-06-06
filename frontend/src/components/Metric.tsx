type MetricProps = {
  label: string;
  value: string;
  color?: string;
};

export function Metric({ label, value, color }: MetricProps) {
  return (
    <div className="metric">
      <span
        className="metric-label"
        style={{ color }}
      >
        {label}
      </span>

      <strong style={{ color }}>
        {value}
      </strong>
    </div>
  );
}