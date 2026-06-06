import type { SimulationHistoryItem, SimulationRequest, SimulationResponse } from "../types/simulation";

const API_BASE_URL = "http://localhost:8080/api";

export async function createSimulation(
  request: SimulationRequest
): Promise<SimulationResponse> {
  const response = 
  await fetch(`${API_BASE_URL}/simulations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Simulation request failed");
  }

  return response.json();
}

export async function getSimulationHistory():
    Promise<SimulationHistoryItem[]> {

  const response =
      await fetch(`${API_BASE_URL}/simulations`);

  if (!response.ok) {
    throw new Error(
      "Could not fetch simulation history"
    );
  }

  return response.json();
}