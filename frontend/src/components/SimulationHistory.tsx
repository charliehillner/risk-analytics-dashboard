import { useEffect, useState } from "react";
import { getSimulationHistory } from "../api/simulationsApi";
import type { SimulationHistoryItem } from "../types/simulation";
import { formatCurrency, formatPercentage } from "../utils/formatters";

export function SimulationHistory() {
  const [history, setHistory] = useState<SimulationHistoryItem[]>([]);

  useEffect(() => {
    getSimulationHistory().then(setHistory).catch(console.error);
  }, []);

  return (
    <div className="history">
      <h2>Simulation History</h2>

      {history.length === 0 ? (
        <p className="muted">No simulations yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Return</th>
                <th>Volatility</th>
                <th>Years</th>
                <th>Runs</th>
                <th>Median</th>
                <th>5% Quantile</th>
                <th>95% Quantile</th>
                <th>Loss Prob.</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.createdAt).toLocaleString("de-DE")}</td>
                  <td>{formatPercentage(item.expectedReturn)}</td>
                  <td>{formatPercentage(item.volatility)}</td>
                  <td>{item.years}</td>
                  <td>{item.numRuns.toLocaleString("de-DE")}</td>
                  <td>{formatCurrency(item.medianFinalValue)}</td>
                  <td>{formatCurrency(item.percentile5)}</td>
                  <td>{formatCurrency(item.percentile95)}</td>
                  <td>{formatPercentage(item.lossProbability)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}