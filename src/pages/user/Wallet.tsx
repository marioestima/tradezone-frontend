import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  Plus,
  Wallet,
  User,
  X,
  BarChart2,
  ActivityIcon,
} from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import NavBar from "../../components/NavBar";

const WalletPage: React.FC = () => {
  const [balanceVisible, setBalanceVisible] = useState(false);

  const [filter, setFilter] = useState("all");
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [currencyStep, setCurrencyStep] = useState<"choice" | "method">("choice");
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      type: "deposit",
      title: "Depósito via PIX",
      date: "15 de Julho, 10:30",
      amount: "+ 1.000,00 Kz",
      icon: <ArrowDownLeft className="text-green-400" size={22} />,
      bg: "bg-green-500/10",
      color: "text-green-400",
    },
    {
      id: 2,
      type: "profit",
      title: "Lucro do Plano Alpha",
      date: "14 de Julho, 23:59",
      amount: "+ 57,30 Kz",
      icon: <TrendingUp className="text-green-400" size={22} />,
      bg: "bg-green-500/10",
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
      bg: "bg-green-500/10",
      color: "text-green-400",
    },
  ];

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const openDepositModal = () => {
    setCurrencyStep("choice");
    setSelectedCurrency(null);
    setDepositModalOpen(true);
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setCurrencyStep("method");
  };

  const handleMethodSelect = (method: string) => {
    navigate("/deposit/pay", {
      state: {
        currency: selectedCurrency,
        method: method,
      },
    });
  };

  return (
    <div className="font-display bg-[#0A0A0A] min-h-screen flex flex-col">
      {/* HEADER */}
      <NavBar  title="Minha Carteira"/>

      {/* MAIN */}
      <main className="flex-1 px-4 pb-24">
        {/* SALDO */}
        <section className="mt-3 rounded-2xl bg-linear-to-r from-indigo-700 via-purple-700 to-pink-600 p-6 relative overflow-hidden shadow-lg">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full rotate-45"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full rotate-12"></div>

          <div className="flex items-center justify-between">
            <p className="text-gray-200 text-sm">Saldo Disponível</p>

            <button
              onClick={() => setBalanceVisible(!balanceVisible)}
              className="text-gray-200"
            >
              {balanceVisible ? <Eye size={22} /> : <EyeOff size={22} />}
            </button>
          </div>

          <p className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-wider">
            {balanceVisible ? "15.750,50 Kz" : "••••••••••"}
          </p>

          <p className="mt-6 text-gray-300 tracking-widest text-sm">
            **** **** **** 1234
          </p>
        </section>

        {/* BOTÕES (MELHORADOS EM VERDE/VERMELHO E TEXTO BRANCO) */}
        <section className="flex gap-4 pt-6">
          <button
            onClick={openDepositModal}
            className="flex-1 h-14 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg"
          >
            <Plus size={20} />
            Depositar
          </button>

          <button
            onClick={() => setWithdrawModalOpen(true)}
            className="flex-1 h-14 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg"
          >
            <ArrowUpRight size={20} />
            Sacar
          </button>
        </section>

        {/* TÍTULO */}
        <h2 className="text-xl font-bold text-gray-50 pt-6 pb-2">
          Histórico de Transações
        </h2>

        {/* FILTROS */}
        <div className="flex gap-6 text-gray-400 text-sm border-b border-gray-800 pb-3">
          {["all", "deposit", "withdraw", "profit"].map((f, i) => (
            <button
              key={i}
              onClick={() => setFilter(f)}
              className={`pb-1 ${filter === f
                ? "text-green-400 border-green-400 border-b-2"
                : "text-gray-400"
                }`}
            >
              {f === "all"
                ? "Tudo"
                : f === "deposit"
                  ? "Depósitos"
                  : f === "withdraw"
                    ? "Saques"
                    : "Lucros"}
            </button>
          ))}
        </div>

        {/* LISTA */}
        <div className="flex flex-col">
          {filteredTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-4 py-4 border-b border-gray-800 w-full text-left"
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

      {/* MODAL DE SAQUE */}
      <Transition appear show={withdrawModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setWithdrawModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
          <div className="fixed inset-0 flex items-end justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-200"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="w-full max-w-md rounded-t-2xl bg-[#111] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">
                    Solicitar Saque
                  </h3>
                  <button onClick={() => setWithdrawModalOpen(false)}>
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                <p className="text-gray-300 mb-2">
                  Insira o valor do saque (mínimo 2.000 Kz):
                </p>
                <input
                  type="number"
                  min={2000}
                  className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white mb-4"
                  placeholder="Valor do Saque"
                />
                <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl">
                  Solicitar Saque
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* MODAL DE DEPÓSITO */}
      <Transition appear show={depositModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setDepositModalOpen(false)}
        >
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />

          <div className="fixed inset-0 flex items-end justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-200"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="w-full max-w-md rounded-t-2xl bg-[#111] p-6 space-y-4">
                {/* TÍTULO */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">
                    {currencyStep === "choice"
                      ? "Escolher Moeda"
                      : "Escolher Método"}
                  </h3>
                  <button onClick={() => setDepositModalOpen(false)}>
                    <X size={24} className="text-gray-400" />
                  </button>
                </div>

                {/* STEP 1 – Escolher moeda */}
                {currencyStep === "choice" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleCurrencySelect("USDT")}
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl"
                    >
                      Depositar em USDT
                    </button>

                    <button
                      onClick={() => handleCurrencySelect("KZ")}
                      className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
                    >
                      Depositar em Kwanza
                    </button>
                  </div>
                )}

                {/* STEP 2 – Escolher método */}
                {currencyStep === "method" && (
                  <div className="space-y-4">
                    {selectedCurrency === "USDT" && (
                      <>
                        <button
                          onClick={() => handleMethodSelect("Binance")}
                          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl"
                        >
                          Binance Pay / Wallet
                        </button>

                        <button
                          onClick={() => handleMethodSelect("RedHot")}
                          className="w-full bg-red-400 text-black font-bold py-3 rounded-xl"
                        >
                          RedHot Wallet
                        </button>
                      </>
                    )}

                    {selectedCurrency === "KZ" && (
                      <>
                        <button
                          onClick={() => handleMethodSelect("BAI")}
                          className="w-full bg-blue-400 text-black font-bold py-3 rounded-xl"
                        >
                          BAI Mobile
                        </button>

                        <button
                          onClick={() => handleMethodSelect("BFA")}
                          className="w-full bg-orange-400 text-black font-bold py-3 rounded-xl"
                        >
                          BFA
                        </button>

                        <button
                          onClick={() => handleMethodSelect("BIC")}
                          className="w-full bg-green-400 text-black font-bold py-3 rounded-xl"
                        >
                          BIC
                        </button>
                      </>
                    )}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* NAVBAR */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            to="/wallet"
            className="flex flex-col items-center gap-1 text-green-400"
          >
            <Wallet size={22} />
            <span className="text-[11px] font-bold">Carteira</span>
          </Link>

          <Link
            to="/plans"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-green-500"
          >
            <BarChart2 size={22} />
            <span className="text-[11px] font-bold">Planos</span>
          </Link>

          <Link
            to="/transactions"
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-green-500"
          >
            <ActivityIcon className="w-5 h-5" />
            <span className="text-[11px] font-bold">Transações</span>
          </Link>

          <Link
            to="/profile"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <User size={22} />
            <span className="text-[11px] font-bold">Perfil</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default WalletPage;
