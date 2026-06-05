package de.charliehillner.riskanalyticsbackend.simulation.util;

public record SimulationStatisticsSummary(
        double mean,
        double median,
        double p5,
        double p95,
        double lossProbability
) {
}
