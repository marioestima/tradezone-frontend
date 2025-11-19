 import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // ✅ toast
import {
  Search,
  MoreVertical,
  ArrowUp,
  ArrowDown,
  X,
  User,
  Wallet,
  ActivityIcon,
  BarChart2,
} from "lucide-react";
import NavBar from "../../components/NavBar";
import { usePlans, type Plan as FrontPlan } from "../../hooks/usePlans";

 
const formatKz = (value: number) => `Kz ${value.toLocaleString()}`;

export default function Plans() {
  const { plans, loading, error } = usePlans();
  const [filter, setFilter] = useState<"Comum" | "VIP">("Comum");
  const [search, setSearch] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<FrontPlan | null>(null);
  const [walletBalance, setWalletBalance] = useState(1000000); // saldo inicial
  const location = useLocation();

  const filteredPlans = plans
    .filter((p) => (filter === "Comum" ? p.profitRate >= 0 : p.profitRate < 0))
    .filter((p) => p.id.toString().includes(search));

  const links = [
    { to: "/plans", label: "Planos", icon: <BarChart2 size={20} /> },
    { to: "/wallet", label: "Carteira", icon: <Wallet size={20} /> },
    { to: "/transactions", label: "Transações", icon: <ActivityIcon size={20} /> },
    { to: "/profile", label: "Perfil", icon: <User size={20} /> },
  ];

  // Investir no plano
  const handleInvest = () => {
    if (!selectedPlan) return;

    if (walletBalance >= selectedPlan.amount) {
      setWalletBalance(walletBalance - selectedPlan.amount);
      toast.success(`Investimento realizado no plano #${selectedPlan.id}!`);
      setSelectedPlan(null);
    } else {
      toast.error("Saldo insuficiente para investir neste plano.");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Carregando planos...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0A0A0A] text-white font-display pb-24">
      {/* Toaster */}
      <Toaster position="top-right" />

      <NavBar title="Meus Planos" />

      <main className="flex-1">
        <div className="px-4 py-3 space-y-4">
          <div className="flex h-12 items-center justify-center rounded-lg bg-zinc-900 p-1">
            <button
              onClick={() => setFilter("Comum")}
              className={`flex-1 h-full rounded-md text-sm font-medium transition-colors ${
                filter === "Comum"
                  ? "bg-background-dark text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Planos Comuns
            </button>

            <button
              onClick={() => setFilter("VIP")}
              className={`flex-1 h-full rounded-md text-sm font-medium transition-colors ${
                filter === "VIP"
                  ? "bg-background-dark text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Planos VIP
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

          {/* Saldo da carteira */}
          <p className="text-sm text-green-400 mt-2">
            Saldo da carteira: {formatKz(walletBalance)}
          </p>
        </div>

        {/* Cards dos planos */}
        <div className="flex flex-col gap-4 p-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`flex flex-col rounded-xl p-4 border border-neutral-800 transition-all ${
                filter === "VIP"
                  ? "bg-yellow-900 hover:bg-yellow-800 active:scale-[0.98]"
                  : "bg-zinc-900 hover:bg-zinc-800 active:scale-[0.98]"
              }`}
            >
              <div className="flex items-start justify-between">
                <p className="text-sm text-zinc-400 font-medium">Plano #{plan.id}</p>
                <div
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    filter === "Comum"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      filter === "Comum" ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  ></div>
                  {filter === "Comum" ? "Comum" : "VIP"}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-zinc-400">Investimento</p>
                <p className="text-2xl font-bold text-white">{formatKz(plan.amount)}</p>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-xs text-zinc-400">Lucro Diário</p>
                  <div className="flex items-center gap-1.5">
                    <p
                      className={`text-base font-semibold ${
                        plan.profitRate > 0 ? "text-green-400" : "text-red-500"
                      }`}
                    >
                      {plan.profitRate > 0 ? "+" : ""}
                      {plan.profitRate.toFixed(2)}
                    </p>
                    {plan.profitRate > 0 ? (
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

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center gap-1 text-sm font-bold transition ${
                  isActive ? "text-green-500" : "text-gray-500 hover:text-green-500"
                }`}
              >
                {link.icon}
                <span className="text-[11px]">{link.label}</span>
              </Link>
            );
          })}
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
            enter="transform transition ease-out duration-300"
            enterFrom="-translate-y-96 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-96 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-zinc-900 p-6 border border-zinc-700 text-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-green-500">
                  Plano {selectedPlan?.id}
                </h3>
                <button onClick={() => setSelectedPlan(null)}>
                  <X className="text-zinc-400 hover:text-white" />
                </button>
              </div>

              <p className="text-sm text-zinc-400 mb-4">
                Valor do plano: {formatKz(selectedPlan?.amount || 0)}
              </p>

              <button
                onClick={handleInvest}
                className="mt-6 w-full rounded-xl bg-green-500 py-2 text-white font-bold hover:bg-green-600 transition"
              >
                Investir Agora
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
