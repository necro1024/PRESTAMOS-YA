import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"

import { obtenerDashboard }
from "../../services/dashboardService"

import LoansChart
from "../../components/dashboard/LoansChart"

import GuaranteeChart
from "../../components/dashboard/GuaranteeChart"

function Dashboard() {

  const [dashboard, setDashboard] =
    useState({
      clientes: 0,
      prestamos: 0,
      aprobados: 0,
      pendientes: 0,
      montoTotal: 0
    })

  useEffect(() => {

    cargarDashboard()

  }, [])

  // CARGAR DASHBOARD

  const cargarDashboard = async () => {

    try {

      const data =
        await obtenerDashboard()

      setDashboard(data)

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <AdminLayout>

      <h2 className="fw-bold mb-4">
        Dashboard Administrativo
      </h2>

      {/* KPIs */}

      <div className="row g-4">

        {/* CLIENTES */}

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Clientes
              </h6>

              <h2 className="fw-bold">
                {dashboard.clientes}
              </h2>

            </div>

          </div>

        </div>

        {/* PRÉSTAMOS */}

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Préstamos
              </h6>

              <h2 className="fw-bold">
                {dashboard.prestamos}
              </h2>

            </div>

          </div>

        </div>

        {/* APROBADOS */}

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Aprobados
              </h6>

              <h2 className="fw-bold text-success">
                {dashboard.aprobados}
              </h2>

            </div>

          </div>

        </div>

        {/* PENDIENTES */}

        <div className="col-md-3">

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              <h6 className="text-muted">
                Pendientes
              </h6>

              <h2 className="fw-bold text-warning">
                {dashboard.pendientes}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* MONTO TOTAL */}

      <div className="card border-0 shadow-sm mt-4">

        <div className="card-body">

          <h5 className="text-muted">
            Monto Total Prestado
          </h5>

          <h1 className="fw-bold text-primary">

            S/ {dashboard.montoTotal}

          </h1>

        </div>

      </div>

      {/* GRÁFICO */}

      <LoansChart dashboard={dashboard} />

      <GuaranteeChart />

    </AdminLayout>

  )
}

export default Dashboard