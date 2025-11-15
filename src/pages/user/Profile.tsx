import { useState, type JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Edit2,
  Home,
  Wallet,
  User,
  ActivityIcon,
  Info,
  Users,
  Briefcase,
  Copy,
} from "lucide-react";
import NavBar from "../../components/NavBar";

interface Friend {
  name: string;
  level: "A" | "B" | "C";
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: "Pago" | "Pendente";
}

interface CompanyLink {
  title: string;
  to: string;
  icon: JSX.Element;
}

const Profile = () => {
  const [inviteCopied, setInviteCopied] = useState(false);
  const location = useLocation();

  const friends: Friend[] = [
    { name: "Ana Silva", level: "A" },
    { name: "João Pedro", level: "B" },
    { name: "Maria Santos", level: "C" },
  ];

  const transactions: Transaction[] = [
    { id: "TX12345", date: "10/11/2025", amount: 5000, status: "Pago" },
    { id: "TX12346", date: "11/11/2025", amount: 1200, status: "Pendente" },
  ];

  const companyLinks: CompanyLink[] = [
    { title: "Sobre Nós", to: "/about", icon: <Info size={24} /> },
    { title: "Equipe", to: "/team", icon: <Users size={24} /> },
    { title: "Carreiras", to: "/careers", icon: <Briefcase size={24} /> },
  ];

  const inviteLink = "https://tradezone.com/invite/XYZ123";

  const copyInvite = async () => {
    await navigator.clipboard.writeText(inviteLink);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  // Footer links
  const footerLinks = [
    { to: "/dashboard", label: "Início", icon: <Home size={20} /> },
    { to: "/wallet", label: "Carteira", icon: <Wallet size={20} /> },
    { to: "/transactions", label: "Transações", icon: <ActivityIcon size={20} /> },
    { to: "/profile", label: "Perfil", icon: <User size={20} /> },
  ];

  return (
    <div className="bg-neutral-900 text-white min-h-screen pb-24">
      {/* HEADER */}
      <NavBar title="Meu Perfil" />

      <main className="px-4 py-6 space-y-6">
        {/* FOTO + NOME + LINK DE CONVITE */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              alt="Foto do usuário"
              className="h-24 w-24 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByEEx7CMBOEvrXaJIwJCb5xTCoVJhSfRVmIg42-siArrPevgimllY8MOl9-iF-cDD_z_UdHIPdqTDxFg18UyPyFUs_2zs_EiZPL-GoKwvSmkUDOkPggHKdJ9t4XYVfw6PJoBUjwl-A-zACu_4-QoxmBUy8-sW1K63fnQKtlyhE5rArBGYsILeBBGsBP2MIomWVIy5JSASNHVVLvyqR728jvkYjRc2d1i2LoRk050OraRL2Rtm6UJSa4n0SEKs4gzjQ58W_zFkAEee-"
            />
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-900 bg-green-500 text-neutral-900">
              <Edit2 size={16} />
            </button>
          </div>
          <h2 className="mt-4 text-2xl font-bold">Mario Jose</h2>
          <p className="text-sm text-neutral-400">amelia.vunge@email.com</p>

          {/* LINK DE CONVITE */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-green-400 font-semibold break-all">
              {inviteLink}
            </span>
            <button
              onClick={copyInvite}
              className="p-1 rounded bg-green-500 hover:bg-green-600 transition"
            >
              <Copy size={16} />
            </button>
            {inviteCopied && (
              <span className="text-xs text-green-300">Copiado!</span>
            )}
          </div>
        </div>

        {/* INFORMAÇÕES PESSOAIS */}
        <section className="space-y-3">
          <h3 className="mb-2 text-sm font-medium text-neutral-400">
            Informações Pessoais
          </h3>
          <div className="rounded-xl bg-linear-to-r from-indigo-600 to-indigo-400 p-4 shadow-lg">
            <div className="flex justify-between">
              <span>Nome Completo</span>
              <span className="font-medium">Amelia Vunge</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Telefone</span>
              <span className="font-medium">+244 9XX XXX XXX</span>
            </div>
          </div>
        </section>

        {/* AMIGOS / PESSOAS CONVIDADAS */}
        <section className="space-y-3">
          <h3 className="mb-2 text-sm font-medium text-neutral-400">
            Amigos / Pessoas Convidadas
          </h3>
          <div className="flex flex-col gap-3">
            {friends.map((friend) => (
              <div
                key={friend.name}
                className="rounded-xl bg-linear-to-r from-indigo-500 to-indigo-300 p-4 shadow-md flex justify-between items-center"
              >
                <span>{friend.name}</span>
                <span className="font-bold text-white">{friend.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SOBRE A EMPRESA (cards clicáveis) */}
        <section className="space-y-3">
          <h3 className="mb-2 text-sm font-medium text-neutral-400">
            Sobre a Empresa
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {companyLinks.map((link) => (
              <Link
                key={link.title}
                to={link.to}
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-400 p-4 shadow-md text-white hover:scale-105 transition"
              >
                {link.icon}
                <span className="text-xs font-bold">{link.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* TRANSACOES */}
        <section className="space-y-3">
          <h3 className="mb-2 text-sm font-medium text-neutral-400">Transações</h3>
          <div className="flex flex-col gap-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="rounded-xl p-4 shadow-md flex justify-between items-center bg-linear-to-r from-indigo-400 to-indigo-600"
              >
                <div>
                  <p className="font-medium">{tx.id}</p>
                  <p className="text-xs text-neutral-200">{tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Kz {tx.amount.toLocaleString()}</p>
                  <p
                    className={`text-xs ${
                      tx.status === "Pago" ? "text-green-400" : "text-yellow-400"
                    }`}
                  >
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* BOTTOM NAV */}
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-background-dark/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          {footerLinks.map((link) => {
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
                <span className="text-[11px] font-bold">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default Profile;
