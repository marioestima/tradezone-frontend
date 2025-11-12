import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Investment {
  id: number;
  userId: number;
  planId: number;
  amount: number;
  accumulated: number;
  active: boolean;
  startAt: string;
  updatedAt: string;
}

export const investmentService = {
  create: async (
    userId: number,
    planId: number,
    amount: number
  ): Promise<Investment> => {
    const response = await axios.post(`${API_URL}/investments`, {
      userId,
      planId,
      amount,
    });
    return response.data;
  },

  getActiveByUser: async (userId: number): Promise<Investment[]> => {
    const response = await axios.get(`${API_URL}/investments/active/${userId}`);
    return response.data;
  },

  incrementAccumulated: async (
    id: number,
    value: number
  ): Promise<Investment> => {
    const response = await axios.patch(
      `${API_URL}/investments/${id}/increment`,
      { value }
    );
    return response.data;
  },
};
