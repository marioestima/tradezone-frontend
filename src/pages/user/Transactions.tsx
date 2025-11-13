import { Link } from "react-router-dom";
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
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased pb-24 bg-background-light bg-[#0A0A0A] font-display">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 pt-4 pb-2">
        <div className="flex items-center">
          <h1 className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold flex-1">
            Transações
          </h1>

          <div className="flex items-center gap-2">
            <button className="flex size-10 items-center justify-center rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
              <Bell />
            </button>

            <button className="flex size-10 items-center justify-center rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/5 dark:hover:bg-white/5">
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
              <select className="form-select w-full appearance-none rounded-lg border-none bg-surface-dark py-3 pl-4 pr-10 text-sm font-medium text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>Todos os tipos</option>
                <option>Depósitos</option>
                <option>Saques</option>
                <option>Investimentos</option>
                <option>Lucros</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-dark pointer-events-none" />
            </div>

            {/* Intervalo */}
            <div className="relative">
              <select className="form-select w-full appearance-none rounded-lg border-none bg-surface-dark py-3 pl-4 pr-10 text-sm font-medium text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50">
                <option>Este mês</option>
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Este ano</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-dark pointer-events-none" />
            </div>
          </div>
        </div>

        {/* LISTA */}
        <div className="flex flex-col">
          {/* Hoje */}
          <div className="px-4 py-2">
            <p className="text-sm font-semibold text-text-secondary-dark">
              Hoje, 24 de Julho
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {/* Depósito */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ArrowDownLeft />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-text-primary-dark">Depósito</p>
                <p className="text-xs text-text-secondary-dark">14:32</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-accent-positive">+ Kz 5.000,00</p>
                <p className="text-xs text-text-secondary-dark">Concluído</p>
              </div>
            </div>

            {/* Saque */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-accent-negative/20 text-accent-negative">
                <ArrowUpRight />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-text-primary-dark">Saque</p>
                <p className="text-xs text-text-secondary-dark">11:15</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-accent-negative">- Kz 1.200,00</p>
                <p className="text-xs text-orange-400">Pendente</p>
              </div>
            </div>
          </div>

          {/* Ontem */}
          <div className="px-4 py-2 mt-4">
            <p className="text-sm font-semibold text-text-secondary-dark">
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
                <p className="font-semibold text-text-primary-dark">Lucro de Plano</p>
                <p className="text-xs text-text-secondary-dark">18:00</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-accent-positive">+ Kz 75,50</p>
                <p className="text-xs text-text-secondary-dark">Concluído</p>
              </div>
            </div>

            {/* Investimento */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                <LineChart />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-text-primary-dark">Investimento</p>
                <p className="text-xs text-text-secondary-dark">09:05</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-text-primary-dark">- Kz 10.000,00</p>
                <p className="text-xs text-text-secondary-dark">Concluído</p>
              </div>
            </div>

            {/* Depósito */}
            <div className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                <ArrowDownLeft />
              </div>

              <div className="flex-1">
                <p className="font-semibold text-text-primary-dark">Depósito</p>
                <p className="text-xs text-text-secondary-dark">09:01</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-accent-positive">+ Kz 10.000,00</p>
                <p className="text-xs text-text-secondary-dark">Concluído</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">

          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 text-text-secondary-dark hover:text-primary transition-colors"
          >
            <Home />
            <span className="text-xs font-medium">Início</span>
          </Link>

          <a className="flex flex-col items-center gap-1 text-text-secondary-dark hover:text-primary transition-colors">
            <Wallet />
            <span className="text-xs font-medium">Carteira</span>
          </a>

          <a className="flex flex-col items-center gap-1 text-primary">
            <Replace />
            <span className="text-xs font-bold">Transações</span>
          </a>

          <a className="flex flex-col items-center gap-1 text-text-secondary-dark hover:text-primary transition-colors">
            <User />
            <span className="text-xs font-medium">Perfil</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Transactions;
