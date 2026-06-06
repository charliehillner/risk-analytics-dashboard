package de.charliehillner.riskanalyticsbackend.simulation.dto;

public record SimulationResponse(
        Long id,
        String message,
        double meanFinalValue,
        double medianFinalValue,
        double percentile5,
        double percentile95,
        double lossProbability,
        double[] finalValues,
        double valueAtRisk95,
        double conditionalValueAtRisk95
) {
}
