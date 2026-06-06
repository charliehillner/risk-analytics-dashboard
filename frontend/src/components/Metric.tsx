import type { RiskLevel } from "../types/risk-level";

type MetricProps = {
  label: string;
  value: string;
  color?: string;
  riskLevel?: RiskLevel;
};

export function Metric({ label, value, color, riskLevel }: MetricProps) {
    const className = 
    riskLevel
    ? `metric metric-${riskLevel}`
    : "metric";
  return (
    <div className={className}>
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