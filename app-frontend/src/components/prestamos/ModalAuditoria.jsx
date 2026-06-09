import { useEffect, useMemo, useState } from "react"

import { obtenerGarantiasPorPrestamo } from "../../services/garantiaService"

function ModalAuditoria({
  prestamo,
  onActualizarEstado
}) {
  const [decision, setDecision] = useState("Pendiente")
  const [notas, setNotas] = useState("")
  const [garantia, setGarantia] = useState(null)

  useEffect(() => {
    const cargarGarantia = async () => {
      if (!prestamo?.id) {
        setGarantia(null)
        return
      }

      try {
        const data = await obtenerGarantiasPorPrestamo(prestamo.id)
        setGarantia(data[0] || null)
      } catch (error) {
        console.error(error)
        setGarantia(null)
      }
    }

    setDecision(prestamo?.estado || "Pendiente")
    setNotas("")
    cargarGarantia()
  }, [prestamo])

  const documentosValidos = useMemo(() => {
    if (!garantia) return 0

    return [
      garantia.identificacionPersonal,
      garantia.documentacionPersonal,
      garantia.historialCrediticio,
      garantia.comprobantesIngresos,
      garantia.comprobanteActivo
    ].filter(Boolean).length
  }, [garantia])

  const cobertura = useMemo(() => {
    const valor = Number(garantia?.valorEstimado || 0)
    const monto = Number(prestamo?.monto || 0)

    if (!valor || !monto) return 0
    return Math.round((valor / monto) * 100)
  }, [garantia, prestamo])

  const scoreFinal = garantia?.puntuacion || 0
  const riesgo = garantia?.nivelRiesgo || "Pendiente"
  const recomendacion = garantia?.recomendacion || "Revisar"

  const confirmarAuditoria = (estado = decision) => {
    if (!prestamo) return
    onActualizarEstado(prestamo.id, estado)
  }

  const badgeRiesgo = riesgo === "Bajo"
    ? "bg-success"
    : riesgo === "Alto"
      ? "bg-danger"
      : "bg-warning text-dark"

  return (
    <div
      className="modal fade"
      id="modalAuditoria"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-dark text-white">
            <div>
              <h5 className="modal-title fw-bold">
                Auditoria Tecnica de Prestamo
              </h5>
              <small className="text-white-50">
                ID Prestamo: {prestamo?.id || "-"} - Cliente:{" "}
                {prestamo?.cliente?.nombre || "Sin cliente"} - Estado:{" "}
                {prestamo?.estado || "Pendiente"}
              </small>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body bg-light">
            {!prestamo ? (
              <p className="text-muted mb-0">
                Selecciona un prestamo para auditar.
              </p>
            ) : (
              <>
                <h6 className="fw-bold text-uppercase text-muted mb-3">
                  Resumen de Garantia
                </h6>

                <div className="row g-3 mb-4">
                  <Metric label="Garantia" value={garantia?.tipo || "Sin garantia"} />
                  <Metric label="Score" value={scoreFinal || "Sin evaluar"} />
                  <Metric
                    label="Riesgo"
                    value={<span className={`badge ${badgeRiesgo}`}>{riesgo}</span>}
                  />
                  <Metric label="Cobertura" value={`${cobertura}%`} />
                </div>

                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">
                      Informacion Financiera
                    </h6>

                    <div className="row g-3">
                      <Info label="Valor de la garantia" value={`S/ ${garantia?.valorEstimado || 0}`} />
                      <Info label="Ingresos mensuales" value={`S/ ${garantia?.ingresosMensuales || 0}`} />
                      <Info label="Monto solicitado" value={`S/ ${prestamo.monto || 0}`} />
                      <Info label="Cuotas" value={prestamo.cuotas || 0} />
                      <Info
                        label="Cuota mensual"
                        value={`S/ ${Number(prestamo.cuotaMensual || 0).toFixed(2)}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="fw-bold mb-0">
                        Documentacion Recibida
                      </h6>
                      <span className="badge bg-primary">
                        Documentos validos: {documentosValidos}/5
                      </span>
                    </div>

                    <div className="row g-2">
                      <Doc label="Identificacion personal" ok={Boolean(garantia?.identificacionPersonal)} />
                      <Doc label="Documentacion personal" ok={Boolean(garantia?.documentacionPersonal)} />
                      <Doc label="Historial crediticio" ok={Boolean(garantia?.historialCrediticio)} />
                      <Doc label="Comprobante de ingresos" ok={Boolean(garantia?.comprobantesIngresos)} />
                      <Doc label="Comprobante del activo" ok={Boolean(garantia?.comprobanteActivo)} />
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-body">
                    <h6 className="fw-bold mb-3">
                      Resultado de Evaluacion
                    </h6>

                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge bg-info text-dark">
                        Score Final: {scoreFinal || "Sin evaluar"}
                      </span>
                      <span className={`badge ${badgeRiesgo}`}>
                        Nivel de Riesgo: {riesgo}
                      </span>
                      <span className="badge bg-dark">
                        Recomendacion: {recomendacion}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Notas de Auditoria Tecnica
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Registra observaciones para el comite de riesgos..."
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                  ></textarea>
                </div>

                <div className="p-3 bg-white rounded border">
                  <label className="form-label fw-bold text-dark">
                    Decision del Comite de Riesgos
                  </label>

                  <select
                    className="form-select"
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Solicitar Informacion">Solicitar Informacion</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Volver al listado
            </button>
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              disabled={!prestamo}
              onClick={() => confirmarAuditoria("Aprobado")}
            >
              Aprobar Prestamo
            </button>
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
              disabled={!prestamo}
              onClick={() => confirmarAuditoria("Solicitar Informacion")}
            >
              Solicitar Informacion
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              disabled={!prestamo}
              onClick={() => confirmarAuditoria("Rechazado")}
            >
              Rechazar Prestamo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="col-md-3">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <small className="text-muted">{label}</small>
          <div className="fw-bold mt-1">{value}</div>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="col-md-4">
      <small className="text-muted">{label}</small>
      <div className="fw-semibold">{value}</div>
    </div>
  )
}

function Doc({ label, ok }) {
  return (
    <div className="col-md-6">
      <span className={ok ? "text-success" : "text-muted"}>
        <i className={`bi ${ok ? "bi-check-circle" : "bi-dash-circle"} me-1`}></i>
        {label}
      </span>
    </div>
  )
}

export default ModalAuditoria
