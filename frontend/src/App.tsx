import { useState } from "react";
import type { SimulationResponse } from "./types/simulation";
import { SimulationForm } from "./components/SimulationForm";
import "./App.css";
import { HistogramChart } from "./components/HistogramChart";

function App() {
  const [result, setResult] = useState<SimulationResponse | null>(null);

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">Monte Carlo Portfolio Simulation</p>
        <h1>Risk Analytics Dashboard</h1>
        <p className="subtitle">
          Simulate future portfolio outcomes and estimate risk metrics based on
          expected return, volatility and investment horizon.
        </p>
      </header>

      <section className="dashboard-grid">
        <div className="card">
          <SimulationForm onResult={setResult} />
        </div>

        <div className="card results-card">
          <h2>Simulation Result</h2>

          {!result ? (
            <p className="muted">
              Run a simulation to see summary statistics.
            </p>
          ) : (
            <div className="metrics-grid">
              <Metric label="Mean Final Value" value={result.meanFinalValue.toFixed(2)} />
              <Metric label="Median Final Value" value={result.medianFinalValue.toFixed(2)} />
              <Metric label="5% Quantile" value={result.percentile5.toFixed(2)} />
              <Metric label="95% Quantile" value={result.percentile95.toFixed(2)} />
              <Metric
                label="Loss Probability"
                value={`${(result.lossProbability * 100).toFixed(2)}%`}
              />
            </div>
          )}
        </div>
        {result && result.finalValues && (
        <section className="card chart-card">
          <HistogramChart values={result.finalValues} />
        </section>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;