import React from "react";
import {
  BrowserRouter, Routes, Route, Navigate, useLocation
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsProprietario,
  logout,
} from "./store/slices/authSlice";

import Login             from "./pages/Login";
import Register          from "./pages/Register";
import Search            from "./pages/Search";
import ArenaDetail       from "./pages/ArenaDetail";
import Payment           from "./pages/Payment";
import Perfil            from "./pages/Perfil";
import Reservas          from "./pages/Reservas";

import LoginProprietario      from "./pages/proprietario/Login";
import RegisterProprietario   from "./pages/proprietario/RegisterProprietario";
import Dashboard              from "./pages/proprietario/Dashboard";
import MinhasArenas           from "./pages/proprietario/MinhasArenas";
import CadastrarArena         from "./pages/proprietario/CadastrarArena";
import Horarios               from "./pages/proprietario/Horarios";
import ReservasProprietario   from "./pages/proprietario/ReservasProprietario";
import Financeiro             from "./pages/proprietario/Financeiro";
import PerfilProprietario     from "./pages/proprietario/PerfilProprietario";

import Navbar from "./components/Navbar";

function AppContent() {
  const dispatch        = useDispatch();
  const isLoggedIn      = useSelector(selectIsLoggedIn);
  const isProprietario  = useSelector(selectIsProprietario);

  const location = useLocation();
  const isProprietarioArea = location.pathname.startsWith("/proprietario");

  const handleLogout = () => dispatch(logout());

  const mostrarNavbarUsuario =
    isLoggedIn &&
    !isProprietario &&
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
            isLoggedIn && !isProprietario ? <Navigate to="/buscar" replace />
            : isLoggedIn && isProprietario ? <Navigate to="/proprietario/dashboard" replace />
            : <Login />
          }
        />

        {/* CADASTRO USUÁRIO */}
        <Route
          path="/cadastro"
          element={
            isLoggedIn ? <Navigate to="/buscar" replace />
            : <Register />
          }
        />

        {/* LOGIN PROPRIETÁRIO */}
        <Route
          path="/proprietario"
          element={
            isLoggedIn && isProprietario ? <Navigate to="/proprietario/dashboard" replace />
            : isLoggedIn && !isProprietario ? <Navigate to="/buscar" replace />
            : <LoginProprietario />
          }
        />

        {/* CADASTRO PROPRIETÁRIO */}
        <Route
          path="/proprietario/cadastro"
          element={
            isLoggedIn && isProprietario ? <Navigate to="/proprietario/dashboard" replace />
            : <RegisterProprietario />
          }
        />

        {/* ROTAS USUÁRIO */}
        <Route path="/buscar"    element={isLoggedIn ? <Search />    : <Navigate to="/" replace />} />
        <Route path="/arena"     element={isLoggedIn ? <ArenaDetail /> : <Navigate to="/" replace />} />
        <Route path="/pagamento" element={isLoggedIn ? <Payment />   : <Navigate to="/" replace />} />
        <Route path="/reservas"  element={isLoggedIn ? <Reservas />  : <Navigate to="/" replace />} />
        <Route path="/perfil"    element={isLoggedIn ? <Perfil onLogout={handleLogout} /> : <Navigate to="/" replace />} />

        {/* ROTAS PROPRIETÁRIO */}
        <Route path="/proprietario/dashboard"
          element={isLoggedIn && isProprietario ? <Dashboard /> : <Navigate to="/proprietario" replace />} />
        <Route path="/proprietario/minhas-arenas"
          element={isLoggedIn && isProprietario ? <MinhasArenas /> : <Navigate to="/proprietario" replace />} />
        <Route path="/proprietario/cadastrar-arena"
          element={isLoggedIn && isProprietario ? <CadastrarArena /> : <Navigate to="/proprietario" replace />} />
        <Route path="/proprietario/horarios"
          element={isLoggedIn && isProprietario ? <Horarios /> : <Navigate to="/proprietario" replace />} />
        <Route path="/proprietario/reservas"
          element={isLoggedIn && isProprietario ? <ReservasProprietario /> : <Navigate to="/proprietario" replace />} />
        <Route path="/proprietario/financeiro"
          element={isLoggedIn && isProprietario ? <Financeiro /> : <Navigate to="/proprietario" replace />} />
        <Route path="/proprietario/perfil"
          element={isLoggedIn && isProprietario
            ? <PerfilProprietario onLogout={handleLogout} />
            : <Navigate to="/proprietario" replace />} />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            isLoggedIn && isProprietario ? <Navigate to="/proprietario/dashboard" replace />
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
