import api from "./api"

export const obtenerAuditorias = async () => {

  const response = await api.get("/auditorias")

  return response.data
}
