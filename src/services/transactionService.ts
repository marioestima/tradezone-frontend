import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Transaction {
  id: number;
  userId: number;
  type: "DEPOSIT" | "PROFIT" | "WITHDRAWAL";
  amount: number;
  fee: number;
  createdAt: string;
  note?: string;
}

export const transactionService = {
  getByUser: async (userId: number): Promise<Transaction[]> => {
    const response = await axios.get(`${API_URL}/transactions/user/${userId}`);
    return response.data;
  },

  create: async (
    transaction: Omit<Transaction, "id" | "createdAt">
  ): Promise<Transaction> => {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
  },
};
