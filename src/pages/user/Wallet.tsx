import React from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Eye,
  EyeOff,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Plus,
  ArrowUp,
  Home,
  Monitor,
  Wallet,
  User,
} from "lucide-react";

const WalletPage: React.FC = () => {
  const balanceVisible = true;

  const transactions = [
    {
      id: 1,
      type: "deposit",
      title: "Depósito via PIX",
      date: "15 de Julho, 10:30",
      amount: "+ 1.000,00 Kz",
      icon: <ArrowDownLeft className="text-green-400" size={22} />,
      bg: "bg-primary/10",
      color: "text-green-400",
    },
    {
      id: 2,
      type: "profit",
      title: "Lucro do Plano Alpha",
      date: "14 de Julho, 23:59",
      amount: "+ 57,30 Kz",
      icon: <TrendingUp className="text-green-400" size={22} />,
      bg: "bg-primary/10",
      color: "text-green-400",
    },
    {
      id: 3,
      type: "withdraw",
      title: "Saque para conta",
      date: "13 de Julho, 14:00",
      amount: "- 500,00 Kz",
      icon: <ArrowUpRight className="text-red-400" size={22} />,
      bg: "bg-red-400/10",
      color: "text-red-400",
    },
    {
      id: 4,
      type: "profit",
      title: "Lucro do Plano Beta",
      date: "13 de Julho, 23:59",
      amount: "+ 120,45 Kz",
      icon: <TrendingUp className="text-green-400" size={22} />,
      bg: "bg-primary/10",
      color: "text-green-400",
    },
  ];

  return (
    <div className="font-display bg-[#0A0A0A] min-h-screen flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-dark px-4 py-3">
        <img
          className="size-10 rounded-full"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2l3xMqUJ1YopTi0gXgYWDXghc112-HiECEJvZQ3g0iOs7oYIPXMC3VREKXtudxTLx9mIp-slfQ6pJNGS-WAXv6AtJVCBHSLEeelVjcD3CuljkdL9ReJ3EX8nb-s0XLR-lVNpV-excmCoFZxKhuHgz3DJgcDC15Rk_S9audnijbjePBWyd104Fr0aoQ-3DkdCIbakm0LV0t7dWqNOCpiu9aycPwJIJYx1IOkzhoEQxeK9J_EFoH9dSRCIE0CH2r3Byq-Sp0fJFIfv-"
          alt="user"
        />

        <h1 className="text-lg font-semibold text-gray-50">Minha Carteira</h1>

        <button className="text-gray-300">
          <Bell size={24} />
        </button>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-4 pb-24">
        {/* SALDO */}
        <section className="mt-3 rounded-xl bg-surface-dark p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Saldo Disponível</p>
            <button className="text-gray-400">
              {balanceVisible ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
          </div>

          <p className="mt-1 text-4xl font-bold text-gray-50 tracking-tight">
            {balanceVisible ? "15.750,50 Kz" : "••••••"}
          </p>
        </section>

        {/* BOTÕES */}
        <section className="flex gap-4 pt-6">
          <button className="flex-1 h-14 flex items-center justify-center gap-2 bg-primary text-background-dark font-bold rounded-xl">
            <Plus size={20} />
            Depositar
          </button>

          <button className="flex-1 h-14 flex items-center justify-center gap-2 bg-surface-dark text-gray-50 font-bold rounded-xl">
            <ArrowUpRight size={20} />
            Sacar
          </button>
        </section>

        {/* TÍTULO HISTÓRICO */}
        <h2 className="text-xl font-bold text-gray-50 pt-6 pb-4">
          Histórico de Transações
        </h2>

        {/* LISTA DE TRANSAÇÕES */}
        <div className="flex flex-col">
          {transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 py-4 border-b border-gray-800"
            >
              <div
                className={`h-12 w-12 flex items-center justify-center rounded-full ${t.bg}`}
              >
                {t.icon}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-50">{t.title}</p>
                <p className="text-sm text-gray-400">{t.date}</p>
              </div>

              <p className={`font-bold ${t.color}`}>{t.amount}</p>
            </div>
          ))}
        </div>
      </main>

      {/* NAVBAR */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around bg-background-dark/80 backdrop-blur-lg border-t border-gray-800 px-4 pb-4 pt-2">
        <Link
          to="/dashboard"
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Home size={22} />
          <span className="text-xs">Início</span>
        </Link>

        <Link
          to="/plans"
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <Monitor size={22} />
          <span className="text-xs">Planos</span>
        </Link>

        <Link
          to="/wallet"
          className="flex flex-col items-center gap-1 text-primary"
        >
          <Wallet size={22} />
          <span className="text-xs font-bold">Carteira</span>
        </Link>

        <Link
          to="/profile"
          className="flex flex-col items-center gap-1 text-gray-400"
        >
          <User size={22} />
          <span className="text-xs">Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default WalletPage;
