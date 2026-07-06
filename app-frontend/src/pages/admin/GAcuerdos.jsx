import { useEffect, useMemo, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"
import { obtenerPrestamos } from "../../services/prestamoService"

function GAcuerdos() {
  const [prestamos, setPrestamos] = useState([])

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

  const acuerdos = useMemo(() => (
    prestamos
      .map((prestamo) => ({
        prestamo,
        acuerdo: parsearAcuerdo(prestamo.acuerdoDigital)
      }))
      .filter(({ acuerdo }) => Boolean(acuerdo?.archivo?.dataUrl))
  ), [prestamos])

  const descargarAcuerdo = ({ prestamo, acuerdo }) => {
    const link = document.createElement("a")
    link.href = acuerdo.archivo.dataUrl
    link.download =
      acuerdo.archivo.nombre ||
      `acuerdo-prestamo-${prestamo.id}.pdf`
    link.click()
  }

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Acuerdos y cuentas bancarias
          </h2>

          <p className="text-muted mb-0">
            Revisa los PDF enviados por clientes y los datos bancarios
            declarados para desembolso.
          </p>
        </div>

        <span className="badge bg-primary fs-6">
          {acuerdos.length} recibidos
        </span>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Prestamo</th>
                  <th>Cliente</th>
                  <th>Banco</th>
                  <th>Cuenta</th>
                  <th>Titular</th>
                  <th>Archivo</th>
                  <th>Fecha envio</th>
                  <th>Accion</th>
                </tr>
              </thead>

              <tbody>
                {acuerdos.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No hay acuerdos PDF enviados por clientes.
                    </td>
                  </tr>
                )}

                {acuerdos.map(({ prestamo, acuerdo }) => (
                  <tr key={prestamo.id}>
                    <td>#{prestamo.id}</td>

                    <td>
                      <div className="fw-semibold">
                        {prestamo.cliente?.nombre || "Sin cliente"}
                      </div>
                      <small className="text-muted">
                        {prestamo.cliente?.correo || ""}
                      </small>
                    </td>

                    <td>{acuerdo.datosBancarios?.banco || "-"}</td>

                    <td>
                      <div>{acuerdo.datosBancarios?.tipoCuenta || "-"}</div>
                      <small className="text-muted">
                        {acuerdo.datosBancarios?.numeroCuenta || "-"}
                      </small>
                    </td>

                    <td>{acuerdo.datosBancarios?.titularCuenta || "-"}</td>

                    <td>
                      <span className="badge bg-danger">
                        <i className="bi bi-file-earmark-pdf me-1"></i>
                        {acuerdo.archivo?.nombre || "acuerdo.pdf"}
                      </span>
                    </td>

                    <td>
                      {acuerdo.enviadoEn
                        ? new Date(acuerdo.enviadoEn).toLocaleString("es-PE")
                        : "-"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => descargarAcuerdo({ prestamo, acuerdo })}
                      >
                        <i className="bi bi-download me-1"></i>
                        Descargar PDF
                      </button>
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

function parsearAcuerdo(valor) {
  if (!valor) {
    return null
  }

  try {
    return JSON.parse(valor)
  } catch (error) {
    console.error(error)
    return null
  }
}

export default GAcuerdos
