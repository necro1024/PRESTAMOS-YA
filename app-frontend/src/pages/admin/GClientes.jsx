import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"

import ClienteModal from "../../components/clientes/ClienteModal"

import {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
} from "../../services/clienteService"

function GClientes() {

  const [clientes, setClientes] = useState([])

  const [clienteEditar, setClienteEditar] =
    useState(null)

  // CARGAR CLIENTES

  const cargarClientes = async () => {

    try {

      const data =
        await obtenerClientes()

      setClientes(data)

    } catch (error) {

      console.error(error)

    }
  }

  useEffect(() => {

    cargarClientes()

  }, [])

  // GUARDAR

  const guardarCliente = async (
    cliente
  ) => {

    try {

      if (cliente.id) {

        await actualizarCliente(
          cliente.id,
          cliente
        )

      } else {

        await crearCliente(cliente)

      }

      cargarClientes()

    } catch (error) {

      console.error(error)

    }
  }

  const borrarCliente = async (
    id
  ) => {

    try {

      await eliminarCliente(id)

      cargarClientes()

    } catch (error) {

      console.error(error)

    }
  }

  // =========================
  // EDITAR
  // =========================

  const editarCliente = (
    cliente
  ) => {

    setClienteEditar(cliente)

  }

  // =========================
  // RETURN
  // =========================

  return (

    <AdminLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Gestión de Clientes
        </h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#clienteModal"
          onClick={() =>
            setClienteEditar(null)
          }
        >
          Nuevo Cliente
        </button>

      </div>

      <div className="card border-0 shadow-sm">

        <div className="card-body">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>
                <th>DNI</th>
                <th>Cliente</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>

              </tr>

            </thead>

            <tbody>

              {clientes.map(cliente => (

                <tr key={cliente.id}>

                  <td>{cliente.id}</td>

                  <td>{cliente.dni}</td>

                  <td>{cliente.nombre}</td>

                  <td>{cliente.correo}</td>

                  <td>{cliente.estado}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      data-bs-toggle="modal"
                      data-bs-target="#clienteModal"
                      onClick={() =>
                        editarCliente(cliente)
                      }
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        borrarCliente(cliente.id)
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

      <ClienteModal
        onGuardar={guardarCliente}
        clienteEditar={clienteEditar}
      />

    </AdminLayout>

  )
}

export default GClientes
