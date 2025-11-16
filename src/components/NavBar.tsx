 import { useState } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type NavBarProps = {
  title: string;
};

const NavBar = ({ title }: NavBarProps) => {
  const [notifications] = useState(3);

  const location = useLocation();
  const navigate = useNavigate();

  // Verifica se está na rota principal (dashboard)
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-[#0A0A0A]/70 p-4 backdrop-blur-md border-b border-zinc-800">

      {/* ESQUERDA — Avatar ou Botão Voltar */}
      <div className="flex items-center gap-3">
        {isDashboard ? (
          // Avatar
          <div
            className="h-10 w-10 rounded-full bg-cover bg-center border border-zinc-700"
            style={{
              backgroundImage:
                "url(https://lh3.googleusercontent.com/aida-public/AB6AXuD2l3xMqUJ1YopTi0gXgYWDXghc112-HiECEJvZQ3g0iOs7oYIPXMC3VREKXtudxTLx9mIp-slfQ6pJNGS-WAXv6AtJVCBHSLEeelVjcD3CuljkdL9ReJ3EX8nb-s0XLR-lVNpV-excmCoFZxKhuHgz3DJgcDC15Rk_S9audnijbjePBWyd104Fr0aoQ-3DkdCIbakm0LV0t7dWqNOCpiu9aycPwJIJYx1IOkzhoEQxeK9J_EFoH9dSRCIE0CH2r3Byq-Sp0fJFIfv-)",
            }}
          />
        ) : (
          <button
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/dashboard");
              }
            }}
            className="text-gray-100 flex items-center"
          >
            <ArrowLeft size={26} />
          </button>
        )}
      </div>

      {/* Título */}
      <h2 className="text-lg font-bold text-gray-100">{title}</h2>

      {/* Notificações */}
      <div className="relative">
        <a href="/notifications" className="text-zinc-100">
          <Bell size={24} />
        </a>

        {notifications > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
            {notifications}
          </span>
        )}
      </div>
    </header>
  );
};

export default NavBar;
