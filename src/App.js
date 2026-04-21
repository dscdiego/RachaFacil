import React, { useState, useEffect } from "react";
import {
  BrowserRouter, Routes, Route, Navigate, useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import ArenaDetail from "./pages/ArenaDetail";
import Payment from "./pages/Payment";
import UserArena from "./pages/UserArena";
import Perfil from "./pages/Perfil";
import Reservas from "./pages/Reservas";

import LoginProprietario from "./pages/proprietario/Login";
import RegisterProprietario from "./pages/proprietario/RegisterProprietario";
import Dashboard from "./pages/proprietario/Dashboard";
import MinhasArenas from "./pages/proprietario/MinhasArenas";
import CadastrarArena from "./pages/proprietario/CadastrarArena";
import Horarios from "./pages/proprietario/Horarios";
import ReservasProprietario from "./pages/proprietario/ReservasProprietario";
import Financeiro from "./pages/proprietario/Financeiro";
import PerfilProprietario from "./pages/proprietario/PerfilProprietario";

import Navbar from "./components/Navbar";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProprietarioLoggedIn, setIsProprietarioLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const location = useLocation();
  const isProprietarioArea = location.pathname.startsWith("/proprietario");

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    const authProprietario = localStorage.getItem("authProprietario");
    setIsLoggedIn(authUser === "true");
    setIsProprietarioLoggedIn(authProprietario === "true");
    setAuthChecked(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("authUser", "true");
    localStorage.removeItem("authProprietario");
    setIsLoggedIn(true);
    setIsProprietarioLoggedIn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
  };

  const handleLoginProprietario = () => {
    localStorage.setItem("authProprietario", "true");
    localStorage.removeItem("authUser");
    setIsProprietarioLoggedIn(true);
    setIsLoggedIn(false);
  };

  const handleLogoutProprietario = () => {
    localStorage.removeItem("authProprietario");
    setIsProprietarioLoggedIn(false);
  };

  if (!authChecked) return null;

  const mostrarNavbarUsuario =
    isLoggedIn &&
    !isProprietarioArea &&
    location.pathname !== "/" &&
    location.pathname !== "/cadastro";

  return (
    <div className={isProprietarioArea ? "app-proprietario" : "app"}>
      <Routes>
        {/* LOGIN USUÁRIO */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/buscar" replace />
            : isProprietarioLoggedIn ? <Navigate to="/proprietario/dashboard" replace />
            : <Login onLogin={handleLogin} />
          }
        />

        {/* CADASTRO USUÁRIO */}
        <Route
          path="/cadastro"
          element={
            isLoggedIn ? <Navigate to="/buscar" replace />
            : isProprietarioLoggedIn ? <Navigate to="/proprietario/dashboard" replace />
            : <Register onRegister={handleLogin} />
          }
        />

        {/* LOGIN PROPRIETÁRIO */}
        <Route
          path="/proprietario"
          element={
            isProprietarioLoggedIn ? <Navigate to="/proprietario/dashboard" replace />
            : isLoggedIn ? <Navigate to="/buscar" replace />
            : <LoginProprietario onLoginProprietario={handleLoginProprietario} />
          }
        />

        {/* ROTAS USUÁRIO */}
        <Route path="/buscar"    element={isLoggedIn ? <Search /> : <Navigate to="/" replace />} />
        <Route path="/arena"     element={isLoggedIn ? <ArenaDetail /> : <Navigate to="/" replace />} />
        <Route path="/pagamento" element={isLoggedIn ? <Payment /> : <Navigate to="/" replace />} />
        <Route path="/reservas"  element={isLoggedIn ? <Reservas /> : <Navigate to="/" replace />} />
        <Route path="/perfil"    element={isLoggedIn ? <Perfil onLogout={handleLogout} /> : <Navigate to="/" replace />} />

        {/* Cadastro de arena público (fluxo pré-backend) */}
        <Route path="/cadastro-arena" element={<UserArena />} />

        {/* Cadastro de proprietário */}
        <Route
          path="/proprietario/cadastro"
          element={
            isProprietarioLoggedIn ? <Navigate to="/proprietario/dashboard" replace />
            : <RegisterProprietario onLoginProprietario={handleLoginProprietario} />
          }
        />

        {/* ROTAS PROPRIETÁRIO */}
        <Route
          path="/proprietario/dashboard"
          element={isProprietarioLoggedIn ? <Dashboard /> : <Navigate to="/proprietario" replace />}
        />
        <Route
          path="/proprietario/minhas-arenas"
          element={isProprietarioLoggedIn ? <MinhasArenas /> : <Navigate to="/proprietario" replace />}
        />
        {/* ✅ Rota de cadastrar arena — nova e edição */}
        <Route
          path="/proprietario/cadastrar-arena"
          element={isProprietarioLoggedIn ? <CadastrarArena /> : <Navigate to="/proprietario" replace />}
        />
        <Route
          path="/proprietario/horarios"
          element={isProprietarioLoggedIn ? <Horarios /> : <Navigate to="/proprietario" replace />}
        />
        <Route
          path="/proprietario/reservas"
          element={isProprietarioLoggedIn ? <ReservasProprietario /> : <Navigate to="/proprietario" replace />}
        />
        <Route
          path="/proprietario/financeiro"
          element={isProprietarioLoggedIn ? <Financeiro /> : <Navigate to="/proprietario" replace />}
        />
        <Route
          path="/proprietario/perfil"
          element={isProprietarioLoggedIn ? <PerfilProprietario onLogout={handleLogoutProprietario} /> : <Navigate to="/proprietario" replace />}
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            isProprietarioLoggedIn ? <Navigate to="/proprietario/dashboard" replace />
            : isLoggedIn ? <Navigate to="/buscar" replace />
            : <Navigate to="/" replace />
          }
        />
      </Routes>

      {mostrarNavbarUsuario && <Navbar />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}