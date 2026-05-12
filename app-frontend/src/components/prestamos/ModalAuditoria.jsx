import { useState } from "react"

function ModalAuditoria({

  prestamo,

  onActualizarEstado

}) {

  // =========================
  // STATES
  // =========================

  const [decision, setDecision] =
    useState(
      prestamo?.estado ||
      "Pendiente"
    )

  const [notas, setNotas] =
    useState("")

  // =========================
  // CONFIRMAR
  // =========================

  const confirmarAuditoria = () => {

    onActualizarEstado(
      prestamo.id,
      decision
    )

  }

  if (!prestamo) return null

  return (

    <div
      className="modal fade"
      id="modalAuditoria"
      tabIndex="-1"
    >

      <div className="modal-dialog modal-lg">

        <div className="modal-content border-0 shadow">

          {/* HEADER */}

          <div className="modal-header bg-dark text-white">

            <h5 className="modal-title">

              <i className="bi bi-incognito me-2"></i>

              Auditoría Técnica
              #{prestamo.id}

            </h5>

            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            ></button>

          </div>

          {/* BODY */}

          <div className="modal-body">

            {/* SECCIÓN 1 */}

            <h6 className="text-primary border-bottom pb-2 fw-bold">

              1. Verificación de Activo Digital

            </h6>

            <div className="row mb-4 mt-3 align-items-center">

              {/* CARD */}

              <div className="col-md-5">

                <div className="card bg-light border-0 shadow-sm p-3 text-center rounded-4">

                  <i className="bi bi-graph-up-arrow text-success fs-2"></i>

                  <p className="small mb-1 mt-2 fw-bold text-dark">

                    Métricas en Tiempo Real

                  </p>

                  <div className="d-flex justify-content-between small px-2">

                    <span>Ingreso Mes:</span>

                    <span className="text-success fw-bold">

                      S/ 1,200.00

                    </span>

                  </div>

                  <div className="d-flex justify-content-between small px-2">

                    <span>Retención:</span>

                    <span className="text-primary">

                      85%

                    </span>

                  </div>

                  <hr className="my-2" />

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                  >

                    <i className="bi bi-file-earmark-pdf me-1"></i>

                    Ver Reporte PDF

                  </button>

                </div>

              </div>

              {/* NOTAS */}

              <div className="col-md-7">

                <label className="form-label text-muted small">

                  Notas de Auditoría Técnica

                </label>

                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Ej: Validación del activo digital..."
                  value={notas}
                  onChange={(e) =>
                    setNotas(e.target.value)
                  }
                ></textarea>

              </div>

            </div>

            {/* SECCIÓN 2 */}

            <h6 className="text-primary border-bottom pb-2 fw-bold">

              2. Transferencia y Seguridad

            </h6>

            <div className="row mt-3 mb-3">

              {/* TOKEN */}

              <div className="col-md-6">

                <label className="form-label text-muted small">

                  Estado del Token / Garantía

                </label>

                <select className="form-select">

                  <option>
                    Token API Activo
                  </option>

                  <option>
                    Contrato Inteligente
                  </option>

                  <option>
                    Dominio en Escrow
                  </option>

                  <option>
                    Garantía Liberada
                  </option>

                </select>

              </div>

              {/* MÉTODO */}

              <div className="col-md-6">

                <label className="form-label text-muted small">

                  Método de Desembolso

                </label>

                <select className="form-select">

                  <option>
                    Transferencia Bancaria
                  </option>

                  <option>
                    Yape / Plin
                  </option>

                  <option>
                    Criptomoneda
                  </option>

                </select>

              </div>

            </div>

            {/* DECISIÓN */}

            <div className="mb-3 p-3 bg-light rounded border border-primary-subtle">

              <label className="form-label fw-bold text-dark">

                Decisión del Comité de Riesgos

              </label>

              <select
                className="form-select border-primary form-select-lg"
                value={decision}
                onChange={(e) =>
                  setDecision(e.target.value)
                }
              >

                <option value="Pendiente">

                  En proceso de Auditoría

                </option>

                <option value="Aprobado">

                  Aprobado

                </option>

                <option value="Rechazado">

                  Rechazado

                </option>

              </select>

            </div>

          </div>

          {/* FOOTER */}

          <div className="modal-footer">

            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >

              Cerrar

            </button>

            <button
              type="button"
              className="btn btn-success"
              onClick={confirmarAuditoria}
            >

              <i className="bi bi-cloud-check-fill me-2"></i>

              Confirmar Auditoría

            </button>

          </div>

        </div>

      </div>

    </div>

  )
}

export default ModalAuditoria