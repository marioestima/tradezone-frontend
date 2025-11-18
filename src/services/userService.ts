import type { User } from "../hooks/useAuth";
import { api } from "./api";

interface LoginResponse {
  user: User;
  token: string;
}

export const userService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  register: async (
    name: string,
    email: string,
    phone: number,
    password: string
  ): Promise<User> => {
    const response = await api.post("/auth/register", {
      name,
      email,
      phone,
      password,
    });
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },
};
