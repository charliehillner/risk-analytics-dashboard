package de.charliehillner.riskanalyticsbackend.simulation;

import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationRequest;
import de.charliehillner.riskanalyticsbackend.simulation.dto.SimulationResponse;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class SimulationService {

    private final SimulationRepository simulationRepository;

    public SimulationService(SimulationRepository simulationRepository) {
        this.simulationRepository = simulationRepository;
    }

    public SimulationResponse createSimulation(SimulationRequest request) {
        Simulation simulation = new Simulation();

        simulation.setCreatedAt(Instant.now());
        simulation.setInitialCapital(request.initialCapital());
        simulation.setMonthlyContribution(request.monthlyContribution());
        simulation.setExpectedReturn(request.expectedReturn());
        simulation.setVolatility(request.volatility());
        simulation.setYears(request.years());
        simulation.setNumRuns(request.numRuns());

        Simulation savedSimulation = simulationRepository.save(simulation);

        return new SimulationResponse(
                savedSimulation.getId(),
                "Simulation saved"
        );
    }
}
