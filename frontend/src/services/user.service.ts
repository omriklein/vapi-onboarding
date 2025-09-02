import type { UserDetails } from "../Components/SignUpForm";
import api from "./api";

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log(`response.data =`, response.data)
    return response.data as UserDetails[];
  } catch (error: any) {
    console.error("POST request failed:", error.message || error);
    throw error;
  }
};