import { useState } from "react";
import type { SimulationResponse } from "./types/simulation";
import { SimulationForm } from "./components/SimulationForm";
import { HistogramChart } from "./components/HistogramChart";
import { formatCurrency, formatPercentage } from "./utils/formatters";
import "./App.css";
import { Metric } from "./components/Metric";
import { chartColors } from "./themes/colors";
import { getRiskLevel } from "./types/risk-level";
import { SimulationHistory } from "./components/SimulationHistory";

type ActiveTab = "simulation" | "history";

function App() {
  const [result, setResult] = useState<SimulationResponse | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("simulation");

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <p className="eyebrow">Monte Carlo Portfolio Simulation</p>
        <h1>Risk Analytics Dashboard</h1>
        <p className="sidebar-subtitle">
          Simulate future portfolio outcomes and estimate risk metrics based on
          expected return, volatility and investment horizon.
        </p>

        <SimulationForm onResult={setResult} />
      </aside>

      <section className="main-panel">
        <div className="tabs">
          <button
            className={activeTab === "simulation" ? "tab active" : "tab"}
            onClick={() => setActiveTab("simulation")}
          >
            Current Simulation
          </button>

          <button
            className={activeTab === "history" ? "tab active" : "tab"}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>
        {activeTab === "simulation" && (
          <div className="card results-card">
            <h2>Simulation Result</h2>

            {!result ? (
              <p className="muted">
                Run a simulation to see summary statistics.
              </p>
            ) : (
              <>
                <div className="metrics-grid">
                  <Metric
                    label="Mean Final Value"
                    value={formatCurrency(result.meanFinalValue)}
                  />
                  <Metric
                    label="5% Quantile"
                    value={formatCurrency(result.percentile5)}
                    color={chartColors.risk}
                  />
                  <Metric
                    label="Median Final Value"
                    value={formatCurrency(result.medianFinalValue)}
                    color={chartColors.median}
                  />
                  <Metric
                    label="95% Quantile"
                    value={formatCurrency(result.percentile95)}
                    color={chartColors.opportunity}
                  />
                  <Metric
                    label="Loss Probability"
                    value={formatPercentage(result.lossProbability)}
                    riskLevel={getRiskLevel(result.lossProbability)}
                  />
                  <Metric
                    label="VaR 95%"
                    value={formatCurrency(result.valueAtRisk95)}
                    riskLevel="medium"
                  />

                  <Metric
                    label="CVaR 95%"
                    value={formatCurrency(result.conditionalValueAtRisk95)}
                    riskLevel="high"
                  />
                </div>

                {result.finalValues && (
                  <HistogramChart
                    values={result.finalValues}
                    median={result.medianFinalValue}
                    percentile5={result.percentile5}
                    percentile95={result.percentile95}
                    bins={15}
                  />
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="card">
            <SimulationHistory />
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
