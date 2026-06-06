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

    public static double valueAtRisk95(
            double p5,
            double investedCapital
    ) {
        return Math.max(0.0, investedCapital - p5);
    }

    private static double conditionalValueAtRisk95(
            double[] values,
            double investedCapital,
            double p5
    ) {
        double sumLosses = 0.0;
        int count = 0;

        for (double value : values) {
            if (value <= p5) {
                double loss = Math.max(0.0, investedCapital - value);
                sumLosses += loss;
                count++;
            }
        }

        if (count == 0) {
            return 0.0;
        }

        return sumLosses / count;
    }

    public static SimulationStatisticsSummary summarize(
            double[] finalValues,
            double investedCapital
    ) {
        double p5 = quantile(finalValues, 0.05);
        double p95 = quantile(finalValues, 0.95);
        return new SimulationStatisticsSummary(
                mean(finalValues),
                median(finalValues),
                p5,
                p95,
                lossProbability(finalValues, investedCapital),
                valueAtRisk95(p5, investedCapital),
                conditionalValueAtRisk95(finalValues, investedCapital, p5)
        );
    }
}
