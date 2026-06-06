package de.charliehillner.riskanalyticsbackend.simulation.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record SimulationHistoryItem(
        Long id,
        Instant createdAt,
        BigDecimal initialCapital,
        BigDecimal monthlyContribution,
        double expectedReturn,
        double volatility,
        int years,
        int numRuns,
        BigDecimal meanFinalValue,
        BigDecimal medianFinalValue,
        BigDecimal percentile5,
        BigDecimal percentile95,
        double lossProbability,
        BigDecimal valueAtRisk95,
        BigDecimal conditionalValueAtRisk95
) {}
