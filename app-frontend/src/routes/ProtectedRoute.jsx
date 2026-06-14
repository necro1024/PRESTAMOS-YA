import { Navigate } from "react-router-dom"

import { obtenerUsuario } from "../services/authService"

function ProtectedRoute({
  children,
  roles = []
}) {
  const usuario = obtenerUsuario()

  if (!usuario?.token) {
    return <Navigate to="/acceder" replace />
  }

  if (
    roles.length > 0 &&
    !roles.includes(usuario.rol)
  ) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
