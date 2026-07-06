import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"
import ModalAuditoria from "../../components/prestamos/ModalAuditoria"

import {
  actualizarPrestamo,
  eliminarPrestamo,
  obtenerPrestamos
} from "../../services/prestamoService"

function GPrestamos() {
  const [prestamos, setPrestamos] = useState([])
  const [prestamoAuditar, setPrestamoAuditar] = useState(null)

  const cargarPrestamos = async () => {
    try {
      const data = await obtenerPrestamos()
      setPrestamos(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarPrestamos()
  }, [])

  const borrarPrestamo = async (id) => {
    try {
      await eliminarPrestamo(id)
      cargarPrestamos()
    } catch (error) {
      console.error(error)
    }
  }

  const actualizarEstadoPrestamo = async (id, estado) => {
    try {
      const prestamo = prestamos.find(p => p.id === id)

      await actualizarPrestamo(id, {
        ...prestamo,
        estado
      })

      setPrestamoAuditar(null)
      cargarPrestamos()
    } catch (error) {
      console.error(error)
    }
  }

  const claseEstado = (estado) => {
    if (estado === "Aprobado") return "badge bg-success"
    if (estado === "Rechazado") return "badge bg-danger"
    if (estado === "Solicitar Informacion") return "badge bg-info text-dark"
    return "badge bg-warning text-dark"
  }

  const descargarAcuerdo = (prestamo) => {
    if (!prestamo.acuerdoDigital) return

    try {
      const acuerdo = JSON.parse(prestamo.acuerdoDigital)
      const dataUrl = acuerdo.archivo?.dataUrl
      const nombre =
        acuerdo.archivo?.nombre ||
        `acuerdo-prestamo-${prestamo.id}.pdf`

      if (!dataUrl) return

      const link = document.createElement("a")
      link.href = dataUrl
      link.download = nombre
      link.click()
    } catch (error) {
      console.error(error)
      alert("No se pudo descargar el acuerdo digital")
    }
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Gestion de Prestamos
          </h2>

          <p className="text-muted mb-0">
            Revisa solicitudes, estados y acuerdos digitales.
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
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Cuotas</th>
                  <th>Cuota mensual</th>
                  <th>Estado</th>
                  <th>Acuerdo</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {prestamos.map(prestamo => (
                  <tr key={prestamo.id}>
                    <td>{prestamo.id}</td>

                    <td>{prestamo.cliente?.nombre}</td>

                    <td>S/ {prestamo.monto}</td>

                    <td>{prestamo.cuotas}</td>

                    <td>
                      S/ {Number(prestamo.cuotaMensual || 0).toFixed(2)}
                    </td>

                    <td>
                      <span className={claseEstado(prestamo.estado)}>
                        {prestamo.estado}
                      </span>
                    </td>

                    <td>
                      {prestamo.estadoAcuerdo === "Firmado"
                        ? (
                          <div className="d-flex flex-column align-items-start gap-2">
                            <span className="badge bg-primary">
                              Firmado
                            </span>

                            {prestamo.acuerdoDigital && (
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => descargarAcuerdo(prestamo)}
                              >
                                <i className="bi bi-download me-1"></i>
                                Descargar
                              </button>
                            )}
                          </div>
                        )
                        : "Pendiente"}
                    </td>

                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAuditoria"
                        onClick={() => setPrestamoAuditar(prestamo)}
                      >
                        <i className="bi bi-shield-check me-1"></i>
                        Auditar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => borrarPrestamo(prestamo.id)}
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

      <ModalAuditoria
        prestamo={prestamoAuditar}
        onActualizarEstado={actualizarEstadoPrestamo}
      />
    </AdminLayout>
  )
}

export default GPrestamos
