import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"
import { obtenerDashboard } from "../../services/dashboardService"
import LoansChart from "../../components/dashboard/LoansChart"
import GuaranteeChart from "../../components/dashboard/GuaranteeChart"

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    clientes: 0,
    prestamos: 0,
    aprobados: 0,
    pendientes: 0,
    montoTotal: 0,
    activosEvaluados: 0,
    activosPendientes: 0,
    riesgoPromedio: 0
  })

  const cargarDashboard = async () => {
    try {
      const data = await obtenerDashboard()
      setDashboard(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarDashboard()
  }, [])

  return (
    <AdminLayout>
      <h2 className="fw-bold mb-4">
        Dashboard Administrativo
      </h2>

      <div className="row g-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Clientes</h6>
              <h2 className="fw-bold">{dashboard.clientes}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Prestamos</h6>
              <h2 className="fw-bold">{dashboard.prestamos}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Aprobados</h6>
              <h2 className="fw-bold text-success">
                {dashboard.aprobados}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Pendientes</h6>
              <h2 className="fw-bold text-warning">
                {dashboard.pendientes}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-1">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Monto total solicitado</h6>
              <h2 className="fw-bold text-primary">
                S/ {Number(dashboard.montoTotal || 0).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Activos evaluados</h6>
              <h2 className="fw-bold text-success">
                {dashboard.activosEvaluados}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-muted">Score promedio</h6>
              <h2 className="fw-bold text-info">
                {Number(dashboard.riesgoPromedio || 0).toFixed(0)}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <LoansChart dashboard={dashboard} />
      <GuaranteeChart />
    </AdminLayout>
  )
}

export default Dashboard
