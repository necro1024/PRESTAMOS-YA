import axios from "axios"

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8081/api"

const api = axios.create({

baseURL: API_URL

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
