import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"

import GarantiaModal
from "../../components/garantias/GarantiaModal"

import {
  obtenerGarantias,
  crearGarantia,
  actualizarGarantia,
  eliminarGarantia
} from "../../services/garantiaService"

import {
  obtenerPrestamos
} from "../../services/prestamoService"

function GGarantias() {

  // =========================
  // STATES
  // =========================

  const [garantias, setGarantias] =
    useState([])

  const [prestamos, setPrestamos] =
    useState([])

  const [garantiaEditar,
    setGarantiaEditar] =
    useState(null)

  // =========================
  // USE EFFECT
  // =========================

  useEffect(() => {

    cargarGarantias()

    cargarPrestamos()

  }, [])

  // =========================
  // CARGAR GARANTIAS
  // =========================

  const cargarGarantias = async () => {

    try {

      const data =
        await obtenerGarantias()

      setGarantias(data)

    } catch (error) {

      console.error(error)

    }
  }

  // =========================
  // CARGAR PRESTAMOS
  // =========================

  const cargarPrestamos = async () => {

    try {

      const data =
        await obtenerPrestamos()

      setPrestamos(data)

    } catch (error) {

      console.error(error)

    }
  }

  // =========================
  // GUARDAR
  // =========================

  const guardarGarantia = async (
    garantia
  ) => {

    try {

      if (garantia.id) {

        await actualizarGarantia(
          garantia.id,
          garantia
        )

      } else {

        await crearGarantia(
          garantia
        )

      }

      cargarGarantias()

    } catch (error) {

      console.error(error)

    }
  }

  // =========================
  // ELIMINAR
  // =========================

  const borrarGarantia = async (
    id
  ) => {

    try {

      await eliminarGarantia(id)

      cargarGarantias()

    } catch (error) {

      console.error(error)

    }
  }

  // =========================
  // EDITAR
  // =========================

  const editarGarantia = (
    garantia
  ) => {

    setGarantiaEditar(garantia)

  }

  return (

    <AdminLayout>

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          Gestión de Garantías
        </h2>

        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#garantiaModal"
          onClick={() =>
            setGarantiaEditar(null)
          }
        >
          Nueva Garantía
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
                  <th>Tipo</th>
                  <th>Identificador</th>
                  <th>Valor</th>
                  <th>Estado</th>
                  <th>Préstamo</th>
                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {garantias.map(garantia => (

                  <tr key={garantia.id}>

                    <td>{garantia.id}</td>

                    <td>{garantia.tipo}</td>

                    <td>
                      {garantia.identificador}
                    </td>

                    <td>
                      S/ {garantia.valorEstimado}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          garantia.estado === "Verificada"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {garantia.estado}
                      </span>

                    </td>

                    <td>

                      #{garantia.prestamo?.id}

                    </td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#garantiaModal"
                        onClick={() =>
                          editarGarantia(
                            garantia
                          )
                        }
                      >
                        Editar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          borrarGarantia(
                            garantia.id
                          )
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

      {/* MODAL */}

      <GarantiaModal
        onGuardar={guardarGarantia}
        garantiaEditar={garantiaEditar}
        prestamos={prestamos}
      />

    </AdminLayout>

  )
}

export default GGarantias