import type { User } from "../hooks/useAuth";
import { api } from "./api";

interface LoginResponse {
  user: User;
  token: string;
}

export const userService = {
  // 🔓 Login (público)
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  // 🔓 Registro (público)
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

  // 🔐 Pega dados do usuário logado
  getMe: async (): Promise<User> => {
    const response = await api.get("/users/me");
    return response.data;
  },

  // 🔐 Pega usuário por ID
  getUser: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // 🔐 Lista todos usuários
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data;
  },
};
