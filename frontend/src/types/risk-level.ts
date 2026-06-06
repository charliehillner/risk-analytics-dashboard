export type RiskLevel =
  | "low"
  | "medium"
  | "high";

export function getRiskLevel(
  lossProbability: number
): RiskLevel {
  if (lossProbability < 0.05) {
    return "low";
  }

  if (lossProbability < 0.15) {
    return "medium";
  }

  return "high";
}