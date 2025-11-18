import axios from "axios";

// URL da API
const API_URL =
  import.meta.env.VITE_API_URL || "https://tradezone-api-v1.onrender.com";

// Instância do Axios
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para enviar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
