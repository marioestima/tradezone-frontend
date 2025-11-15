import { useLocation, Link } from "react-router-dom";
import {
  Bell,
  Download,
  ChevronDown,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  LineChart,
  Home,
  Wallet,
  Replace,
  User,
} from "lucide-react";

const Transactions = () => {
  const location = useLocation();

  // Footer links com lógica de ativo
  const footerLinks = [
    { to: "/dashboard", label: "Início", icon: <Home size={20} /> },
    { to: "/wallet", label: "Carteira", icon: <Wallet size={20} /> },
    { to: "/transactions", label: "Transações", icon: <Replace size={20} /> },
    { to: "/profile", label: "Perfil", icon: <User size={20} /> },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] text-white pb-24 antialiased">

      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-[#0A0A0A]/80 backdrop-blur-sm px-4 pt-4 pb-2">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold flex-1">Transações</h1>

          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-full text-gray-400 hover:bg-white/5">
              <Bell />
            </button>

            <button className="flex size-10 items-center justify-center rounded-full text-gray-400 hover:bg-white/5">
              <Download />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1">
        {/* FILTROS */}
        <div className="px-4 py-3 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Tipos */}
            <div className="relative">
              <select className="w-full appearance-none rounded-lg bg-[#1A1A1A] py-3 pl-4 pr-10 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option>Todos os tipos</option>
                <option>Depósitos</option>
                <option>Saques</option>
                <option>Investimentos</option>
                <option>Lucros</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            {/* Intervalo */}
            <div className="relative">
              <select className="w-full appearance-none rounded-lg bg-[#1A1A1A] py-3 pl-4 pr-10 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                <option>Este mês</option>
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este ano</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* LISTA DE TRANSAÇÕES */}
        <div className="flex flex-col">

          {/* Hoje */}
          <div className="px-4 py-2">
            <p className="text-sm font-semibold text-gray-400">
              Hoje, 24 de Julho
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {/* Depósito */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <ArrowDownLeft />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Depósito</p>
                <p className="text-xs text-gray-400">14:32</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-400">+ Kz 5.000,00</p>
                <p className="text-xs text-gray-400">Concluído</p>
              </div>
            </div>

            {/* Saque */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                <ArrowUpRight />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Saque</p>
                <p className="text-xs text-gray-400">11:15</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-red-400">- Kz 1.200,00</p>
                <p className="text-xs text-orange-400">Pendente</p>
              </div>
            </div>
          </div>

          {/* Ontem */}
          <div className="px-4 py-2 mt-4">
            <p className="text-sm font-semibold text-gray-400">
              Ontem, 23 de Julho
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {/* Lucro */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <TrendingUp />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Lucro de Plano</p>
                <p className="text-xs text-gray-400">18:00</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-400">+ Kz 75,50</p>
                <p className="text-xs text-gray-400">Concluído</p>
              </div>
            </div>

            {/* Investimento */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                <LineChart />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Investimento</p>
                <p className="text-xs text-gray-400">09:05</p>
              </div>

              <div className="text-right">
                <p className="font-bold">- Kz 10.000,00</p>
                <p className="text-xs text-gray-400">Concluído</p>
              </div>
            </div>

            {/* Depósito */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                <ArrowDownLeft />
              </div>

              <div className="flex-1">
                <p className="font-semibold">Depósito</p>
                <p className="text-xs text-gray-400">09:01</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-green-400">+ Kz 10.000,00</p>
                <p className="text-xs text-gray-400">Concluído</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM NAV COM LÓGICA DE ATIVO */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          {footerLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center gap-1 text-sm font-bold transition ${isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
                  }`}
              >
                {link.icon}
                <span className={`text-[11px] ${isActive ? "font-bold" : "font-medium"}`}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default Transactions;
