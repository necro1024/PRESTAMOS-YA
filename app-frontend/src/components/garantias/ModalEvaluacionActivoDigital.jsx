import { useEffect, useMemo, useState } from "react"
import {
  INTERES_BASE_ANUAL,
  calcularDescuentoSeguridad,
  calcularInteresConRecompensa,
  formatearPorcentaje
} from "../../utils/recompensaSeguridad"

function ModalEvaluacionActivoDigital({
  garantia,
  onAprobar,
  onSolicitarCorrecciones,
  onRechazar
}) {
  const [observaciones, setObservaciones] = useState("")
  const [checks, setChecks] = useState({})

  const gruposChecklist = useMemo(() => ({
    general: [
      ["titularIdentificado", "Titular identificado"],
      ["correoVerificado", "Correo verificado"],
      ["registroCompleto", "Registro completo"],
      ["identidadValidada", "Identidad validada"]
    ],
    documentos: [
      ["identificacionAdjunta", "Identificacion adjunta"],
      ["documentacionValida", "Documentacion valida"],
      ["historialAdjunto", "Historial adjunto"],
      ["ingresosDemostrables", "Ingresos demostrables"],
      ["activoDocumentado", "Activo documentado"]
    ],
    financiera: [
      ["valorConsistente", "Valor consistente"],
      ["ingresosVerificables", "Ingresos verificables"],
      ["coberturaSuficiente", "Cobertura suficiente"],
      ["historialAceptable", "Historial aceptable"]
    ],
    operacional: [
      ["sinFraude", "Sin senales de fraude"],
      ["informacionConsistente", "Informacion consistente"],
      ["cumplePoliticas", "Cumple politicas internas"],
      ["riesgoAceptable", "Riesgo aceptable"]
    ]
  }), [])

  useEffect(() => {
    setObservaciones("")
    setChecks({})
  }, [garantia?.id])

  const documentos = useMemo(() => ([
    {
      label: "Identificacion personal",
      valor: garantia?.identificacionPersonal
    },
    {
      label: "Documentacion personal",
      valor: garantia?.documentacionPersonal
    },
    {
      label: "Historial crediticio",
      valor: garantia?.historialCrediticio
    },
    {
      label: "Comprobante de ingresos",
      valor: garantia?.comprobantesIngresos
    },
    {
      label: "Comprobante del activo",
      valor: garantia?.comprobanteActivo
    }
  ]), [garantia])

  const checklist = useMemo(() => (
    Object.values(gruposChecklist).flat().map(([id]) => Boolean(checks[id]))
  ), [checks, gruposChecklist])

  const itemsCumplidos = checklist.filter(Boolean).length
  const totalItems = checklist.length
  const score = Math.round((itemsCumplidos / totalItems) * 100)
  const riesgo = score >= 85 ? "Bajo" : score >= 65 ? "Medio" : "Alto"
  const recomendacion = score >= 85
    ? "APROBAR GARANTIA"
    : score >= 65
      ? "SOLICITAR CORRECCIONES"
      : "RECHAZAR GARANTIA"
  const descuentoSeguridad = calcularDescuentoSeguridad(score)
  const interesFinal = calcularInteresConRecompensa(score)

  const antiguedad = garantia?.fechaInicio
    ? `${garantia.fechaInicio}`
    : "No registrada"

  const verDocumento = (documento) => {
    if (!documento.valor) return
    alert(`Documento registrado: ${documento.valor}`)
  }

  const badgeRiesgo = riesgo === "Bajo"
    ? "bg-success"
    : riesgo === "Medio"
      ? "bg-warning text-dark"
      : "bg-danger"

  const toggleCheck = (id) => {
    setChecks({
      ...checks,
      [id]: !checks[id]
    })
  }

  const garantiaEvaluada = (estado, recomendacionFinal) => ({
    ...garantia,
    estado,
    puntuacion: score,
    nivelRiesgo: riesgo,
    recomendacion: recomendacionFinal,
    resultadoEvaluacion:
      `Evaluacion manual del administrador. Items cumplidos: `
      + `${itemsCumplidos}/${totalItems}. Score: ${score}%. `
      + `Riesgo: ${riesgo}. Observaciones: `
      + `${observaciones || "Sin observaciones"}.`
  })

  return (
    <div
      className="modal fade"
      id="modalEvaluacionActivoDigital"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-xl modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg">
          <div className="modal-header bg-dark text-white">
            <div>
              <h5 className="modal-title fw-bold">
                Evaluacion de Activo Digital
              </h5>
              <small className="text-white-50">
                Garantia #{garantia?.id || "-"} - Cliente:{" "}
                {garantia?.prestamo?.cliente?.nombre || "Sin cliente"} -
                Estado: {garantia?.estado || "Pendiente"}
              </small>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body bg-light">
            {!garantia ? (
              <p className="text-muted mb-0">
                Selecciona una garantia para evaluar.
              </p>
            ) : (
              <>
                <div className="accordion" id="accordionEvaluacionActivo">
                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#infoGeneral"
                      >
                        Informacion General
                      </button>
                    </h2>

                    <div
                      id="infoGeneral"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionEvaluacionActivo"
                    >
                      <div className="accordion-body">
                        <div className="row g-3 mb-4">
                          <Info label="Tipo de activo" value={garantia.tipo} />
                          <Info label="Nombre del activo" value={garantia.nombreActivo} />
                          <Info label="URL o identificador" value={garantia.identificador} />
                          <Info label="Email titular" value={garantia.correoTitular} />
                          <Info label="Fecha de adquisicion" value={garantia.fechaInicio} />
                        </div>

                        <Checklist
                          items={gruposChecklist.general}
                          checked={checks}
                          onToggle={toggleCheck}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#evidencias"
                      >
                        Evidencias y Documentacion
                      </button>
                    </h2>

                    <div
                      id="evidencias"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionEvaluacionActivo"
                    >
                      <div className="accordion-body">
                        <div className="table-responsive mb-4">
                          <table className="table table-sm align-middle">
                            <tbody>
                              {documentos.map(documento => (
                                <tr key={documento.label}>
                                  <td className="fw-semibold">
                                    {documento.label}
                                  </td>
                                  <td className="text-muted">
                                    {documento.valor || "No adjunto"}
                                  </td>
                                  <td className="text-end">
                                    <button
                                      type="button"
                                      className="btn btn-outline-primary btn-sm me-2"
                                      onClick={() => verDocumento(documento)}
                                      disabled={!documento.valor}
                                    >
                                      Ver
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-outline-secondary btn-sm"
                                      disabled={!documento.valor}
                                    >
                                      Descargar
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <Checklist
                          items={gruposChecklist.documentos}
                          checked={checks}
                          onToggle={toggleCheck}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#evaluacionFinanciera"
                      >
                        Evaluacion Financiera
                      </button>
                    </h2>

                    <div
                      id="evaluacionFinanciera"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionEvaluacionActivo"
                    >
                      <div className="accordion-body">
                        <div className="row g-3 mb-4">
                          <Info label="Valor estimado" value={`S/ ${garantia.valorEstimado || 0}`} />
                          <Info label="Ingresos mensuales" value={`S/ ${garantia.ingresosMensuales || 0}`} />
                          <Info label="Antiguedad del activo" value={antiguedad} />
                        </div>

                        <Checklist
                          items={gruposChecklist.financiera}
                          checked={checks}
                          onToggle={toggleCheck}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item border-0 shadow-sm mb-3">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-semibold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#riesgoOperacional"
                      >
                        Riesgo Operacional
                      </button>
                    </h2>

                    <div
                      id="riesgoOperacional"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionEvaluacionActivo"
                    >
                      <div className="accordion-body">
                        <Checklist
                          items={gruposChecklist.operacional}
                          checked={checks}
                          onToggle={toggleCheck}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mt-4">
                  <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center gap-3">
                      <span className="badge bg-primary">
                        Items cumplidos: {itemsCumplidos}/{totalItems}
                      </span>
                      <span className="badge bg-info text-dark">
                        Score de Cumplimiento: {score}%
                      </span>
                      <span className={`badge ${badgeRiesgo}`}>
                        Nivel de Riesgo: {riesgo}
                      </span>
                      <span className="badge bg-dark">
                        Recomendacion: {recomendacion}
                      </span>
                      <span className="badge bg-secondary">
                        Tasa base: {formatearPorcentaje(INTERES_BASE_ANUAL)}
                      </span>
                      <span className="badge bg-success">
                        Descuento: {formatearPorcentaje(descuentoSeguridad)}
                      </span>
                      <span className="badge bg-primary">
                        Tasa final: {formatearPorcentaje(interesFinal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="form-label fw-semibold">
                    Observaciones del Analista
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Registra comentarios, hallazgos o acciones requeridas..."
                  ></textarea>
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
              disabled={!garantia}
              onClick={() => onAprobar(
                garantiaEvaluada("Verificada", "Aprobar")
              )}
            >
              Aprobar Garantia
            </button>
            <button
              type="button"
              className="btn btn-warning"
              data-bs-dismiss="modal"
              disabled={!garantia}
              onClick={() => onSolicitarCorrecciones(
                garantiaEvaluada("Pendiente", "Solicitar correcciones")
              )}
            >
              Solicitar Correcciones
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              disabled={!garantia}
              onClick={() => onRechazar(
                garantiaEvaluada("Rechazada", "Rechazar")
              )}
            >
              Rechazar Garantia
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="col-md-4">
      <div className="border rounded bg-white p-3 h-100">
        <small className="text-muted">{label}</small>
        <div className="fw-semibold text-break">
          {value || "No registrado"}
        </div>
      </div>
    </div>
  )
}

function Checklist({ items, checked, onToggle }) {
  return (
    <div className="row g-2">
      {items.map(([id, label]) => (
        <div className="col-md-6" key={id}>
          <div className="d-flex align-items-center gap-2">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              checked={Boolean(checked[id])}
              onChange={() => onToggle(id)}
            />
            <span>{label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ModalEvaluacionActivoDigital
