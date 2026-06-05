package de.charliehillner.riskanalyticsbackend.simulation;

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
}
