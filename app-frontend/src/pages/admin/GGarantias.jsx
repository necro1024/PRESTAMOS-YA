import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"
import ModalEvaluacionActivoDigital
from "../../components/garantias/ModalEvaluacionActivoDigital"

import {
  actualizarGarantia,
  eliminarGarantia,
  obtenerGarantias
} from "../../services/garantiaService"

function GGarantias() {
  const [garantias, setGarantias] = useState([])
  const [garantiaEvaluar, setGarantiaEvaluar] = useState(null)

  const cargarGarantias = async () => {
    try {
      const data = await obtenerGarantias()
      setGarantias(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarGarantias()
  }, [])

  const borrarGarantia = async (id) => {
    try {
      await eliminarGarantia(id)
      cargarGarantias()
    } catch (error) {
      console.error(error)
    }
  }

  const aprobarGarantia = async (garantia) => {
    try {
      await actualizarGarantia(garantia.id, garantia)
      cargarGarantias()
    } catch (error) {
      console.error(error)
    }
  }

  const solicitarCorrecciones = async (garantia) => {
    try {
      await actualizarGarantia(garantia.id, {
        ...garantia,
        estado: "Pendiente",
        recomendacion: "Solicitar correcciones"
      })
      cargarGarantias()
    } catch (error) {
      console.error(error)
    }
  }

  const rechazarGarantia = async (garantia) => {
    try {
      await actualizarGarantia(garantia.id, {
        ...garantia,
        estado: "Rechazada",
        nivelRiesgo: "Alto",
        recomendacion: "Rechazar"
      })
      cargarGarantias()
    } catch (error) {
      console.error(error)
    }
  }

  const claseRiesgo = (riesgo) => {
    if (riesgo === "Bajo") return "badge bg-success"
    if (riesgo === "Alto") return "badge bg-danger"
    return "badge bg-warning text-dark"
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Evaluacion de Activos Digitales
          </h2>

          <p className="text-muted mb-0">
            Verifica identidad, documentos, ingresos y cobertura
            de las garantias digitales.
          </p>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Activo</th>
                  <th>Prestamo</th>
                  <th>Valor</th>
                  <th>Ingresos</th>
                  <th>Docs</th>
                  <th>Score</th>
                  <th>Riesgo</th>
                  <th>Recomendacion</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {garantias.map(garantia => (
                  <tr key={garantia.id}>
                    <td>{garantia.id}</td>

                    <td>
                      <div className="fw-semibold">
                        {garantia.nombreActivo || garantia.tipo}
                      </div>
                      <small className="text-muted">
                        {garantia.identificador}
                      </small>
                    </td>

                    <td>
                      #{garantia.prestamo?.id}
                      <div className="small text-muted">
                        {garantia.prestamo?.cliente?.nombre}
                      </div>
                    </td>

                    <td>S/ {garantia.valorEstimado}</td>

                    <td>S/ {garantia.ingresosMensuales}</td>

                    <td>
                      <span className="badge bg-secondary">
                        {[
                          garantia.identificacionPersonal,
                          garantia.documentacionPersonal,
                          garantia.historialCrediticio,
                          garantia.comprobantesIngresos,
                          garantia.comprobanteActivo
                        ].filter(Boolean).length}
                        /5
                      </span>
                    </td>

                    <td>
                      {garantia.puntuacion ?? "Sin evaluar"}
                    </td>

                    <td>
                      {garantia.nivelRiesgo
                        ? (
                          <span className={claseRiesgo(garantia.nivelRiesgo)}>
                            {garantia.nivelRiesgo}
                          </span>
                        )
                        : "Pendiente"}
                    </td>

                    <td>{garantia.recomendacion || "Pendiente"}</td>

                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalEvaluacionActivoDigital"
                        onClick={() => setGarantiaEvaluar(garantia)}
                      >
                        Evaluar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => borrarGarantia(garantia.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalEvaluacionActivoDigital
        garantia={garantiaEvaluar}
        onAprobar={aprobarGarantia}
        onSolicitarCorrecciones={solicitarCorrecciones}
        onRechazar={rechazarGarantia}
      />
    </AdminLayout>
  )
}

export default GGarantias
