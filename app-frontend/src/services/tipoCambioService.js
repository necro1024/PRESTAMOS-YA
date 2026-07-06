import api from "./api"

export const obtenerTipoCambioUsdPen = async () => {
  const response = await api.get("/tipo-cambio/usd-pen")

  return response.data
}

export const convertirMoneda = async ({
  origen = "USD",
  destino = "PEN",
  monto = 1
}) => {
  const response = await api.get("/tipo-cambio/convertir", {
    params: {
      origen,
      destino,
      monto
    }
  })

  return response.data
}
