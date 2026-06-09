import { useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { crearGarantia } from "../../services/garantiaService"

function RegistroGarantia() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const prestamoId = useMemo(() => {
    return searchParams.get("prestamoId") ||
      localStorage.getItem("prestamoActivoId")
  }, [searchParams])

  const [form, setForm] = useState({
    tipo: "",
    nombreActivo: "",
    identificador: "",
    correoTitular: "",
    fechaInicio: "",
    valorEstimado: "",
    ingresosMensuales: "",
    identificacionPersonal: "",
    documentacionPersonal: "",
    historialCrediticio: "",
    comprobantesIngresos: "",
    comprobanteActivo: "",
    acepta: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    const nextValue = type === "checkbox"
      ? checked
      : files?.[0]?.name || value

    setForm({
      ...form,
      [name]: nextValue
    })
  }

  const enviarGarantia = async (e) => {
    e.preventDefault()

    if (!prestamoId) {
      alert("Primero debes calcular y guardar el prestamo")
      navigate("/solicitar")
      return
    }

    if (!form.acepta) {
      alert("Debe aceptar terminos y validacion de activos digitales")
      return
    }

    try {
      await crearGarantia({
        tipo: form.tipo,
        nombreActivo: form.nombreActivo,
        identificador: form.identificador,
        correoTitular: form.correoTitular,
        fechaInicio: form.fechaInicio,
        valorEstimado: Number(form.valorEstimado),
        ingresosMensuales: Number(form.ingresosMensuales),
        identificacionPersonal: form.identificacionPersonal,
        documentacionPersonal: form.documentacionPersonal,
        historialCrediticio: form.historialCrediticio,
        comprobantesIngresos: form.comprobantesIngresos,
        comprobanteActivo: form.comprobanteActivo,
        estado: "Pendiente",
        prestamo: {
          id: Number(prestamoId)
        }
      })

      localStorage.removeItem("prestamoActivoId")
      navigate("/mis-prestamos")
    } catch (error) {
      console.error(error)
      alert("No se pudo guardar la garantia")
    }
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 fs-6 mb-3">
                Paso 2 de 2
              </span>

              <h1 className="fw-bold display-5">
                Registro de Garantia Digital
              </h1>

              <p className="text-muted mt-3">
                Completa la informacion del activo digital,
                documentos personales, historial e ingresos.
              </p>
            </div>

            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <form onSubmit={enviarGarantia}>
                  <div className="mb-5">
                    <h4 className="fw-bold text-primary mb-4">
                      <i className="bi bi-globe2 me-2"></i>
                      Activo digital
                    </h4>

                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Tipo de activo
                        </label>

                        <select
                          name="tipo"
                          className="form-select"
                          value={form.tipo}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Seleccione</option>
                          <option value="YouTube">Canal YouTube</option>
                          <option value="Dominio">Dominio Web</option>
                          <option value="Stripe">Cuenta Stripe</option>
                          <option value="PayPal">Cuenta PayPal</option>
                          <option value="SaaS">Plataforma SaaS</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Nombre del activo
                        </label>

                        <input
                          type="text"
                          name="nombreActivo"
                          className="form-control"
                          placeholder="Ej: Mi Canal Tech"
                          value={form.nombreActivo}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          URL, dominio o ID
                        </label>

                        <input
                          type="text"
                          name="identificador"
                          className="form-control"
                          placeholder="https://..."
                          value={form.identificador}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Email del titular
                        </label>

                        <input
                          type="email"
                          name="correoTitular"
                          className="form-control"
                          value={form.correoTitular}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Fecha de adquisicion
                        </label>

                        <input
                          type="date"
                          name="fechaInicio"
                          className="form-control"
                          value={form.fechaInicio}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Valor estimado
                        </label>

                        <input
                          type="number"
                          name="valorEstimado"
                          className="form-control"
                          value={form.valorEstimado}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Ingresos mensuales
                        </label>

                        <input
                          type="number"
                          name="ingresosMensuales"
                          className="form-control"
                          value={form.ingresosMensuales}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="fw-bold text-primary mb-4">
                      <i className="bi bi-person-vcard me-2"></i>
                      Identificacion y documentacion personal
                    </h4>

                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Identificacion personal
                        </label>

                        <input
                          type="file"
                          name="identificacionPersonal"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label fw-semibold">
                          Documentacion personal
                        </label>

                        <input
                          type="file"
                          name="documentacionPersonal"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="fw-bold text-primary mb-4">
                      <i className="bi bi-file-earmark-check me-2"></i>
                      Historial, ingresos y comprobantes
                    </h4>

                    <div className="row g-4">
                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Historial crediticio
                        </label>

                        <input
                          type="file"
                          name="historialCrediticio"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Comprobantes de ingresos
                        </label>

                        <input
                          type="file"
                          name="comprobantesIngresos"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">
                          Comprobante del activo
                        </label>

                        <input
                          type="file"
                          name="comprobanteActivo"
                          className="form-control"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info border-0 rounded-4">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-info-circle-fill fs-4 me-3"></i>
                      <div>
                        El administrador evaluara la garantia digital
                        y aprobara o rechazara la solicitud.
                      </div>
                    </div>
                  </div>

                  <div className="form-check mt-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="acepta"
                      checked={form.acepta}
                      onChange={handleChange}
                    />

                    <label className="form-check-label">
                      Acepto terminos, politicas y validacion de
                      activos digitales.
                    </label>
                  </div>

                  <div className="d-flex flex-wrap justify-content-between gap-2 mt-5">
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => navigate(-1)}
                      >
                        Volver
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => navigate("/")}
                      >
                        Cancelar
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-4 fw-bold"
                    >
                      <i className="bi bi-cloud-upload me-2"></i>
                      Enviar Garantia
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistroGarantia
