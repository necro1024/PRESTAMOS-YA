import { useEffect, useState } from "react"

import AdminLayout from "../../layouts/AdminLayout"
import { obtenerDashboard } from "../../services/dashboardService"
import { obtenerTipoCambioUsdPen } from "../../services/tipoCambioService"
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
  const [tipoCambio, setTipoCambio] = useState({
    tasa: 0,
    fuente: "Sin consultar",
    configurado: false,
    fechaActualizacion: ""
  })

  const cargarDashboard = async () => {
    try {
      const data = await obtenerDashboard()
      setDashboard(data)
    } catch (error) {
      console.error(error)
    }
  }

  const cargarTipoCambio = async () => {
    try {
      const data = await obtenerTipoCambioUsdPen()

      setTipoCambio({
        tasa: Number(data.tasa || 0),
        fuente: data.fuente || "ExchangeRate-API",
        configurado: Boolean(data.configurado),
        fechaActualizacion: data.fechaActualizacion || ""
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    cargarDashboard()
    cargarTipoCambio()
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

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: 52, height: 52 }}>
                  <i className="bi bi-currency-exchange fs-4"></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">
                    Tipo de cambio
                  </h5>
                  <p className="text-muted mb-0">
                    Fuente: {tipoCambio.fuente}
                    {!tipoCambio.configurado && " - token externo pendiente de configurar."}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <span className="badge bg-dark fs-6 px-3 py-2">
                1 USD = S/ {Number(tipoCambio.tasa || 0).toFixed(4)}
              </span>
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
