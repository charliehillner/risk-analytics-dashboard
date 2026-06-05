package de.charliehillner.riskanalyticsbackend.simulation;

import de.charliehillner.riskanalyticsbackend.simulation.util.SimulationStatisticsSummary;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "simulation")
@Getter
@Setter
@NoArgsConstructor
public class Simulation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "initial_capital")
    private BigDecimal initialCapital;
    @Column(name = "monthly_contribution")
    private BigDecimal monthlyContribution;

    @Column(name = "expected_return")
    private double expectedReturn;
    @Column(name = "volatility")
    private double volatility;

    @Column(name = "years")
    private int years;
    @Column(name = "num_runs")
    private int numRuns;

    // Statistics
    @Column(name = "mean_final_value")
    private BigDecimal meanFinalValue;
    @Column(name = "median_final_value")
    private BigDecimal medianFinalValue;
    @Column(name = "percentile_5")
    private BigDecimal percentile5;
    @Column(name = "percentile_95")
    private BigDecimal percentile95;

    @Column(name = "loss_probability")
    private double lossProbability;

    public void setInitialValues(SimulationInitialValues initialValues) {
        setInitialCapital(initialValues.initialCapital());
        setMonthlyContribution(initialValues.monthlyContribution());
        setExpectedReturn(initialValues.expectedReturn());
        setVolatility(initialValues.volatility());
        setYears(initialValues.years());
        setNumRuns(initialValues.numRuns());
    }

    public void setStatistics(SimulationStatisticsSummary summary) {
        setMeanFinalValue(new BigDecimal(summary.mean()));
        setMedianFinalValue(new BigDecimal(summary.median()));
        setPercentile5(new BigDecimal(summary.p5()));
        setPercentile95(new BigDecimal(summary.p95()));
        setLossProbability(summary.lossProbability());
    }
}
