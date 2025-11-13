import { Home, BarChart2, Wallet, User, ArrowUp, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Tipos TypeScript
type Plano = {
  id: number;
  valor: number;
  retorno: number;
  lucro: number;
};

type LucroData = {
  dia: string;
  lucro: number;
};

const Dashboard = () => {
  const [dados, setDados] = useState<LucroData[]>([]);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [notificacoes, setNotificacoes] = useState<number>(3); // Mock de notificações

  // Simula chamada à API
  useEffect(() => {
    setTimeout(() => {
      setPlanos([
        { id: 1, valor: 12000, retorno: 1800, lucro: 15 },
        { id: 2, valor: 25000, retorno: 3750, lucro: 15 },
        { id: 3, valor: 50000, retorno: 7500, lucro: 15 },
        { id: 4, valor: 100000, retorno: 15000, lucro: 15 },
      ]);

      setDados([
        { dia: "S", lucro: 120 },
        { dia: "T", lucro: 90 },
        { dia: "Q", lucro: 140 },
        { dia: "Q", lucro: 100 },
        { dia: "S", lucro: 150 },
        { dia: "S", lucro: 70 },
        { dia: "H", lucro: 130 },
      ]);
    }, 800);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#0A0A0A] font-display">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0A0A0A]/80 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDaua3ZJo-aK_ROmAmJ9xUv94ROudmtfQqzK1IqipBDvD8AWn9KQ1mI-WTgUha-SMzEOM9w4Vhm9B89QUrNTCfMpBCvhpPsbiYo75rFFb4jl7w7bM0LiF2DK0TXjpBoerjl1KaAfXmcgQfKEfjaAcfHTHnkEvekGS47B5sNJ5EDXOafynRja0WIcfx6n0MLIFVLuUdsUwFS7QCgaUwA-3m_zpiEuLLH_viRjjCbwVDWOlwva7Y-LkHYmIE1DH19_G3dBOyk2dCCzk6p)",
            }}
          />
          <h2 className="text-lg font-bold text-white">Olá, Tradezoner</h2>
        </div>

        {/* Notificações com badge */}
        <div className="relative">
          <a href="/notifications" className="text-zinc-100">
            <Bell size={24} />
          </a>
          {notificacoes > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
              {notificacoes}
            </span>
          )}
        </div>
      </div>

      {/* Main */}
      <main className="flex-1 px-4 py-2">
        {/* Totais */}
        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-zinc-900 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-400">Valor Total Investido</p>
              <p className="text-2xl font-bold text-white">25.480,50 Kz</p>
            </div>
            <div className="h-10 w-px bg-zinc-700"></div>
            <div className="text-right">
              <p className="text-sm text-zinc-400">Lucro Total</p>
              <p className="text-2xl font-bold text-green-500">3.120,75 Kz</p>
            </div>
          </div>
        </div>

        {/* Lucro Diário + Gráfico */}
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-base font-medium text-zinc-400">Lucro Diário</p>
          <p className="text-2xl font-bold text-white">150,30 Kz</p>
          <div className="flex items-center gap-1">
            <ArrowUp size={14} className="text-green-500" />
            <p className="text-sm font-medium text-green-500">+2.5%</p>
            <span className="text-sm text-zinc-500 ml-1">Últimos 7 dias</span>
          </div>

          {/* Gráfico Recharts */}
          <div className="mt-4 h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dados}>
                <XAxis dataKey="dia" stroke="#555" />
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
                  dataKey="lucro"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Planos */}
        <div className="mt-6 flex flex-col gap-4">
          {planos.map((plano) => (
            <div
              key={plano.id}
              className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  Plano {plano.id}
                </h3>
                <div className="flex items-center gap-2">
                  <ArrowUp size={16} className="text-green-500" />
                  <span className="px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
                    {plano.lucro}%
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Valor Aplicado</p>
                  <p className="text-base font-medium text-white">
                    {plano.valor.toLocaleString()} Kz
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-zinc-400">Retorno Atual</p>
                  <p className="text-base font-medium text-green-500">
                    {plano.retorno.toLocaleString()} Kz
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-zinc-800 bg-[#0A0A0A]/90 px-4 pt-3 pb-6 backdrop-blur-sm">
        <div className="mx-auto grid max-w-md grid-cols-4 items-center justify-items-center gap-2">
          <a className="flex flex-col items-center text-green-500" href="/">
            <Home size={20} />
            <span className="text-[11px] font-bold">Início</span>
          </a>
          <a
            className="flex flex-col items-center text-zinc-400"
            href="/plans"
          >
            <BarChart2 size={20} />
            <span className="text-[11px] font-bold">Planos</span>
          </a>
          <a
            className="flex flex-col items-center text-zinc-400"
            href="/wallet"
          >
            <Wallet size={20} />
            <span className="text-[11px] font-bold">Carteira</span>
          </a>
          <a
            className="flex flex-col items-center text-zinc-400"
            href="/profile"
          >
            <User size={20} />
            <span className="text-[11px] font-bold">Perfil</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
