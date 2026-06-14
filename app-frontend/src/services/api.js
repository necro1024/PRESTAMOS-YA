import axios from "axios"

const api = axios.create({

baseURL: "http://localhost:8080/api"

})

api.interceptors.request.use((config) => {

  const usuarioRaw =
    localStorage.getItem("usuario")

  if (usuarioRaw) {
    const usuario = JSON.parse(usuarioRaw)

    if (usuario.token) {
      config.headers.Authorization =
        `Bearer ${usuario.token}`
    }
  }

  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const esAuth =
      error.config?.url?.includes("/auth/")

    if ((status === 401 || status === 403) && !esAuth) {
      localStorage.removeItem("usuario")
      window.location.href = "/acceder"
    }

    return Promise.reject(error)
  }
)

export default api
