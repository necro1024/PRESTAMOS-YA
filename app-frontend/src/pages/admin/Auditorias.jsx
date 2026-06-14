import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"
import { obtenerAuditorias } from "../../services/auditoriaService"

function Auditorias() {
  const [auditorias, setAuditorias] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarAuditorias = async () => {
      try {
        const data = await obtenerAuditorias()
        setAuditorias(data)
      } catch (error) {
        console.error(error)
      } finally {
        setCargando(false)
      }
    }

    cargarAuditorias()
  }, [])

  const formatearFecha = (fecha) => {
    if (!fecha) return "-"

    return new Intl.DateTimeFormat(
      "es-CO",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    ).format(new Date(fecha))
  }

  const claseResultado = (resultado = "") => {
    const normalizado = resultado.toLowerCase()

    if (
      normalizado.includes("aprobar") ||
      normalizado.includes("aprobado")
    ) {
      return "badge bg-success"
    }

    if (
      normalizado.includes("rechazar") ||
      normalizado.includes("rechazado")
    ) {
      return "badge bg-danger"
    }

    return "badge bg-warning text-dark"
  }

  return (
    <AdminLayout>
      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Registro de Auditorias
        </h2>
        <p className="text-muted mb-0">
          Historial inmutable de evaluaciones y decisiones administrativas.
        </p>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Fecha y hora</th>
                  <th>Administrador</th>
                  <th>Accion</th>
                  <th>Garantia</th>
                  <th>Prestamo</th>
                  <th>Cliente</th>
                  <th>Resultado</th>
                  <th>Detalle</th>
                </tr>
              </thead>

              <tbody>
                {cargando && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      Cargando auditorias...
                    </td>
                  </tr>
                )}

                {!cargando && auditorias.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      Todavia no existen registros de auditoria.
                    </td>
                  </tr>
                )}

                {auditorias.map(auditoria => (
                  <tr key={auditoria.id}>
                    <td>{formatearFecha(auditoria.fechaHora)}</td>
                    <td>
                      <div className="fw-semibold">
                        {auditoria.nombreUsuario || "Administrador"}
                      </div>
                      <small className="text-muted">
                        {auditoria.usuario}
                      </small>
                    </td>
                    <td>{auditoria.accion}</td>
                    <td>
                      {auditoria.garantiaId
                        ? `#${auditoria.garantiaId}`
                        : "-"}
                    </td>
                    <td>
                      {auditoria.prestamoId
                        ? `#${auditoria.prestamoId}`
                        : "-"}
                    </td>
                    <td>{auditoria.cliente || "-"}</td>
                    <td>
                      <span className={claseResultado(auditoria.resultado)}>
                        {auditoria.resultado}
                      </span>
                    </td>
                    <td className="text-muted">
                      {auditoria.detalle || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Auditorias
