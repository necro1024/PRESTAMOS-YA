import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { obtenerUsuario } from "../../services/authService"
import {
  firmarAcuerdoPrestamo,
  obtenerPrestamos,
  obtenerPrestamosPorCliente
} from "../../services/prestamoService"

function MisPrestamos() {
  const usuario = obtenerUsuario()

  const [prestamos, setPrestamos] = useState([])
  const [firma, setFirma] = useState("")
  const [prestamoFirma, setPrestamoFirma] = useState(null)

  const cargarPrestamos = useCallback(async () => {
    try {
      const data = usuario?.clienteId
        ? await obtenerPrestamosPorCliente(usuario.clienteId)
        : await obtenerPrestamos()

      setPrestamos(data)
    } catch (error) {
      console.error(error)
    }
  }, [usuario?.clienteId])

  useEffect(() => {
    cargarPrestamos()
  }, [cargarPrestamos])

  const abrirFirma = (prestamo) => {
    setPrestamoFirma(prestamo)
    setFirma("")
  }

  const enviarFirma = async (e) => {
    e.preventDefault()

    if (!prestamoFirma || !firma.trim()) {
      alert("Ingresa una firma o declaracion digital")
      return
    }

    try {
      await firmarAcuerdoPrestamo(
        prestamoFirma.id,
        firma
      )

      setPrestamoFirma(null)
      setFirma("")
      cargarPrestamos()
    } catch (error) {
      console.error(error)
      alert("No se pudo enviar el acuerdo")
    }
  }

  const claseEstado = (estado) => {
    if (estado === "Aprobado") return "badge bg-success"
    if (estado === "Rechazado") return "badge bg-danger"
    return "badge bg-warning text-dark"
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold">
              Mis Prestamos
            </h1>

            <p className="text-muted">
              Historial de solicitudes, estados y acuerdos.
            </p>
          </div>

          <div className="d-flex gap-2">
            <Link to="/" className="btn btn-outline-secondary">
              Inicio
            </Link>

            <Link to="/garantia" className="btn btn-primary">
              Solicitar nuevo prestamo
            </Link>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Garantia</th>
                    <th>Monto</th>
                    <th>Cuota</th>
                    <th>Estado</th>
                    <th>Acuerdo</th>
                    <th>Accion</th>
                  </tr>
                </thead>

                <tbody>
                  {prestamos.map(prestamo => (
                    <tr key={prestamo.id}>
                      <td>#{prestamo.id}</td>

                      <td>{prestamo.garantia}</td>

                      <td>S/ {prestamo.monto}</td>

                      <td>
                        S/ {Number(prestamo.cuotaMensual || 0).toFixed(2)}
                      </td>

                      <td>
                        <span className={claseEstado(prestamo.estado)}>
                          {prestamo.estado}
                        </span>
                      </td>

                      <td>
                        {prestamo.estadoAcuerdo || "Pendiente"}
                      </td>

                      <td>
                        {prestamo.estado === "Aprobado" &&
                          prestamo.estadoAcuerdo !== "Firmado" && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => abrirFirma(prestamo)}
                          >
                            Firmar acuerdo
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {prestamoFirma && (
          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">
                Acuerdo digital #{prestamoFirma.id}
              </h4>

              <form onSubmit={enviarFirma}>
                <label className="form-label">
                  Firma o declaracion digital
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  placeholder="Declaro que acepto las condiciones del prestamo..."
                ></textarea>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setPrestamoFirma(null)}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Enviar al administrador
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MisPrestamos
