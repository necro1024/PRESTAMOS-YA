import api from "./api"

export const obtenerPrestamos = async () => {

  const response = await api.get("/prestamos")

  return response.data
}

export const obtenerPrestamosPorCliente = async (
  clienteId
) => {

  const response = await api.get(
    `/prestamos/cliente/${clienteId}`
  )

  return response.data
}

export const crearPrestamo = async (prestamo) => {

  const response = await api.post(
    "/prestamos",
    prestamo
  )

  return response.data
}

export const actualizarPrestamo = async (
  id,
  prestamo
) => {

  const response = await api.put(
    `/prestamos/${id}`,
    prestamo
  )

  return response.data
}

export const firmarAcuerdoPrestamo = async (
  id,
  acuerdoDigital
) => {

  const response = await api.put(
    `/prestamos/${id}/firmar`,
    { acuerdoDigital }
  )

  return response.data
}

export const eliminarPrestamo = async (id) => {

  return await api.delete(`/prestamos/${id}`)
}
