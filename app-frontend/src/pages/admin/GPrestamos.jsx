import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"

import ModalAuditoria from "../../components/prestamos/ModalAuditoria"

import {
  obtenerPrestamos,
  crearPrestamo,
  actualizarPrestamo,
  eliminarPrestamo
} from "../../services/prestamoService"

import {
  obtenerClientes
} from "../../services/clienteService"

function GPrestamos() {

  const [prestamos, setPrestamos] = useState([])

  const [clientes, setClientes] = useState([])

  const [prestamoEditar, setPrestamoEditar] =
    useState(null)

  useEffect(() => {

    cargarPrestamos()

    cargarClientes()

  }, [])

  // CARGAR PRÉSTAMOS

  const cargarPrestamos = async () => {

    try {

      const data = await obtenerPrestamos()

      setPrestamos(data)

    } catch (error) {

      console.error(error)

    }
  }

  // CARGAR CLIENTES
  const cargarClientes = async () => {

    try {

      const data = await obtenerClientes()

      setClientes(data)

    } catch (error) {

      console.error(error)

    }
  }

  // GUARDAR

  const guardarPrestamo = async (prestamo) => {

    try {

      // UPDATE

      if (prestamo.id) {

        await actualizarPrestamo(
          prestamo.id,
          prestamo
        )

      }


      else {

        await crearPrestamo(prestamo)

      }

      cargarPrestamos()

    } catch (error) {

      console.error(error)

    }
  }
  // ELIMINAR

  const borrarPrestamo = async (id) => {

    try {

      await eliminarPrestamo(id)

      cargarPrestamos()

    } catch (error) {

      console.error(error)

    }
  }

  // EDITAR

  const editarPrestamo = (prestamo) => {

    setPrestamoEditar(prestamo)

  }

  const [prestamoAuditar,
  setPrestamoAuditar] =
  useState(null)

  const actualizarEstadoPrestamo =
  async (id, estado) => {

    try {

      const prestamo =
        prestamos.find(
          p => p.id === id
        )

      const actualizado = {

        ...prestamo,

        estado

      }

      await actualizarPrestamo(
        id,
        actualizado
      )

      cargarPrestamos()

    } catch (error) {

      console.error(error)

    }
}

  return (

    <AdminLayout>

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Gestión de Préstamos
        </h2>

        <button
  className="btn btn-primary btn-sm me-2"
  data-bs-toggle="modal"
  data-bs-target="#modalAuditoria"
  onClick={() =>
    setPrestamoAuditar(prestamo)
  }
>

  <i className="bi bi-shield-lock me-1"></i>

  Auditar

</button>

      </div>

      {/* TABLA */}

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>

                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Garantía</th>
                  <th>Estado</th>
                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {prestamos.map(prestamo => (

                  <tr key={prestamo.id}>

                    <td>{prestamo.id}</td>

                    <td>
                      {prestamo.cliente?.nombre}
                    </td>

                    <td>
                      S/ {prestamo.monto}
                    </td>

                    <td>
                      {prestamo.garantia}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          prestamo.estado === "Aprobado"
                            ? "bg-success"
                            : prestamo.estado === "Pendiente"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                        }`}
                      >
                        {prestamo.estado}
                      </span>

                    </td>

                    <td>

                      {/* EDITAR */}

                      <button
  className="btn btn-primary btn-sm me-2"
  data-bs-toggle="modal"
  data-bs-target="#modalAuditoria"
  onClick={() =>
    setPrestamoAuditar(prestamo)
  }
>

  <i className="bi bi-shield-check me-1"></i>

  Auditar

</button>

                      {/* ELIMINAR */}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          borrarPrestamo(prestamo.id)
                        }
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
  onActualizarEstado={
    actualizarEstadoPrestamo
  }
/>

    </AdminLayout>

  )
}

export default GPrestamos