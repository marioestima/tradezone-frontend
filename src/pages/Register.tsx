import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("As senhas não coincidem!");
      setLoading(false);
      return;
    }

    try {
      await register(form.name, form.email, Number(form.phone), form.password);
      toast.success("Conta criada com sucesso!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center bg-[#0A0A0A] font-display text-white p-6">
      <div className="absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_50%_50%_at_50%_-10%,rgba(37,244,54,0.2),rgba(255,255,255,0))]" />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative z-10 flex flex-col w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <svg className="h-8 w-8 text-[#25F436]" fill="none" viewBox="0 0 24 24">
            <path d="M4 4H20V6H4V4ZM4 11H20V13H4V11ZM4 18H20V20H4V18Z" fill="currentColor" />
          </svg>
          <h1 className="text-3xl font-black tracking-tighter text-white">TRADEZONE</h1>
        </div>

        {/* Formulário */}
        <form className="flex flex-col space-y-4 mt-24" onSubmit={handleSubmit}>
          <div className="w-full relative">
            <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              className="w-full h-12 pl-11 pr-4 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25F436] transition text-sm"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full relative">
            <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full h-12 pl-11 pr-4 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25F436] transition text-sm"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full relative">
            <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              className="w-full h-12 pl-11 pr-4 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25F436] transition text-sm"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full relative">
            <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Senha"
              className="w-full h-12 pl-11 pr-10 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25F436] transition text-sm"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="w-full relative">
            <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar senha"
              className="w-full h-12 pl-11 pr-10 bg-gray-800/50 rounded-xl border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25F436] transition text-sm"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="flex h-12 w-full mt-6 items-center justify-center rounded-xl bg-[#36853D] text-white text-base font-bold tracking-wide hover:opacity-90 transition-transform hover:scale-[1.02]">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Registrar"}
          </button>

          <Link to="/login" className="flex h-12 w-full mt-4 items-center justify-center rounded-xl bg-gray-800/50 text-white text-base font-semibold tracking-wide backdrop-blur-sm border border-gray-700 hover:bg-gray-700/40 transition">
            Voltar ao Login
          </Link>
        </form>

        <div className="fixed bottom-0 left-0 w-full pb-6">
          <div className="mx-auto w-fit text-center text-gray-500 text-sm">
            © 2025 TRADEZONE — Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
