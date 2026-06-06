import { useEffect, useState } from "react";
import {
  getSimulationHistory
} from "../api/simulationsApi";
import type {
  SimulationHistoryItem
} from "../types/simulation";
import { formatNumber, formatPercentage } from "../utils/formatters";

export function SimulationHistory() {
  const [history, setHistory] =
      useState<SimulationHistoryItem[]>([]);

  useEffect(() => {
    getSimulationHistory()
      .then(setHistory)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Simulation History</h2>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Mean</th>
            <th>Median</th>
            <th>Loss Prob.</th>
          </tr>
        </thead>

        <tbody>
          {history.map(item => (
            <tr key={item.id}>
              <td>
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                {formatNumber(item.meanFinalValue, 0)}
              </td>

              <td>
                {formatNumber(item.medianFinalValue, 0)}
              </td>

              <td>
                {formatPercentage(item.lossProbability, 1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}