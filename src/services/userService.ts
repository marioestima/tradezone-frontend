import axios from "axios";
import type { User } from "../hooks/useAuth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface LoginResponse {
  user: User;
  token: string;
}

export const userService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  register: async (
    name: string,
    email: string,
    phone: number,
    password: string
  ): Promise<User> => {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },
};
