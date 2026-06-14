import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Dashboard from "../pages/admin/Dashboard"
import GClientes from "../pages/admin/GClientes"
import GPrestamos from "../pages/admin/GPrestamos"
import GGarantias from "../pages/admin/GGarantias"
import Auditorias from "../pages/admin/Auditorias"

import Home from "../pages/public/Home"
import SolicitarPrestamo from "../pages/public/SolicitarPrestamo";
import RegistroGarantia from "../pages/public/RegistroGarantia"
import Acceder from "../pages/public/Acceder"
import MisPrestamos from "../pages/client/MisPrestamos"
import MiEstado from "../pages/MiEstado"
import ProtectedRoute from "./ProtectedRoute"
import HomeButton from "../components/common/HomeButton"

function AppRoutes() {
  return (
    <BrowserRouter>
<HomeButton />
<Routes>
  <Route
    path="/mis-prestamos"
    element={
      <ProtectedRoute roles={["CLIENTE"]}>
        <MisPrestamos />
      </ProtectedRoute>
    }
  />
  <Route
    path="/acceder"
    element={<Acceder />}
  />
  <Route
    path="/solicitar"
    element={
      <ProtectedRoute roles={["CLIENTE"]}>
        <SolicitarPrestamo />
      </ProtectedRoute>
    }
  />
  <Route
    path="/mi-estado"
    element={
      <ProtectedRoute roles={["CLIENTE"]}>
        <MiEstado />
      </ProtectedRoute>
    }
  />
  <Route
    path="/garantia"
    element={
      <ProtectedRoute roles={["CLIENTE"]}>
        <RegistroGarantia />
      </ProtectedRoute>
    }
  />
  <Route
    path="/"
    element={<Home />}
  />
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute roles={["ADMIN"]}>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/clientes"
    element={
      <ProtectedRoute roles={["ADMIN"]}>
        <GClientes />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/prestamos"
    element={
      <ProtectedRoute roles={["ADMIN"]}>
        <GPrestamos />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/garantias"
    element={
      <ProtectedRoute roles={["ADMIN"]}>
        <GGarantias />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/auditorias"
    element={
      <ProtectedRoute roles={["ADMIN"]}>
        <Auditorias />
      </ProtectedRoute>
    }
  />
</Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
