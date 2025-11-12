// src/pages/Startup.tsx
import { useNavigate } from "react-router-dom";

const Startup = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col overflow-x-hidden font-display text-white bg-[#0A0A0A] p-6">
      {/* Fundo com gradiente */}
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(37,244,54,0.2),rgba(255,255,255,0))]" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Logo */}
        <div className="flex flex-col items-center pt-16 text-center">
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
              />
            </svg>
            <h1 className="text-3xl font-black tracking-tighter text-white">
              TRADEZONE
            </h1>
          </div>
        </div>

        {/* Texto principal */}
        <div className="flex flex-col items-center text-center mt-6">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Seu futuro financeiro começa aqui.
          </h2>
          <p className="mt-4 max-w-sm text-base font-normal text-gray-400">
            Acompanhe seus ganhos diários, gerencie seus planos e invista com
            segurança avançada.
          </p>
        </div>

        {/* Botões */}
        <div className="flex w-full flex-col gap-4 pb-8 max-w-md mx-auto">
          <button
            className="flex h-14 w-full items-center justify-center rounded-xl bg-primary px-5 text-black text-base font-bold hover:opacity-90 transition"
            onClick={() => navigate("/register")}
          >
            Registrar
          </button>

          <button
            className="flex h-14 w-full items-center justify-center rounded-xl bg-gray-800/50 px-5 text-white text-base font-bold backdrop-blur-sm hover:bg-gray-700/40 transition"
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>
        </div>

        {/* Rodapé */}
        <div className="pb-6 text-center text-gray-500 text-sm mt-6">
          © 2025 TRADEZONE — Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default Startup;
