export type SimulationRequest = {
  initialCapital: number;
  monthlyContribution: number;
  expectedReturn: number;
  volatility: number;
  years: number;
  numRuns: number;
};

export type SimulationResponse = {
  id: number;
  message: string;
  meanFinalValue: number;
  medianFinalValue: number;
  percentile5: number;
  percentile95: number;
  lossProbability: number;
  finalValues: number[];
  valueAtRisk95: number;
  conditionalValueAtRisk95: number;
};

export type SimulationHistoryItem = {
  id: number;
  createdAt: string;
  initialCapital: number;
  monthlyContribution: number;
  expectedReturn: number;
  volatility: number;
  years: number;
  numRuns: number;
  meanFinalValue: number;
  medianFinalValue: number;
  percentile5: number;
  percentile95: number;
  lossProbability: number;
  valueAtRisk95: number;
  conditionalValueAtRisk95: number;
};