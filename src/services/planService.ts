import { api } from "./api";

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
    const response = await api.get("/plans");
    return response.data;
  },

  getById: async (id: number): Promise<Plan> => {
    const response = await api.get(`/plans/${id}`);
    return response.data;
  },

  create: async (plan: Omit<Plan, "id" | "createdAt">): Promise<Plan> => {
    const response = await api.post("/plans", plan);
    return response.data;
  },

  close: async (id: number): Promise<Plan> => {
    const response = await api.post(`/plans/${id}`  );
    return response.data;
  },
};
