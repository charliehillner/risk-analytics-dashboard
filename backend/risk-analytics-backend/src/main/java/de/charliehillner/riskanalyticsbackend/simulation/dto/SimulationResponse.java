package de.charliehillner.riskanalyticsbackend.simulation.dto;

import java.math.BigDecimal;

public record SimulationResponse(
        Long id,
        String message,
        double meanFinalValue,
        double medianFinalValue,
        double percentile5,
        double percentile95,
        double lossProbability
) {
}
