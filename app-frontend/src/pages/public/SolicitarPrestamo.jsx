import { useState } from "react"

import { Link } from "react-router-dom"

function SolicitarPrestamo() {

  const [form, setForm] = useState({

    nombre: "",

    correo: "",

    telefono: "",

    monto: ""

  })

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    })

  }

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-5">

              <h2 className="fw-bold mb-4 text-center">

                Solicitud de préstamo

              </h2>

              {/* NOMBRE */}

              <div className="mb-3">

                <label className="form-label">

                  Nombre completo

                </label>

                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                />

              </div>

              {/* CORREO */}

              <div className="mb-3">

                <label className="form-label">

                  Correo

                </label>

                <input
                  type="email"
                  name="correo"
                  className="form-control"
                  value={form.correo}
                  onChange={handleChange}
                />

              </div>

              {/* TELÉFONO */}

              <div className="mb-3">

                <label className="form-label">

                  Teléfono

                </label>

                <input
                  type="text"
                  name="telefono"
                  className="form-control"
                  value={form.telefono}
                  onChange={handleChange}
                />

              </div>

              {/* MONTO */}

              <div className="mb-4">

                <label className="form-label">

                  Monto solicitado

                </label>

                <input
                  type="number"
                  name="monto"
                  className="form-control"
                  value={form.monto}
                  onChange={handleChange}
                />

              </div>

              <div className="d-grid">

                <Link
                  to="/garantia"
                  className="btn btn-primary btn-lg"
                >
                  Continuar
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default SolicitarPrestamo