package de.charliehillner.riskanalyticsbackend.simulation.dto;

import java.math.BigDecimal;

public record SimulationRequest(
        BigDecimal initialCapital,
        BigDecimal monthlyContribution,
        double expectedReturn,
        double volatility,
        int years,
        int numRuns
) {
}
