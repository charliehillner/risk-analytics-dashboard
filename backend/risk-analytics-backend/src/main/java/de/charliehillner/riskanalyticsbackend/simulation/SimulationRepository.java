package de.charliehillner.riskanalyticsbackend.simulation;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SimulationRepository extends JpaRepository<Simulation, Long> {
    List<Simulation> findAllByOrderByCreatedAtDesc();
}
