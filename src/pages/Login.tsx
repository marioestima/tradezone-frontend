// src/pages/Login.tsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // redirecionamento pode ser feito usando react-router
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao logar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relativ flex h-screen w-full flex-col justify-center items-center bg-background-dark font-display text-white p-6">
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(37,244,54,0.2),rgba(255,255,255,0))]"></div>

      <div className="relative z-10 flex flex-col w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center text-center pt-8">
          <div className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20V6H4V4ZM4 11H20V13H4V11ZM4 18H20V20H4V18Z"
                fill="currentColor"
              ></path>
            </svg>
            <h1 className="text-3xl font-black tracking-tighter text-white">TRADEZONE</h1>
          </div>
        </div>

        {/* Texto */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Seu futuro financeiro começa aqui.
          </h2>
          <p className="mt-3 max-w-sm text-base font-normal text-gray-400">
            Acompanhe seus ganhos diários, gerencie seus planos e invista com
            segurança avançada.
          </p>
        </div>

        {/* Formulário */}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div className="w-full relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
              mail
            </span>
            <input
              type="email"
              placeholder="Seu e-mail / telefone"
              className="w-full h-12 pl-11 pr-4 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
              lock
            </span>
            <input
              type="password"
              placeholder="Sua senha"
              className="w-full h-12 pl-11 pr-4 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-primary text-black text-base font-bold tracking-wide hover:opacity-90 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <a
            href="/register"
            className="flex h-12 w-full mt-3 items-center justify-center rounded-xl bg-gray-800/50 text-white text-base font-semibold tracking-wide backdrop-blur-sm border border-gray-700 hover:bg-gray-700/40 transition"
          >
            Registrar
          </a>
        </form>

        {/* Rodapé */}
        <div className="pb-6 text-center text-gray-500 text-sm mt-6">
          © 2025 TRADEZONE — Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default Login;
