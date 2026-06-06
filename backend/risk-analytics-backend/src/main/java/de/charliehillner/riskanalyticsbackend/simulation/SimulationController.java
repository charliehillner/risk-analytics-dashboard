package de.charliehillner.riskanalyticsbackend.simulation;

import de.charliehillner.riskanalyticsbackend.simulation.dto.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/simulations")
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping
    public List<SimulationHistoryItem> getSimulations() {
        return simulationService.getSimulationHistory();
    }

    @PostMapping
    public SimulationResponse createSimulation(
            @RequestBody SimulationRequest request
    ) {
        return simulationService.createSimulation(request);
    }
}
