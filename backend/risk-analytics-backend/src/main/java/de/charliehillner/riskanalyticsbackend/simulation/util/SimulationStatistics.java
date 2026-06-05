package de.charliehillner.riskanalyticsbackend.simulation.util;

import java.util.Arrays;

public class SimulationStatistics {
    public static double median(double[] values) {
        double[] sorted = values.clone();
        Arrays.sort(sorted);

        return sorted[sorted.length / 2];
    }

    public static double quantile(double[] values, double p) {
        double[] sorted = values.clone();
        Arrays.sort(sorted);

        int index = (int) (p * sorted.length);

        return sorted[index];
    }

    public static double mean(double[] values) {
        return Arrays.stream(values)
                .average()
                .orElseThrow();
    }

    public static double lossProbability(
            double[] finalValues,
            double investedCapital
    ) {
        long losses = Arrays.stream(finalValues)
                .filter(v -> v < investedCapital)
                .count();
        return (double) losses / finalValues.length;
    }

    public static SimulationStatisticsSummary summarize(
            double[] finalValues,
            double investedCapital
    ) {
        return new SimulationStatisticsSummary(
                mean(finalValues),
                median(finalValues),
                quantile(finalValues, 0.05),
                quantile(finalValues, 0.95),
                lossProbability(finalValues, investedCapital)
        );
    }
}
