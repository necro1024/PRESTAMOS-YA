import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import {
  INTERES_BASE_ANUAL,
  calcularDescuentoSeguridad,
  calcularInteresConRecompensa,
  formatearPorcentaje
} from "../../utils/recompensaSeguridad"

const estadoInicial = {
  tipo: "YouTube",
  nombreActivo: "",
  identificador: "",
  correoTitular: "",
  fechaInicio: "",
  montoSolicitado: 10000,
  valorEstimado: 15000,
  ingresosMensuales: 1200,
  identificacionPersonal: false,
  documentacionPersonal: false,
  historialCrediticio: false,
  comprobantesIngresos: false,
  comprobanteActivo: false
}

function PrecalificarGarantia() {
  const navigate = useNavigate()
  const [form, setForm] = useState(estadoInicial)

  const resultado = useMemo(() => {
    let score = 20
    const recomendaciones = []
    const valorEstimado = Number(form.valorEstimado || 0)
    const montoSolicitado = Number(form.montoSolicitado || 0)
    const ingresosMensuales = Number(form.ingresosMensuales || 0)

    if (form.identificador.trim()) {
      score += 15
    } else {
      recomendaciones.push("Agrega una URL, dominio o identificador verificable.")
    }

    if (form.comprobanteActivo) {
      score += 15
    } else {
      recomendaciones.push("Adjunta un comprobante del activo digital.")
    }

    if (form.identificacionPersonal && form.documentacionPersonal) {
      score += 15
    } else {
      recomendaciones.push("Completa identificacion y documentacion personal.")
    }

    if (form.historialCrediticio) {
      score += 10
    } else {
      recomendaciones.push("Incluye historial crediticio para mejorar la confianza.")
    }

    if (form.comprobantesIngresos) {
      score += 10
    } else {
      recomendaciones.push("Adjunta comprobantes de ingresos del activo o titular.")
    }

    if (ingresosMensuales >= 1000) {
      score += 10
    } else {
      recomendaciones.push("Demuestra ingresos mensuales mas consistentes.")
    }

    if (
      valorEstimado > 0 &&
      montoSolicitado > 0 &&
      valorEstimado >= montoSolicitado * 1.2
    ) {
      score += 15
    } else {
      recomendaciones.push("Busca una cobertura minima de 120% frente al monto solicitado.")
    }

    const puntuacion = Math.min(score, 100)
    const descuento = calcularDescuentoSeguridad(puntuacion)
    const interes = calcularInteresConRecompensa(puntuacion)
    const riesgo = puntuacion >= 75
      ? "Bajo"
      : puntuacion >= 55
        ? "Medio"
        : "Alto"

    return {
      puntuacion,
      descuento,
      interes,
      riesgo,
      recomendaciones
    }
  }, [form])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const registrarGarantia = () => {
    localStorage.setItem(
      "precalificacionGarantia",
      JSON.stringify({
        tipo: form.tipo,
        nombreActivo: form.nombreActivo,
        identificador: form.identificador,
        correoTitular: form.correoTitular,
        fechaInicio: form.fechaInicio,
        valorEstimado: form.valorEstimado,
        ingresosMensuales: form.ingresosMensuales
      })
    )

    navigate("/garantia")
  }

  const badgeRiesgo = resultado.riesgo === "Bajo"
    ? "bg-success"
    : resultado.riesgo === "Medio"
      ? "bg-warning text-dark"
      : "bg-danger"

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <span className="badge bg-primary mb-3">
              Evaluacion preliminar
            </span>

            <h1 className="fw-bold">
              Revisa la seguridad de tu garantia
            </h1>

            <p className="text-muted mb-0">
              Completa los datos principales para estimar el score, el riesgo
              y el posible descuento antes del registro formal.
            </p>
          </div>

          <Link to="/" className="btn btn-outline-secondary">
            Inicio
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-4">
                  Datos de la garantia digital
                </h4>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Tipo de activo</label>
                    <select
                      name="tipo"
                      className="form-select"
                      value={form.tipo}
                      onChange={handleChange}
                    >
                      <option value="YouTube">YouTube</option>
                      <option value="Dominio">Dominio web</option>
                      <option value="Stripe">Stripe</option>
                      <option value="PayPal">PayPal</option>
                      <option value="SaaS">SaaS</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Nombre del activo</label>
                    <input
                      type="text"
                      name="nombreActivo"
                      className="form-control"
                      value={form.nombreActivo}
                      onChange={handleChange}
                      placeholder="Ej: Mi canal tech"
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label">URL, dominio o identificador</label>
                    <input
                      type="text"
                      name="identificador"
                      className="form-control"
                      value={form.identificador}
                      onChange={handleChange}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Fecha de adquisicion</label>
                    <input
                      type="date"
                      name="fechaInicio"
                      className="form-control"
                      value={form.fechaInicio}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Monto solicitado</label>
                    <input
                      type="number"
                      name="montoSolicitado"
                      className="form-control"
                      min="1000"
                      value={form.montoSolicitado}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Valor estimado</label>
                    <input
                      type="number"
                      name="valorEstimado"
                      className="form-control"
                      min="0"
                      value={form.valorEstimado}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Ingresos mensuales</label>
                    <input
                      type="number"
                      name="ingresosMensuales"
                      className="form-control"
                      min="0"
                      value={form.ingresosMensuales}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <h5 className="fw-bold mb-3">
                  Evidencias disponibles
                </h5>

                <div className="row g-2">
                  <CheckInput
                    name="identificacionPersonal"
                    label="Identificacion personal"
                    checked={form.identificacionPersonal}
                    onChange={handleChange}
                  />
                  <CheckInput
                    name="documentacionPersonal"
                    label="Documentacion personal"
                    checked={form.documentacionPersonal}
                    onChange={handleChange}
                  />
                  <CheckInput
                    name="historialCrediticio"
                    label="Historial crediticio"
                    checked={form.historialCrediticio}
                    onChange={handleChange}
                  />
                  <CheckInput
                    name="comprobantesIngresos"
                    label="Comprobantes de ingresos"
                    checked={form.comprobantesIngresos}
                    onChange={handleChange}
                  />
                  <CheckInput
                    name="comprobanteActivo"
                    label="Comprobante del activo"
                    checked={form.comprobanteActivo}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card bg-dark text-white border-0 shadow rounded-3 mb-4">
              <div className="card-body p-4">
                <span className="text-info fw-semibold">
                  Score aproximado
                </span>

                <div className="d-flex justify-content-between align-items-end mt-3">
                  <h2 className="display-4 fw-bold text-info mb-0">
                    {resultado.puntuacion}/100
                  </h2>

                  <span className={`badge ${badgeRiesgo}`}>
                    Riesgo {resultado.riesgo}
                  </span>
                </div>

                <div className="progress mt-4" role="progressbar">
                  <div
                    className="progress-bar bg-info"
                    style={{ width: `${resultado.puntuacion}%` }}
                  ></div>
                </div>

                <div className="row g-3 mt-4">
                  <Result label="Tasa base" value={formatearPorcentaje(INTERES_BASE_ANUAL)} />
                  <Result label="Descuento estimado" value={formatearPorcentaje(resultado.descuento)} />
                  <Result label="Tasa posible" value={formatearPorcentaje(resultado.interes)} />
                </div>

                <div className="alert alert-info border-0 mt-4 mb-0">
                  Esta es una precalificacion. La decision final depende de la
                  auditoria administrativa y documentos reales.
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">
                  Que puedes mejorar
                </h5>

                {resultado.recomendaciones.length === 0 ? (
                  <p className="text-success mb-0">
                    Tu garantia luce bien documentada para la revision formal.
                  </p>
                ) : (
                  <ul className="list-unstyled mb-0">
                    {resultado.recomendaciones.slice(0, 4).map((item) => (
                      <li className="mb-2" key={item}>
                        <i className="bi bi-arrow-right-circle text-primary me-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="d-grid gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={registrarGarantia}
                  >
                    Enviar a registro formal
                  </button>

                  <Link to="/solicitar" className="btn btn-outline-secondary">
                    Calcular prestamo primero
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CheckInput({ name, label, checked, onChange }) {
  return (
    <div className="col-md-6">
      <div className="form-check border rounded-3 bg-white p-3 ps-5 h-100">
        <input
          className="form-check-input"
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
        />
        <label className="form-check-label fw-semibold" htmlFor={name}>
          {label}
        </label>
      </div>
    </div>
  )
}

function Result({ label, value }) {
  return (
    <div className="col-4">
      <div className="bg-secondary bg-opacity-25 rounded-3 p-3 h-100">
        <small className="text-light-emphasis">{label}</small>
        <div className="fw-bold mt-1">{value}</div>
      </div>
    </div>
  )
}

export default PrecalificarGarantia
