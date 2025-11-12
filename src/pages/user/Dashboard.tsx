import { useAuth } from "../../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bem-vindo, {user?.name}!</h1>
      <p>Seu saldo atual: {user?.balance.toLocaleString("pt-AO", { style: "currency", currency: "AOA" })}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Dashboard;
