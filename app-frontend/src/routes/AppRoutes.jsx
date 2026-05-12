import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Dashboard
from "../pages/admin/Dashboard"

import GClientes
from "../pages/admin/GClientes"

import GPrestamos
from "../pages/admin/GPrestamos"

import GGarantias
from "../pages/admin/GGarantias"

import Home
from "../pages/public/Home"

import SolicitarPrestamo
from "../pages/public/SolicitarPrestamo"

import RegistroGarantia
from "../pages/public/RegistroGarantia"

import Acceder
from "../pages/public/Acceder"

function AppRoutes() {

  return (

    <BrowserRouter>

<Routes>

  <Route
  path="/acceder"
  element={<Acceder />}
/>

  <Route
  path="/solicitar"
  element={<SolicitarPrestamo />}
/>

<Route
  path="/garantia"
  element={<RegistroGarantia />}
/>

  <Route
  path="/"
  element={<Home />}
/>

  <Route
    path="/"
    element={<Dashboard />}
  />

  <Route
    path="/admin/dashboard"
    element={<Dashboard />}
  />

  <Route
    path="/admin/clientes"
    element={<GClientes />}
  />

  <Route
    path="/admin/prestamos"
    element={<GPrestamos />}
  />

  <Route
    path="/admin/garantias"
    element={<GGarantias />}
  />

</Routes>

    </BrowserRouter>

  )
}

export default AppRoutes