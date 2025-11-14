import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  Search,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  X,
  TrendingUp,
  Calendar,
  Coins,
  User,
  Wallet,
  ActivityIcon,
  BarChart2,
} from "lucide-react";
import NavBar from "../../components/NavBar";


interface Plan {
  id: string;
  status: "Ativo" | "Pendente" | "Fechado";
  investment: number;
  dailyProfit: number;
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filter, setFilter] = useState<"Abertos" | "Fechados">("Abertos");
  const [search, setSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);


  // Simula chamada à API
  useEffect(() => {
    const fakePlans: Plan[] = [
      { id: "TZ12345", status: "Ativo", investment: 10000, dailyProfit: 75.5 },
      { id: "TZ67890", status: "Ativo", investment: 5000, dailyProfit: 35.2 },
      { id: "TZ54321", status: "Ativo", investment: 2500, dailyProfit: -5.1 },
    ];
    setPlans(fakePlans);
  }, []);

  const filteredPlans = plans
    .filter((p) =>
      filter === "Abertos" ? p.status !== "Fechado" : p.status === "Fechado"
    )
    .filter((p) => p.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0A0A0A] text-white font-display pb-24">
      {/* Header */}
      <NavBar title="Meus Planos" />

      {/* Filtros e busca */}
      <main className="flex-1">
        <div className="px-4 py-3 space-y-4">
          <div className="flex h-12 items-center justify-center rounded-lg bg-zinc-900 p-1">
            <button
              onClick={() => setFilter("Abertos")}
              className={`flex-1 h-full rounded-md text-sm font-medium transition-colors ${filter === "Abertos"
                ? "bg-background-dark text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              Planos Abertos
            </button>

            <button
              onClick={() => setFilter("Fechados")}
              className={`flex-1 h-full rounded-md text-sm font-medium transition-colors ${filter === "Fechados"
                ? "bg-background-dark text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              Planos Fechados
            </button>
          </div>

          <div className="flex items-center gap-2 bg-zinc-900 rounded-lg h-12 px-3">
            <Search className="text-zinc-500" size={18} />
            <input
              type="text"
              placeholder="Buscar por número do plano"
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-zinc-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Cards dos planos */}
        <div className="flex flex-col gap-4 p-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => (plan.status !== "Fechado" ? setSelectedPlan(plan) : null)}
              className={`flex flex-col rounded-xl p-4 border border-neutral-800 transition-all ${plan.status === "Fechado"
                ? "bg-zinc-900 opacity-60 hover:opacity-80"
                : "bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98]"
                }`}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-zinc-400 font-medium">Plano #{plan.id}</p>
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${plan.status === "Ativo"
                    ? "bg-green-500/20 text-green-400"
                    : plan.status === "Pendente"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-zinc-700/20 text-zinc-500"
                    }`}
                >
                  <div
                    className={`size-1.5 rounded-full ${plan.status === "Ativo"
                      ? "bg-green-400"
                      : plan.status === "Pendente"
                        ? "bg-orange-400"
                        : "bg-zinc-500"
                      }`}
                  ></div>
                  {plan.status}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-zinc-400">Investimento</p>
                <p className="text-2xl font-bold text-white">
                  Kz {plan.investment.toLocaleString()}
                </p>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-zinc-400">Lucro Diário</p>
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-base font-semibold ${plan.dailyProfit > 0 ? "text-green-400" : "text-red-500"
                        }`}
                    >
                      {plan.dailyProfit > 0 ? "+" : ""}
                      Kz {Math.abs(plan.dailyProfit).toFixed(2)}
                    </p>
                    {plan.dailyProfit > 0 ? (
                      <ArrowUp size={18} className="text-green-400" />
                    ) : (
                      <ArrowDown size={18} className="text-red-500" />
                    )}
                  </div>
                </div>
                <MoreVertical className="text-zinc-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer fixa com links corretos */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            to="/plans"
            className="flex flex-col items-center gap-1 text-green-500"
          >
            <BarChart2 size={20} />
            <span className="text-[11px] font-bold">Planos</span>
          </Link>

          <Link
            to="/wallet"
            className="flex flex-col items-center gap-1 text-zinc-500 hover:text-green-500 transition"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[11px] font-bold">Carteira</span>
          </Link>

          <Link
            to="/transactions"
            className="flex flex-col items-center gap-1 text-zinc-500 hover:text-green-500 transition"
          >
            <ActivityIcon className="w-5 h-5" />
            <span className="text-[11px] font-bold">Transações</span>
          </Link>

          <Link
            to="/profile"
            className="flex flex-col items-center gap-1 text-zinc-500 hover:text-green-500 transition"
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] font-bold">Perfil</span>
          </Link>
        </div>
      </footer>

      {/* Modal de investimento */}
      <Transition appear show={!!selectedPlan} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setSelectedPlan(null)}
        >
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
                    <p className="text-zinc-300">
                      Lucro Diário:{" "}
                      <span className="text-green-500 font-semibold">
                        KZ 750,00
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    <p className="text-zinc-300">
                      Lucro Mensal:{" "}
                      <span className="text-green-500 font-semibold">
                        KZ 22.500,00
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins size={16} className="text-green-500" />
                    <p className="text-zinc-300">
                      Investimento:{" "}
                      <span className="text-green-500 font-semibold">
                        KZ {selectedPlan?.investment.toLocaleString()}
                      </span>
                    </p>
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

    </div>
  );
}
