import { Home, BarChart2, Wallet, User, ArrowUp, X, TrendingUp, Calendar, Coins } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import NavBar from "../../components/NavBar";

// Tipos
type Plan = {
  id: number;
  amount: number;
  returnAmount: number;
  profitRate: number;
};

type ProfitData = {
  day: string;
  profit: number;
};

const Dashboard = () => {
  const [chartData, setChartData] = useState<ProfitData[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const location = useLocation(); // <--- para rota ativa

  // Mock API
  useEffect(() => {
    setTimeout(() => {
      setPlans([
        { id: 1, amount: 5000, returnAmount: 22500, profitRate: 15 },
        { id: 2, amount: 12000, returnAmount: 37500, profitRate: 15 },
        { id: 3, amount: 25000, returnAmount: 75000, profitRate: 15 },
        { id: 4, amount: 50000, returnAmount: 150000, profitRate: 15 },
      ]);

      setChartData([
        { day: "S", profit: 120 },
        { day: "T", profit: 90 },
        { day: "Q", profit: 140 },
        { day: "Q", profit: 100 },
        { day: "S", profit: 150 },
        { day: "S", profit: 70 },
        { day: "H", profit: 130 },
      ]);
    }, 800);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#0A0A0A] font-display text-white">
      {/* CABEÇALHO */}
      <NavBar title="Bem vindo Mario Jose" />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 px-4 py-2 pb-28">
        {/* RESUMO */}
        <section className="mt-4 flex flex-col gap-4 rounded-xl bg-zinc-900/70 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Total Investido</p>
              <p className="text-2xl font-bold">25.480,50 Kz</p>
            </div>
            <div className="h-10 w-px bg-zinc-700"></div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Lucro Total</p>
              <p className="text-2xl font-bold text-green-500">3.120,75 Kz</p>
            </div>
          </div>
        </section>

        {/* LUCRO DIÁRIO */}
        <section className="mt-6 flex flex-col gap-2 rounded-xl bg-zinc-900/70 p-4 backdrop-blur-sm">
          <p className="text-base font-medium text-zinc-400">Lucro Diário</p>
          <p className="text-3xl font-bold text-white">150,30 Kz</p>
          <div className="flex items-center gap-2">
            <ArrowUp size={16} className="text-green-500" />
            <p className="text-sm font-medium text-green-500">+2.5%</p>
            <span className="text-sm text-zinc-500 ml-1">Últimos 7 dias</span>
          </div>

          <div className="mt-4 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" stroke="#555" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* PLANOS DE INVESTIMENTO */}
        <section className="mt-6 flex flex-col gap-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className="flex flex-col gap-4 rounded-xl bg-zinc-900/70 p-4 backdrop-blur-sm border border-zinc-800 text-left transition hover:scale-[1.01] hover:bg-zinc-800/80"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">Plano {plan.id}</h3>
                <span className="px-2 py-1 text-xs font-bold text-white bg-green-500/80 rounded-full">
                  {plan.profitRate}% de Lucro
                </span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Valor Investido</p>
                  <p className="text-base font-medium">
                    {plan.amount.toLocaleString()} Kz
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Retorno Atual</p>
                  <p className="text-base font-medium text-green-500">
                    {plan.returnAmount.toLocaleString()} Kz
                  </p>
                </div>
              </div>
            </button>
          ))}
        </section>
      </main>

      {/* MODAL DE DETALHES */}
      <Transition appear show={!!selectedPlan} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedPlan(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-zinc-900 p-6 border border-zinc-700 text-center">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-green-500">
                    NÍVEL {selectedPlan?.id}
                  </h3>
                  <button onClick={() => setSelectedPlan(null)}>
                    <X className="text-zinc-400 hover:text-white" />
                  </button>
                </div>
                <p className="text-sm text-zinc-400 mb-4">
                  Nível {selectedPlan?.id} • 90 dias
                </p>

                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-green-500" />
                    <p className="text-white">Lucro Diário: <span className="text-green-500 font-semibold">KZ 750,00</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    <p className="text-white">Lucro Mensal: <span className="text-green-500 font-semibold">KZ 22.500,00</span></p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins size={16} className="text-green-500" />
                    <p className="text-white">Investimento: <span className="text-green-500 font-semibold">KZ {selectedPlan?.amount.toLocaleString()}</span></p>
                  </div>
                </div>

                <button className="mt-6 w-full rounded-xl bg-green-500 py-2 text-white font-bold hover:bg-green-600 transition">
                  Investir Agora
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* RODAPÉ */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center ${location.pathname === "/dashboard" ? "text-green-500" : "text-zinc-400 hover:text-green-500"
              }`}
          >
            <Home size={20} />
            <span className="text-[11px] font-bold">Início</span>
          </Link>

          <Link
            to="/plans"
            className={`flex flex-col items-center ${location.pathname === "/plans" ? "text-green-500" : "text-zinc-400 hover:text-green-500"
              }`}
          >
            <BarChart2 size={20} />
            <span className="text-[11px] font-bold">Planos</span>
          </Link>

          <Link
            to="/wallet"
            className={`flex flex-col items-center ${location.pathname === "/wallet" ? "text-green-500" : "text-zinc-400 hover:text-green-500"
              }`}
          >
            <Wallet size={20} />
            <span className="text-[11px] font-bold">Carteira</span>
          </Link>

          <Link
            to="/profile"
            className={`flex flex-col items-center ${location.pathname === "/profile" ? "text-green-500" : "text-zinc-400 hover:text-green-500"
              }`}
          >
            <User size={20} />
            <span className="text-[11px] font-bold">Perfil</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
