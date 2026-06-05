package de.charliehillner.riskanalyticsbackend.simulation;

import java.math.BigDecimal;

public record SimulationInitialValues(
        BigDecimal initialCapital,
        BigDecimal monthlyContribution,
        double expectedReturn,
        double volatility,
        int years,
        int numRuns
) {
}
