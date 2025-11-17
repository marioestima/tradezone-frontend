import { Home, BarChart2, Wallet, User, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

import NavBar from "../../components/NavBar";
import { userService } from "../../services/userService";
import { planService, type Plan as ApiPlan } from "../../services/planService";
import { dailyProfitService, type DailyProfit } from "../../services/dailyProfitService";

// Tipos
type User = {
  id: number;
  name: string;
  email: string;
  phone?: number;
  balance: number;
  bankAccount?: string | null;
  bankName?: string | null;
};

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
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [chartData, setChartData] = useState<ProfitData[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const formatKz = (value: number) =>
    new Intl.NumberFormat("pt-AO", { style: "currency", currency: "AOA" }).format(value);

  useEffect(() => {
    const loadData = async () => {
      console.log("🔄 Carregando Dashboard...");

      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("❌ Token não encontrado. Redirecionando para login...");
        navigate("/login");
        return;
      }

      // ======================
      // 1. PEGAR USUÁRIO LOGADO
      // ======================
      try {
        const me = await userService.getMe();
        console.log("📌 Usuário logado:", me);
        setUser(me);
      } catch (err: any) {
        console.error("❌ ERRO AO PEGAR USUÁRIO:", err);
      }

      // ======================
      // 2. LUCROS DIÁRIOS
      // ======================
      try {
        const profits: DailyProfit[] = await dailyProfitService.getAll();
        console.log("📈 Lucros recebidos:", profits);

        const last7 = profits.slice(-7);
        const formatted = last7.map((p) => ({
          day: new Date(p.date).toLocaleDateString("pt-AO", { day: "2-digit", month: "2-digit" }),
          profit: p.amount,
        }));

        setChartData(formatted);
      } catch (err: any) {
        console.error("❌ ERRO AO PUXAR DAILY PROFIT:", err);
      }

      // ======================
      // 3. PLANOS
      // ======================
      try {
        const allPlans: ApiPlan[] = await planService.getAll();
        console.log("💼 Planos recebidos da API:", allPlans);

        const mapped = allPlans.map((p) => ({
          id: p.id,
          amount: p.value,
          returnAmount: p.value + (p.value * p.dailyProfitPct * 60) / 100,
          profitRate: p.dailyProfitPct,
        }));

        setPlans(mapped);
      } catch (err: any) {
        console.error("❌ ERRO AO PUXAR PLANOS:", err);
      }
    };

    loadData();
  }, [navigate]);

  const totalInvestido = plans.reduce((sum, p) => sum + p.amount, 0);
  const lucroMedio = chartData.length
    ? chartData.reduce((sum, c) => sum + c.profit, 0) / chartData.length
    : 0;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#0A0A0A] font-display text-white">
      <NavBar title={`Bem-vindo ${user?.name || ""}`} />

      <main className="flex-1 px-4 py-2 pb-28">
        {/* SALDO E TOTAL INVESTIDO */}
        <section className="mt-4 flex flex-col gap-4 rounded-xl bg-zinc-900/70 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="h-10 w-px bg-zinc-700"></div>
            <div className="flex gap-8">
              <div>
                <p className="text-sm text-zinc-400">Saldo</p>
                <p className="text-2xl font-bold text-green-500">{formatKz(user?.balance || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Investido</p>
                <p className="text-2xl font-bold text-blue-500">{formatKz(totalInvestido)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* LUCRO DIÁRIO */}
        <section className="mt-6 flex flex-col gap-2 rounded-xl bg-zinc-900/70 p-4 backdrop-blur-sm">
          <p className="text-base font-medium text-zinc-400">Lucro Diário</p>
          <p className="text-3xl font-bold text-white">{formatKz(lucroMedio)}</p>

          <div className="mt-4 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" stroke="#555" />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", border: "none", color: "#fff" }}
                  formatter={(value: number) => formatKz(value)}
                />
                <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* PLANOS */}
        <section className="mt-6 flex flex-col gap-4">
          {plans.length === 0 ? (
            <p className="text-zinc-400 text-center">Nenhum plano disponível no momento.</p>
          ) : (
            plans.map((plan) => (
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
                    <p className="text-base font-medium">{formatKz(plan.amount)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Retorno Atual</p>
                    <p className="text-base font-medium text-green-500">{formatKz(plan.returnAmount)}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </section>
      </main>

      {/* MODAL */}
      <Transition appear show={!!selectedPlan} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedPlan(null)}>
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
                <h3 className="text-lg font-bold text-green-500">Plano {selectedPlan?.id}</h3>
                <button onClick={() => setSelectedPlan(null)}>
                  <X className="text-zinc-400 hover:text-white" />
                </button>
              </div>

              <button className="mt-6 w-full rounded-xl bg-green-500 py-2 text-white font-bold hover:bg-green-600 transition">
                Investir Agora
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center ${location.pathname === "/dashboard" ? "text-green-500" : "text-zinc-400"
              }`}
          >
            <Home size={20} />
            <span className="text-[11px] font-bold">Início</span>
          </Link>
          <Link
            to="/plans"
            className={`flex flex-col items-center ${location.pathname === "/plans" ? "text-green-500" : "text-zinc-400"
              }`}
          >
            <BarChart2 size={20} />
            <span className="text-[11px] font-bold">Planos</span>
          </Link>
          <Link
            to="/wallet"
            className={`flex flex-col items-center ${location.pathname === "/wallet" ? "text-green-500" : "text-zinc-400"
              }`}
          >
            <Wallet size={20} />
            <span className="text-[11px] font-bold">Carteira</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center ${location.pathname === "/profile" ? "text-green-500" : "text-zinc-400"
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
