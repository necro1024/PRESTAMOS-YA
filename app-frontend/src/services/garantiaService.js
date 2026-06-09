import api from "./api"

export const obtenerGarantias = async () => {

  const response =
    await api.get("/garantias")

  return response.data
}

export const obtenerGarantiasPorPrestamo = async (
  prestamoId
) => {

  const response =
    await api.get(
      `/garantias/prestamo/${prestamoId}`
    )

  return response.data
}

export const crearGarantia = async (
  garantia
) => {

  const response =
    await api.post(
      "/garantias",
      garantia
    )

  return response.data
}

export const actualizarGarantia = async (
  id,
  garantia
) => {

  const response =
    await api.put(
      `/garantias/${id}`,
      garantia
    )

  return response.data
}

export const evaluarGarantia = async (id) => {

  const response =
    await api.put(`/garantias/${id}/evaluar`)

  return response.data
}

export const eliminarGarantia = async (
  id
) => {

  return await api.delete(
    `/garantias/${id}`
  )
}
