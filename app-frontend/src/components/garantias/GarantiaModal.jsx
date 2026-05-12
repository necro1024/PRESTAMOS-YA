import { useEffect, useState } from "react"

function GarantiaModal({
  onGuardar,
  garantiaEditar,
  prestamos
}) {

  // =========================
  // STATE
  // =========================

  const [garantia, setGarantia] = useState({

    tipo: "",

    identificador: "",

    valorEstimado: "",

    estado: "Pendiente",

    prestamo: {
      id: ""
    }

  })

  // =========================
  // CARGAR DATOS EDICIÓN
  // =========================

  useEffect(() => {

    if (garantiaEditar) {

      setGarantia(garantiaEditar)

    }

  }, [garantiaEditar])

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target

    // SELECT PRÉSTAMO

    if (name === "prestamo") {

      setGarantia({

        ...garantia,

        prestamo: {
          id: value
        }

      })

    }

    // OTROS INPUTS

    else {

      setGarantia({

        ...garantia,

        [name]: value

      })

    }
  }

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault()

    onGuardar(garantia)

  }

  return (

    <div
      className="modal fade"
      id="garantiaModal"
      tabIndex="-1"
    >

      <div className="modal-dialog">

        <div className="modal-content">

          {/* HEADER */}

          <div className="modal-header">

            <h5 className="modal-title">

              {garantiaEditar
                ? "Editar Garantía"
                : "Nueva Garantía"}

            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          {/* FORM */}

          <form onSubmit={handleSubmit}>

            <div className="modal-body">

              {/* TIPO */}

              <select
                name="tipo"
                className="form-select mb-3"
                value={garantia.tipo}
                onChange={handleChange}
              >

                <option value="">
                  Seleccione tipo
                </option>

                <option value="YouTube">
                  YouTube
                </option>

                <option value="Dominio">
                  Dominio
                </option>

                <option value="Stripe">
                  Stripe
                </option>

                <option value="PayPal">
                  PayPal
                </option>

              </select>

              {/* IDENTIFICADOR */}

              <input
                type="text"
                name="identificador"
                className="form-control mb-3"
                placeholder="URL o identificador"
                value={garantia.identificador}
                onChange={handleChange}
              />

              {/* VALOR */}

              <input
                type="number"
                name="valorEstimado"
                className="form-control mb-3"
                placeholder="Valor estimado"
                value={garantia.valorEstimado}
                onChange={handleChange}
              />

              {/* ESTADO */}

              <select
                name="estado"
                className="form-select mb-3"
                value={garantia.estado}
                onChange={handleChange}
              >

                <option value="Pendiente">
                  Pendiente
                </option>

                <option value="Verificada">
                  Verificada
                </option>

                <option value="Rechazada">
                  Rechazada
                </option>

              </select>

              {/* PRÉSTAMO */}

              <select
                name="prestamo"
                className="form-select"
                value={garantia.prestamo?.id || ""}
                onChange={handleChange}
              >

                <option value="">
                  Seleccione préstamo
                </option>

                {prestamos.map(prestamo => (

                  <option
                    key={prestamo.id}
                    value={prestamo.id}
                  >

                    #{prestamo.id}
                    {" - "}
                    {prestamo.cliente?.nombre}

                  </option>

                ))}

              </select>

            </div>

            {/* FOOTER */}

            <div className="modal-footer">

              <button
                type="submit"
                className="btn btn-primary"
              >

                {garantiaEditar
                  ? "Actualizar"
                  : "Guardar"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  )
}

export default GarantiaModal