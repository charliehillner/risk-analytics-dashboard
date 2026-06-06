import { useState } from "react";
import type { SimulationRequest, SimulationResponse } from "../types/simulation";
import { createSimulation } from "../api/simulationsApi";

type Props = {
  onResult: (result: SimulationResponse) => void;
};

export function SimulationForm({ onResult }: Props) {
  const [formData, setFormData] = useState<SimulationRequest>({
    initialCapital: 10000,
    monthlyContribution: 200,
    expectedReturn: 0.07,
    volatility: 0.15,
    years: 20,
    numRuns: 1000,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const result = await createSimulation(formData);
      onResult(result);
    } catch {
      setError("Simulation could not be started.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Simulation Parameters</h2>

      <label>
        Initial Capital
        <input
          type="number"
          name="initialCapital"
          value={formData.initialCapital}
          onChange={handleChange}
        />
      </label>

      <label>
        Monthly Contribution
        <input
          type="number"
          name="monthlyContribution"
          value={formData.monthlyContribution}
          onChange={handleChange}
        />
      </label>

      <label>
        Expected Annual Return
        <input
          type="number"
          step="0.01"
          name="expectedReturn"
          value={formData.expectedReturn}
          onChange={handleChange}
        />
      </label>

      <label>
        Annual Volatility
        <input
          type="number"
          step="0.01"
          name="volatility"
          value={formData.volatility}
          onChange={handleChange}
        />
      </label>

      <label>
        Years
        <input
          type="number"
          name="years"
          value={formData.years}
          onChange={handleChange}
        />
      </label>

      <label>
        Number of Runs
        <input
          type="number"
          name="numRuns"
          value={formData.numRuns}
          onChange={handleChange}
        />
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Running simulation..." : "Run Simulation"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}