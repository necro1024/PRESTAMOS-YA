import api from "./api"

export const loginBackend = async (credenciales) => {

  const response =
    await api.post("/auth/login", credenciales)

  return response.data
}

export const registrarUsuarioAuth = async (usuario) => {

  const response =
    await api.post("/auth/register", usuario)

  return response.data
}

export const login = (usuario) => {

  localStorage.setItem(
    "usuario",
    JSON.stringify(usuario)
  )

}

export const logout = () => {

  localStorage.removeItem("usuario")

}

export const obtenerUsuario = () => {

  const usuario =
    localStorage.getItem("usuario")

  return usuario
    ? JSON.parse(usuario)
    : null

}

export const estaAutenticado = () => {

  return !!localStorage.getItem(
    "usuario"
  )

}
