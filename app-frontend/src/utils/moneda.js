export const MONEDAS_PRESTAMO = [
  {
    codigo: "PEN",
    nombre: "Soles",
    simbolo: "S/"
  },
  {
    codigo: "USD",
    nombre: "Dolares",
    simbolo: "US$"
  }
]

export const obtenerSimboloMoneda = (moneda = "PEN") => (
  MONEDAS_PRESTAMO.find(item => item.codigo === moneda)?.simbolo || "S/"
)

export const formatearMoneda = (
  valor,
  moneda = "PEN"
) => {
  const numero =
    Number(valor || 0)

  return `${obtenerSimboloMoneda(moneda)} ${numero.toLocaleString("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

export const calcularMontoEnSoles = ({
  monto,
  moneda,
  tipoCambioUsdPen
}) => {
  const montoNumero = Number(monto || 0)

  if (moneda === "USD") {
    return montoNumero * Number(tipoCambioUsdPen || 0)
  }

  return montoNumero
}
