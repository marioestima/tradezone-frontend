import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Páginas públicas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Páginas do usuário
import Dashboard from "../pages/user/Dashboard";
import Profile from "../pages/user/Profile";
import Wallet from "../pages/user/Wallet";
import Plans from "../pages/user/Plans";
import Investments from "../pages/user/Investments";
import Transactions from "../pages/user/Transactions";
import Notification from "../pages/Notification/Notification";

// Componente de rota privada
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Rotas principais
const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <PrivateRoute>
            <Wallet />
          </PrivateRoute>
        }
      />
      <Route
        path="/plans"
        element={
          <PrivateRoute>
            <Plans />
          </PrivateRoute>
        }
      />
      <Route
        path="/investments"
        element={
          <PrivateRoute>
            <Investments />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notification />
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
