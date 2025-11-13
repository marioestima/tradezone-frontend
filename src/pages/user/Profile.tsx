import { Link } from "react-router-dom";
import {
  Bell,
  Edit2,
  Settings,
  LogOut,
  ChevronRight,
  Home,
  Wallet,
  Repeat,
  User,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="bg-background-dark font-display text-text-primary-dark min-h-screen pb-24">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-background-dark/80 backdrop-blur-sm px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Perfil</h1>
          <button className="flex size-10 items-center justify-center rounded-full text-text-secondary-dark hover:bg-white/5">
            <Bell size={24} />
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-6">
        {/* FOTO + NOME */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              alt="Foto do usuário"
              className="h-24 w-24 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByEEx7CMBOEvrXaJIwJCb5xTCoVJhSfRVmIg42-siArrPevgimllY8MOl9-iF-cDD_z_UdHIPdqTDxFg18UyPyFUs_2zs_EiZPL-GoKwvSmkUDOkPggHKdJ9t4XYVfw6PJoBUjwl-A-zACu_4-QoxmBUy8-sW1K63fnQKtlyhE5rArBGYsILeBBGsBP2MIomWVIy5JSASNHVVLvyqR728jvkYjRc2d1i2LoRk050OraRL2Rtm6UJSa4n0SEKs4gzjQ58W_zFkAEee-"
            />
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background-dark bg-primary text-background-dark">
              <Edit2 size={16} />
            </button>
          </div>

          <h2 className="mt-4 text-2xl font-bold">Amelia Vunge</h2>
          <p className="text-sm text-text-secondary-dark">
            amelia.vunge@email.com
          </p>
        </div>

        {/* INFORMAÇÕES PESSOAIS */}
        <div className="mt-8 space-y-6">
          <section>
            <h3 className="mb-3 text-sm font-medium text-text-secondary-dark">
              Informações Pessoais
            </h3>

            <div className="rounded-xl bg-surface-dark">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-text-secondary-dark">Nome Completo</span>
                <span className="font-medium">Amelia Vunge</span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span className="text-text-secondary-dark">Telefone</span>
                <span className="font-medium">+244 9XX XXX XXX</span>
              </div>
            </div>
          </section>

          {/* DADOS DA CONTA */}
          <section>
            <h3 className="mb-3 text-sm font-medium text-text-secondary-dark">
              Dados da Conta
            </h3>

            <div className="rounded-xl bg-surface-dark">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-text-secondary-dark">Banco</span>
                <span className="font-medium">Banco Poupança</span>
              </div>

              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-text-secondary-dark">Nº da Conta</span>
                <span className="font-medium">0001 **** **** 1234</span>
              </div>

              <div className="flex items-center justify-between p-4">
                <span className="text-text-secondary-dark">IBAN</span>
                <span className="font-medium">
                  AO06 **** **** **** **** 1234
                </span>
              </div>
            </div>
          </section>

          {/* LINKS */}
          <section>
            <div className="rounded-xl bg-surface-dark">
              <Link
                to="/settings"
                className="flex items-center justify-between p-4 border-b border-white/10 hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-4">
                  <Settings size={20} className="text-text-secondary-dark" />
                  <span className="font-medium">Configurações</span>
                </div>
                <ChevronRight size={20} className="text-text-secondary-dark" />
              </Link>

              <button className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition">
                <div className="flex items-center gap-4 text-accent-negative">
                  <LogOut size={20} />
                  <span className="font-medium">Sair</span>
                </div>
                <ChevronRight size={20} className="text-text-secondary-dark" />
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 bg-background-dark/80 backdrop-blur-sm border-t border-white/10">
        <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 text-text-secondary-dark hover:text-primary transition"
          >
            <Home size={22} />
            <span className="text-xs">Início</span>
          </Link>

          <Link
            to="/wallet"
            className="flex flex-col items-center gap-1 text-text-secondary-dark hover:text-primary transition"
          >
            <Wallet size={22} />
            <span className="text-xs">Carteira</span>
          </Link>

          <Link
            to="/transactions"
            className="flex flex-col items-center gap-1 text-text-secondary-dark hover:text-primary transition"
          >
            <Repeat size={22} />
            <span className="text-xs">Transações</span>
          </Link>

          <Link to="/profile" className="flex flex-col items-center gap-1 text-primary">
            <User size={22} />
            <span className="text-xs font-bold">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
