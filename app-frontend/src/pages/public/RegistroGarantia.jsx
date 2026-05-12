import { useState } from "react"

function RegistroGarantia() {

  const [form, setForm] = useState({

    tipo: "",

    nombreActivo: "",

    identificador: "",

    correo: "",

    fechaInicio: "",

    acepta: false

  })

  const [archivoDashboard,
    setArchivoDashboard] =
    useState(null)

  const [archivoFactura,
    setArchivoFactura] =
    useState(null)

  const handleChange = (e) => {

    const { name, value, type, checked }
      = e.target

    setForm({

      ...form,

      [name]:
        type === "checkbox"
          ? checked
          : value

    })

  }

  const enviarGarantia = (e) => {

    e.preventDefault()

    if (!form.acepta) {

      alert(
        "Debe aceptar términos y condiciones"
      )

      return

    }

    alert(
      "Garantía enviada correctamente"
    )

  }

  return (

    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10">

            {/* HEADER */}

            <div className="text-center mb-5">

              <span className="badge bg-primary px-3 py-2 fs-6 mb-3">

                Plataforma Segura

              </span>

              <h1 className="fw-bold display-5">

                Registro de Garantía Digital

              </h1>

              <p className="text-muted mt-3">

                Complete la información del activo
                digital que será utilizado como
                respaldo financiero.

              </p>

            </div>

            {/* FORM CARD */}

            <div className="card border-0 shadow-lg rounded-4">

              <div className="card-body p-5">

                <form onSubmit={enviarGarantia}>

                  {/* ========================= */}
                  {/* ACTIVO DIGITAL */}
                  {/* ========================= */}

                  <div className="mb-5">

                    <h4 className="fw-bold text-primary mb-4">

                      <i className="bi bi-globe2 me-2"></i>

                      Información del Activo

                    </h4>

                    <div className="row g-4">

                      {/* TIPO */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          Tipo de Garantía

                        </label>

                        <select
                          name="tipo"
                          className="form-select"
                          value={form.tipo}
                          onChange={handleChange}
                        >

                          <option value="">
                            Seleccione
                          </option>

                          <option value="YouTube">
                            Canal YouTube
                          </option>

                          <option value="Dominio">
                            Dominio Web
                          </option>

                          <option value="Stripe">
                            Cuenta Stripe
                          </option>

                          <option value="PayPal">
                            Cuenta PayPal
                          </option>

                          <option value="SaaS">
                            Plataforma SaaS
                          </option>

                        </select>

                      </div>

                      {/* NOMBRE */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          Nombre del Activo

                        </label>

                        <input
                          type="text"
                          name="nombreActivo"
                          className="form-control"
                          placeholder="Ej: Mi Canal Tech"
                          value={form.nombreActivo}
                          onChange={handleChange}
                        />

                      </div>

                      {/* IDENTIFICADOR */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          URL / ID Canal / Dominio

                        </label>

                        <input
                          type="text"
                          name="identificador"
                          className="form-control"
                          placeholder="https://..."
                          value={form.identificador}
                          onChange={handleChange}
                        />

                      </div>

                      {/* EMAIL */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          Email del titular

                        </label>

                        <input
                          type="email"
                          name="correo"
                          className="form-control"
                          placeholder="correo@gmail.com"
                          value={form.correo}
                          onChange={handleChange}
                        />

                      </div>

                    </div>

                  </div>

                  {/* ========================= */}
                  {/* SEGURIDAD */}
                  {/* ========================= */}

                  <div className="mb-5">

                    <h4 className="fw-bold text-primary mb-4">

                      <i className="bi bi-shield-lock me-2"></i>

                      Validación y Seguridad

                    </h4>

                    <div className="row g-4">

                      {/* DASHBOARD */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          Captura Dashboard

                        </label>

                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) =>
                            setArchivoDashboard(
                              e.target.files[0]
                            )
                          }
                        />

                        {archivoDashboard && (

                          <small className="text-success">

                            Archivo:
                            {" "}
                            {archivoDashboard.name}

                          </small>

                        )}

                      </div>

                      {/* FACTURA */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          Factura / Comprobante

                        </label>

                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) =>
                            setArchivoFactura(
                              e.target.files[0]
                            )
                          }
                        />

                        {archivoFactura && (

                          <small className="text-success">

                            Archivo:
                            {" "}
                            {archivoFactura.name}

                          </small>

                        )}

                      </div>

                    </div>

                  </div>

                  {/* ========================= */}
                  {/* LEGAL */}
                  {/* ========================= */}

                  <div className="mb-5">

                    <h4 className="fw-bold text-primary mb-4">

                      <i className="bi bi-file-earmark-text me-2"></i>

                      Información Legal

                    </h4>

                    <div className="row g-4">

                      {/* FECHA */}

                      <div className="col-md-6">

                        <label className="form-label fw-semibold">

                          Fecha de adquisición

                        </label>

                        <input
                          type="date"
                          name="fechaInicio"
                          className="form-control"
                          value={form.fechaInicio}
                          onChange={handleChange}
                        />

                      </div>

                    </div>

                    {/* CHECKBOX */}

                    <div className="form-check mt-4">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="acepta"
                        checked={form.acepta}
                        onChange={handleChange}
                      />

                      <label className="form-check-label">

                        Acepto términos,
                        políticas y validación
                        de activos digitales.

                      </label>

                    </div>

                  </div>

                  {/* RESUMEN */}

                  <div className="alert alert-info border-0 rounded-4">

                    <div className="d-flex align-items-center">

                      <i className="bi bi-info-circle-fill fs-4 me-3"></i>

                      <div>

                        El equipo de auditoría validará
                        la garantía digital antes de
                        aprobar el préstamo.

                      </div>

                    </div>

                  </div>

                  {/* BOTÓN */}

                  <div className="d-grid mt-5">

                    <button
                      type="submit"
                      className="btn btn-primary btn-lg py-3 fw-bold"
                    >

                      <i className="bi bi-cloud-upload me-2"></i>

                      Enviar Garantía Digital

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