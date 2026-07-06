import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { obtenerUsuario, login } from "../../services/authService"
import { crearCliente } from "../../services/clienteService"
import { crearPrestamo } from "../../services/prestamoService"
import {
  DESCUENTO_MAXIMO_SEGURIDAD,
  INTERES_BASE_ANUAL,
  PUNTAJE_MINIMO_RECOMPENSA,
  formatearPorcentaje
} from "../../utils/recompensaSeguridad"

function SolicitarPrestamo() {
  const navigate = useNavigate()
  const usuario = obtenerUsuario()

  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    dni: usuario?.dni || "",
    correo: usuario?.correo || "",
    telefono: usuario?.telefono || "",
    monto: 10000,
    cuotas: 12,
    interesAnual: INTERES_BASE_ANUAL
  })

  const resumen = useMemo(() => {
    const monto = Number(form.monto)
    const cuotas = Number(form.cuotas)
    const interesAnual = Number(form.interesAnual)
    const total =
      monto + (monto * (interesAnual / 100) * (cuotas / 12))

    return {
      total,
      cuotaMensual: total / cuotas
    }
  }, [form])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const obtenerClienteId = async () => {
    if (usuario?.clienteId) {
      return usuario.clienteId
    }

    const cliente = await crearCliente({
      nombre: form.nombre,
      dni: form.dni,
      correo: form.correo,
      telefono: form.telefono,
      estado: "Activo"
    })

    login({
      username: cliente.correo,
      rol: "CLIENTE",
      clienteId: cliente.id,
      nombre: cliente.nombre,
      correo: cliente.correo,
      telefono: cliente.telefono,
      dni: cliente.dni
    })

    return cliente.id
  }

  const enviarSolicitud = async (e) => {
    e.preventDefault()

    try {
      const clienteId = await obtenerClienteId()
      const prestamo = await crearPrestamo({
        monto: Number(form.monto),
        garantia: "Activo digital pendiente",
        estado: "Pendiente",
        cuotas: Number(form.cuotas),
        interesAnual: Number(form.interesAnual),
        cuotaMensual: resumen.cuotaMensual,
        totalPagar: resumen.total,
        cliente: {
          id: clienteId
        }
      })

      localStorage.setItem(
        "prestamoActivoId",
        String(prestamo.id)
      )

      navigate(`/garantia?prestamoId=${prestamo.id}`)
    } catch (error) {
      console.error(error)
      alert("No se pudo guardar la solicitud")
    }
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <span className="badge bg-primary px-3 py-2 fs-6 mb-3">
                Paso 1 de 2
              </span>

              <h1 className="fw-bold display-5">
                Calcula tu prestamo
              </h1>

              <p className="text-muted mt-3">
                Define el monto y plazo antes de registrar
                tu activo digital y documentos.
              </p>
            </div>

            <form onSubmit={enviarSolicitud}>
              <div className="row g-4">
                <div className="col-lg-7">
                  <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-5">
                      <h3 className="fw-bold mb-4">
                        Datos personales
                      </h3>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">
                            Nombre completo
                          </label>

                          <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            DNI
                          </label>

                          <input
                            type="text"
                            name="dni"
                            className="form-control"
                            value={form.dni}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Correo
                          </label>

                          <input
                            type="email"
                            name="correo"
                            className="form-control"
                            value={form.correo}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label className="form-label">
                            Telefono
                          </label>

                          <input
                            type="text"
                            name="telefono"
                            className="form-control"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <hr className="my-5" />

                      <h3 className="fw-bold mb-4">
                        Condiciones del prestamo
                      </h3>

                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">
                            Monto solicitado
                          </label>

                          <input
                            type="number"
                            name="monto"
                            className="form-control"
                            min="1000"
                            step="500"
                            value={form.monto}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">
                            Cuotas
                          </label>

                          <select
                            name="cuotas"
                            className="form-select"
                            value={form.cuotas}
                            onChange={handleChange}
                          >
                            <option value="6">6 meses</option>
                            <option value="12">12 meses</option>
                            <option value="24">24 meses</option>
                            <option value="36">36 meses</option>
                          </select>
                        </div>

                        <div className="col-md-4">
                          <label className="form-label">
                            Interes anual base
                          </label>

                          <input
                            type="number"
                            name="interesAnual"
                            className="form-control"
                            value={form.interesAnual}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="alert alert-info border-0 mt-4 mb-0">
                        <div className="d-flex gap-3">
                          <i className="bi bi-shield-check fs-4"></i>
                          <div>
                            <strong>Recompensa por seguridad</strong>
                            <p className="mb-0">
                              Si tu garantia supera {PUNTAJE_MINIMO_RECOMPENSA}
                              puntos de seguridad, tu interes anual baja de
                              {" "}{formatearPorcentaje(INTERES_BASE_ANUAL)}
                              {" "}hasta un maximo de
                              {" "}{formatearPorcentaje(DESCUENTO_MAXIMO_SEGURIDAD)}
                              {" "}de descuento.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="card bg-dark text-white border-0 shadow rounded-4 h-100">
                    <div className="card-body p-5 d-flex flex-column justify-content-center">
                      <span className="text-info fw-semibold mb-3">
                        Cuota mensual estimada
                      </span>

                      <h1 className="display-4 fw-bold text-info mb-4">
                        S/ {resumen.cuotaMensual.toFixed(2)}
                      </h1>

                      <div className="d-grid gap-3">
                        <div className="bg-secondary bg-opacity-25 rounded-4 p-3">
                          <small className="text-light-emphasis">
                            Total a pagar
                          </small>

                          <h5 className="fw-bold mt-2">
                            S/ {resumen.total.toFixed(2)}
                          </h5>
                        </div>

                        <div className="bg-secondary bg-opacity-25 rounded-4 p-3">
                          <small className="text-light-emphasis">
                            Plazo
                          </small>

                          <h5 className="fw-bold mt-2">
                            {form.cuotas} cuotas
                          </h5>
                        </div>

                        <div className="bg-secondary bg-opacity-25 rounded-4 p-3">
                          <small className="text-light-emphasis">
                            Interes base
                          </small>

                          <h5 className="fw-bold mt-2">
                            {formatearPorcentaje(form.interesAnual)}
                          </h5>
                        </div>

                        <div className="bg-success bg-opacity-25 rounded-4 p-3">
                          <small className="text-light-emphasis">
                            Beneficio posible
                          </small>

                          <h5 className="fw-bold mt-2">
                            Hasta {" "}
                            {formatearPorcentaje(
                              INTERES_BASE_ANUAL - DESCUENTO_MAXIMO_SEGURIDAD
                            )} anual
                          </h5>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-info btn-lg mt-5 fw-bold"
                      >
                        Guardar y registrar activo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolicitarPrestamo
