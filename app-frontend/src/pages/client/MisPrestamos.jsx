import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { obtenerUsuario } from "../../services/authService"
import {
  firmarAcuerdoPrestamo,
  obtenerPrestamos,
  obtenerPrestamosPorCliente
} from "../../services/prestamoService"
import { obtenerGarantiasPorPrestamo } from "../../services/garantiaService"
import { formatearMoneda } from "../../utils/moneda"
import {
  INTERES_BASE_ANUAL,
  formatearPorcentaje
} from "../../utils/recompensaSeguridad"

function MisPrestamos() {
  const usuario = obtenerUsuario()

  const [prestamos, setPrestamos] = useState([])
  const [garantiasPorPrestamo, setGarantiasPorPrestamo] = useState({})
  const [prestamoFirma, setPrestamoFirma] = useState(null)
  const [datosBancarios, setDatosBancarios] = useState({
    banco: "",
    tipoCuenta: "Ahorros",
    numeroCuenta: "",
    titularCuenta: usuario?.nombre || ""
  })
  const [archivoAcuerdo, setArchivoAcuerdo] = useState(null)
  const [acuerdoUrl, setAcuerdoUrl] = useState("")
  const [acuerdoError, setAcuerdoError] = useState("")

  const cargarPrestamos = useCallback(async () => {
    try {
      const data = usuario?.clienteId
        ? await obtenerPrestamosPorCliente(usuario.clienteId)
        : await obtenerPrestamos()

      setPrestamos(data)

      const garantias = await Promise.all(
        data.map(async (prestamo) => {
          const resultado =
            await obtenerGarantiasPorPrestamo(prestamo.id)

          return [prestamo.id, resultado[0] || null]
        })
      )

      setGarantiasPorPrestamo(
        Object.fromEntries(garantias)
      )
    } catch (error) {
      console.error(error)
    }
  }, [usuario?.clienteId])

  useEffect(() => {
    cargarPrestamos()
  }, [cargarPrestamos])

  const abrirFirma = (prestamo) => {
    setPrestamoFirma(prestamo)
    setDatosBancarios({
      banco: "",
      tipoCuenta: "Ahorros",
      numeroCuenta: "",
      titularCuenta: usuario?.nombre || ""
    })
    setArchivoAcuerdo(null)
    setAcuerdoUrl("")
    setAcuerdoError("")
  }

  const handleBancoChange = (e) => {
    setDatosBancarios({
      ...datosBancarios,
      [e.target.name]: e.target.value
    })
  }

  const generarPdfLegal = () => {
    if (!prestamoFirma) return

    const camposCompletos =
      datosBancarios.banco.trim() &&
      datosBancarios.numeroCuenta.trim() &&
      datosBancarios.titularCuenta.trim()

    if (!camposCompletos) {
      setAcuerdoError("Completa los datos bancarios antes de generar el PDF.")
      return
    }

    const blob = crearPdfAcuerdo({
      prestamo: prestamoFirma,
      usuario,
      datosBancarios
    })
    const file = new File(
      [blob],
      `acuerdo-prestamo-${prestamoFirma.id}.pdf`,
      { type: "application/pdf" }
    )
    const url = URL.createObjectURL(blob)

    if (acuerdoUrl) {
      URL.revokeObjectURL(acuerdoUrl)
    }

    setArchivoAcuerdo(file)
    setAcuerdoUrl(url)
    setAcuerdoError("")
  }

  const handleArchivoAcuerdo = (e) => {
    const file = e.target.files?.[0]

    if (!file) {
      setArchivoAcuerdo(null)
      return
    }

    if (file.type !== "application/pdf") {
      setAcuerdoError("Solo se permite subir un archivo PDF.")
      e.target.value = ""
      setArchivoAcuerdo(null)
      return
    }

    setArchivoAcuerdo(file)
    setAcuerdoError("")
  }

  const enviarFirma = async (e) => {
    e.preventDefault()

    if (!prestamoFirma || !archivoAcuerdo) {
      setAcuerdoError("Genera o sube el PDF del acuerdo antes de enviarlo.")
      return
    }

    try {
      const dataUrl = await leerArchivoComoDataUrl(archivoAcuerdo)

      await firmarAcuerdoPrestamo(
        prestamoFirma.id,
        JSON.stringify({
          tipo: "ACUERDO_PRESTAMO_PDF",
          archivo: {
            nombre: archivoAcuerdo.name,
            tipo: archivoAcuerdo.type,
            tamano: archivoAcuerdo.size,
            dataUrl
          },
          datosBancarios,
          enviadoEn: new Date().toISOString()
        })
      )

      setPrestamoFirma(null)
      setArchivoAcuerdo(null)
      setAcuerdoUrl("")
      setAcuerdoError("")
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

  const tieneRecompensa = (prestamo) => (
    Number(prestamo.interesAnual || INTERES_BASE_ANUAL)
      < INTERES_BASE_ANUAL
  )

  const puedeFirmarAcuerdo = (prestamo) => {
    const garantia =
      garantiasPorPrestamo[prestamo.id]

    const garantiaAprobada =
      garantia?.estado === "Verificada" ||
      garantia?.recomendacion === "Aprobar"

    return (
      (prestamo.estado === "Aprobado" || garantiaAprobada) &&
      prestamo.estadoAcuerdo !== "Firmado"
    )
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
                    <th>Seguridad</th>
                    <th>Interes</th>
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

                      <td>
                        <div className="fw-semibold">
                          {formatearMoneda(prestamo.monto, prestamo.moneda)}
                        </div>
                        {prestamo.moneda === "USD" && (
                          <small className="text-muted">
                            Eq. {formatearMoneda(prestamo.montoEnSoles, "PEN")}
                          </small>
                        )}
                      </td>

                      <td>
                        {formatearMoneda(prestamo.cuotaMensual, prestamo.moneda)}
                      </td>

                      <td>
                        {garantiasPorPrestamo[prestamo.id]?.puntuacion
                          ? (
                            <span className="badge bg-info text-dark">
                              {garantiasPorPrestamo[prestamo.id].puntuacion}/100
                            </span>
                          )
                          : "Sin evaluar"}
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {formatearPorcentaje(
                            prestamo.interesAnual || INTERES_BASE_ANUAL
                          )}
                        </div>

                        {tieneRecompensa(prestamo) && (
                          <span className="badge bg-success">
                            Recompensa aplicada
                          </span>
                        )}
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
                        {puedeFirmarAcuerdo(prestamo) && (
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
                  Datos bancarios para desembolso
                </label>

                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="banco"
                      className="form-control"
                      value={datosBancarios.banco}
                      onChange={handleBancoChange}
                      placeholder="Banco"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <select
                      name="tipoCuenta"
                      className="form-select"
                      value={datosBancarios.tipoCuenta}
                      onChange={handleBancoChange}
                    >
                      <option value="Ahorros">Cuenta de ahorros</option>
                      <option value="Corriente">Cuenta corriente</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="numeroCuenta"
                      className="form-control"
                      value={datosBancarios.numeroCuenta}
                      onChange={handleBancoChange}
                      placeholder="Numero de cuenta"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      name="titularCuenta"
                      className="form-control"
                      value={datosBancarios.titularCuenta}
                      onChange={handleBancoChange}
                      placeholder="Titular de la cuenta"
                      required
                    />
                  </div>
                </div>

                <div className="alert alert-light border mt-4">
                  <strong>Acuerdo legal breve.</strong>
                  {" "}Genera el PDF, revisalo y subelo firmado para enviarlo
                  al administrador.
                </div>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={generarPdfLegal}
                  >
                    <i className="bi bi-file-earmark-pdf me-2"></i>
                    Generar PDF
                  </button>

                  {acuerdoUrl && (
                    <a
                      href={acuerdoUrl}
                      download={`acuerdo-prestamo-${prestamoFirma.id}.pdf`}
                      className="btn btn-outline-success"
                    >
                      Descargar PDF
                    </a>
                  )}
                </div>

                <label className="form-label">
                  Subir acuerdo firmado en PDF
                </label>

                <input
                  type="file"
                  accept="application/pdf"
                  className="form-control"
                  onChange={handleArchivoAcuerdo}
                />

                {archivoAcuerdo && (
                  <div className="form-text text-success">
                    Archivo listo: {archivoAcuerdo.name}
                  </div>
                )}

                {acuerdoError && (
                  <div className="alert alert-danger py-2 mt-3 mb-0">
                    {acuerdoError}
                  </div>
                )}

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

function leerArchivoComoDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function crearPdfAcuerdo({ prestamo, usuario, datosBancarios }) {
  const fecha = new Date().toLocaleDateString("es-PE")
  const lineas = [
    "ACUERDO DIGITAL DE PRESTAMO",
    "",
    `Fecha: ${fecha}`,
    `Cliente: ${limpiarTexto(usuario?.nombre || prestamo.cliente?.nombre || "Cliente")}`,
    `Prestamo: #${prestamo.id}`,
    `Monto aprobado: ${formatearMoneda(prestamo.monto, prestamo.moneda)}`,
    `Equivalente en soles: ${formatearMoneda(prestamo.montoEnSoles || prestamo.monto, "PEN")}`,
    `Cuotas: ${prestamo.cuotas || 0}`,
    `Tasa anual final: ${formatearPorcentaje(prestamo.interesAnual || INTERES_BASE_ANUAL)}`,
    `Cuota mensual: ${formatearMoneda(prestamo.cuotaMensual, prestamo.moneda)}`,
    "",
    "DATOS BANCARIOS PARA DESEMBOLSO",
    `Banco: ${limpiarTexto(datosBancarios.banco)}`,
    `Tipo de cuenta: ${limpiarTexto(datosBancarios.tipoCuenta)}`,
    `Numero de cuenta: ${limpiarTexto(datosBancarios.numeroCuenta)}`,
    `Titular: ${limpiarTexto(datosBancarios.titularCuenta)}`,
    "",
    "DECLARACION",
    "El cliente declara que acepta las condiciones del prestamo aprobado,",
    "autoriza el desembolso a la cuenta indicada y confirma que la",
    "informacion bancaria registrada es correcta.",
    "",
    "Firma del cliente: ________________________________"
  ]

  return construirPdfBasico(lineas)
}

function construirPdfBasico(lineas) {
  const contenido =
    "BT\n/F1 11 Tf\n1 0 0 1 48 770 Tm\n" +
    lineas.map((linea) => `(${escaparPdf(limpiarTexto(linea))}) Tj\n0 -18 Td`).join("\n") +
    "\nET"

  const objetos = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${contenido.length} >>\nstream\n${contenido}\nendstream`
  ]

  let pdf = "%PDF-1.4\n"
  const offsets = [0]

  objetos.forEach((objeto, index) => {
    offsets.push(pdf.length)
    pdf += `${index + 1} 0 obj\n${objeto}\nendobj\n`
  })

  const xref = pdf.length
  pdf += `xref\n0 ${objetos.length + 1}\n`
  pdf += "0000000000 65535 f \n"
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`

  return new Blob([pdf], { type: "application/pdf" })
}

function escaparPdf(valor) {
  return valor
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
}

function limpiarTexto(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, "")
}

export default MisPrestamos
