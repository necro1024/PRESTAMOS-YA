export const INTERES_BASE_ANUAL = 15
export const DESCUENTO_MAXIMO_SEGURIDAD = 5
export const PUNTAJE_MINIMO_RECOMPENSA = 80

export const TRAMOS_RECOMPENSA_SEGURIDAD = [
  {
    rango: "0 - 80",
    beneficio: "Sin descuento",
    tasa: "Tasa normal",
    descuento: 0
  },
  {
    rango: "81 - 89",
    beneficio: "-0.25% a -2.25%",
    tasa: "Tasa reducida progresiva",
    descuento: 0.25
  },
  {
    rango: "90 - 94",
    beneficio: "-2.5% a -3.5%",
    tasa: "Tasa preferencial",
    descuento: 2.5
  },
  {
    rango: "95 - 100",
    beneficio: "-3.75% a -5%",
    tasa: "Mejor tasa",
    descuento: 3.75
  }
]

export const calcularDescuentoSeguridad = (puntuacion) => {
  const score = Number(puntuacion || 0)

  if (score <= PUNTAJE_MINIMO_RECOMPENSA) {
    return 0
  }

  const descuento =
    (score - PUNTAJE_MINIMO_RECOMPENSA)
    * (DESCUENTO_MAXIMO_SEGURIDAD
    / (100 - PUNTAJE_MINIMO_RECOMPENSA))

  return Math.min(DESCUENTO_MAXIMO_SEGURIDAD, descuento)
}

export const calcularInteresConRecompensa = (puntuacion) => (
  INTERES_BASE_ANUAL - calcularDescuentoSeguridad(puntuacion)
)

export const formatearPorcentaje = (valor) => (
  `${Number(valor || 0).toFixed(2).replace(".00", "")}%`
)
