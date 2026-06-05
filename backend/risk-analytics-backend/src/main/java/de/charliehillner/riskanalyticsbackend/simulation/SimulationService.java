package de.charliehillner.riskanalyticsbackend.simulation;

import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationRequest;
import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationResponse;
import de.charliehillner.riskanalyticsbackend.simulation.util.SimulationStatistics;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Arrays;
import java.util.Random;

@Service
public class SimulationService {

    private final SimulationRepository simulationRepository;

    public SimulationService(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    public SimulationResponse createSimulation(SimulationRequest request) {
        double[] finalValues = simulateFinalValues(request);

        System.out.println("Max: " + Arrays.stream(finalValues).max());
        System.out.println("Min: " + Arrays.stream(finalValues).min());

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
                "Simulation saved"
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
}
