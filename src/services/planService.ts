import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Plan {
  id: number;
  name: string;
  value: number;
  dailyProfitPct: number;
  status: "OPEN" | "CLOSED";
  createdAt: string;
}

export const planService = {
  getAll: async (): Promise<Plan[]> => {
    const response = await axios.get(`${API_URL}/plans`);
    return response.data;
  },

  getById: async (id: number): Promise<Plan> => {
    const response = await axios.get(`${API_URL}/plans/${id}`);
    return response.data;
  },

  create: async (plan: Omit<Plan, "id" | "createdAt">): Promise<Plan> => {
    const response = await axios.post(`${API_URL}/plans`, plan);
    return response.data;
  },
};
