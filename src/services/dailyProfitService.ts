import { api } from "./api";

export interface DailyProfit {
  id: number;
  amount: number;
  date: string;
}

export interface DailyProfitSummary {
  total: number;
  last7Days: DailyProfit[];
}

export const dailyProfitService = {
  getAll: async (): Promise<DailyProfit[]> => {
    const response = await api.get("/daily-profit");
    return response.data;
  },

  getSummary: async (): Promise<DailyProfitSummary> => {
    const response = await api.get("/daily-profit/summary");
    return response.data;
  },
};
