import type { AgentDetails } from "../Components/AgentSetupForm";
import type { UserDetails } from "../Components/SignUpForm";
import api from "./api";

interface CreateAgentData {
    userData: UserDetails,
    agentData: AgentDetails
}
export const createAgentUser = async (data: CreateAgentData) => {
  try {
    const response = await api.post('/agents/create-user-agent', data);
    console.log(`response.data =`, response.data)
    return response.data;
  } catch (error: any) {
    console.error("POST request failed:", error.message || error);
    throw error;
  }
};