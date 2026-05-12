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