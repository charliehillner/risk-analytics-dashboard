package de.charliehillner.riskanalyticsbackend.simulation;

import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationHistoryItem;
import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationRequest;
import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationResponse;
import de.charliehillner.riskanalyticsbackend.simulation.util.SimulationStatistics;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Random;

@Service
public class SimulationService {

    private final SimulationRepository simulationRepository;

    public SimulationService(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    public SimulationResponse createSimulation(SimulationRequest request) {
        double[] finalValues = simulateFinalValues(request);

        Simulation simulation = new Simulation();

        // Initial values
        simulation.setCreatedAt(Instant.now());
        simulation.setInitialValues(new SimulationInitialValues(
                request.initialCapital(),
                request.monthlyContribution(),
                request.expectedReturn(),
                request.volatility(),
                request.years(),
                request.numRuns()
        ));

        // Calculated values
        double investedCapital =
                request.initialCapital().doubleValue()
                        + request.monthlyContribution().doubleValue()
                        * request.years() * 12;
        simulation.setStatistics(SimulationStatistics.summarize(finalValues, investedCapital));

        simulation.setLossProbability(
                SimulationStatistics.lossProbability(
                        finalValues,
                        investedCapital
                )
        );

        Simulation savedSimulation = simulationRepository.save(simulation);

        return new SimulationResponse(
                savedSimulation.getId(),
                "Simulation saved",
                savedSimulation.getMeanFinalValue().doubleValue(),
                savedSimulation.getMedianFinalValue().doubleValue(),
                savedSimulation.getPercentile5().doubleValue(),
                savedSimulation.getPercentile95().doubleValue(),
                savedSimulation.getLossProbability(),
                finalValues
        );
    }

    private double[] simulateFinalValues(SimulationRequest request) {
        int months = request.years() * 12;
        int numRuns = request.numRuns();

        double dt = 1.0 / 12.0;

        double mu = request.expectedReturn();
        double sigma = request.volatility();

        double initialCapital = request.initialCapital().doubleValue();
        double monthlyContribution = request.monthlyContribution().doubleValue();

        double[] finalValues = new double[numRuns];

        Random random = new Random();

        for (int run = 0; run < numRuns; run++) {
            double value = initialCapital;

            for (int month = 0; month < months; month++) {
                double z = random.nextGaussian();

                double growthFactor = Math.exp(
                        (mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z
                );

                value *= growthFactor;
                value += monthlyContribution;
            }
            finalValues[run] = value;
        }
        return finalValues;
    }

    public List<SimulationHistoryItem> getSimulationHistory() {
        return simulationRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(simulation -> new SimulationHistoryItem(
                        simulation.getId(),
                        simulation.getCreatedAt(),
                        simulation.getInitialCapital(),
                        simulation.getMonthlyContribution(),
                        simulation.getExpectedReturn(),
                        simulation.getVolatility(),
                        simulation.getYears(),
                        simulation.getNumRuns(),
                        simulation.getMeanFinalValue(),
                        simulation.getMedianFinalValue(),
                        simulation.getPercentile5(),
                        simulation.getPercentile95(),
                        simulation.getLossProbability()
                ))
                .toList();
    }
}
