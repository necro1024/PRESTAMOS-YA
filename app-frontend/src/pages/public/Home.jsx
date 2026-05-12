import { useState } from "react"

import { Link } from "react-router-dom"

import {
  estaAutenticado,
  obtenerUsuario,
  logout
} from "../../services/authService"


function Home() {

  const autenticado =
  estaAutenticado()

const usuario =
  obtenerUsuario()

  const [monto, setMonto] = useState(10000)

  const [meses, setMeses] = useState(12)

  const interesAnual = 0.18

  const total =
    monto + (monto * interesAnual * (meses / 12))

  const cuota = total / meses

  return (

    <>

      {/* NAVBAR */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">

        <div className="container">

          <Link
            to="/"
            className="navbar-brand fw-bold fs-3"
          >
            PrestaYa
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse"
            id="navbarMain"
          >

            <ul className="navbar-nav ms-auto align-items-lg-center">

              <li className="nav-item me-2">

                <a
                  href="#inicio"
                  className="nav-link"
                >
                  Inicio
                </a>

              </li>

              <li className="nav-item me-2">

                <a
                  href="#simulador"
                  className="nav-link"
                >
                  Simulador
                </a>

              </li>

              <li className="nav-item me-2">

                <a
                  href="#beneficios"
                  className="nav-link"
                >
                  Beneficios
                </a>

              </li>

              <li className="nav-item me-2">

                <a
                  href="#garantias"
                  className="nav-link"
                >
                  Garantías
                </a>

                </li>

                <li className="nav-item">

                {autenticado ? (

  <div className="d-flex align-items-center gap-3">

    <span className="text-white">

      <i className="bi bi-person-circle me-2"></i>

      {usuario?.username}

      {usuario?.rol === "ADMIN" && (

  <Link
    to="/admin/dashboard"
    className="btn btn-warning btn-sm"
  >

    Dashboard

  </Link>

)}

    </span>

    <button
      className="btn btn-outline-light"
      onClick={() => {

        logout()

        window.location.reload()

      }}
    >

      Cerrar sesión

    </button>

  </div>

) : (

  <Link
    to="/acceder"
    className="btn btn-primary"
  >

    Acceder

  </Link>

)}

                </li>

            </ul>

            </div>

        </div>

      </nav>

      {/* HERO */}

      <section
        id="inicio"
        className="bg-dark text-white py-5"
      >

        <div className="container py-5">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="badge bg-primary mb-3 px-3 py-2 fs-6">
                Plataforma Fintech
              </span>

              <h1 className="display-3 fw-bold mb-4">
                Convierte tus activos digitales en capital
              </h1>

              <p className="lead text-light-emphasis mb-4">
                Solicita préstamos utilizando canales de YouTube,
                dominios web, plataformas SaaS y activos digitales
                como garantía financiera.
              </p>

              <div className="d-flex flex-wrap gap-3">

                <Link
  to={
    autenticado
      ? "/garantia"
      : "/acceder"
  }
  className="btn btn-primary btn-lg"
>

  Solicitar préstamo

</Link>

                <button className="btn btn-outline-light btn-lg">
                  Conocer más
                </button>

              </div>

              {/* STATS */}

              <div className="row mt-5 g-4">

                <div className="col-4">

                  <h3 className="fw-bold text-info">
                    +500
                  </h3>

                  <small>
                    Clientes
                  </small>

                </div>

                <div className="col-4">

                  <h3 className="fw-bold text-success">
                    S/ 2M+
                  </h3>

                  <small>
                    Préstamos
                  </small>

                </div>

                <div className="col-4">

                  <h3 className="fw-bold text-warning">
                    24h
                  </h3>

                  <small>
                    Aprobación
                  </small>

                </div>

              </div>

            </div>

            <div className="col-lg-6 text-center">

              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
                alt="fintech"
                className="img-fluid rounded-4 shadow-lg"
              />

            </div>

          </div>

        </div>

      </section>

      {/* SIMULADOR */}

      <section
        id="simulador"
        className="py-5 bg-light"
      >

        <div className="container py-4">

          <div className="text-center mb-5">

            <h2 className="fw-bold display-6">
              Simulador Financiero
            </h2>

            <p className="text-muted">
              Calcula rápidamente tu cuota mensual estimada.
            </p>

          </div>

          <div className="row g-4">

            {/* CONFIG */}

            <div className="col-lg-5">

              <div className="card border-0 shadow-sm rounded-4 h-100">

                <div className="card-body p-4">

                  <h4 className="fw-bold mb-4">
                    Configuración
                  </h4>

                  {/* MONTO */}

                  <div className="mb-5">

                    <label className="form-label fw-semibold">
                      Monto solicitado
                    </label>

                    <h3 className="text-primary fw-bold mb-3">
                      S/ {monto}
                    </h3>

                    <input
                      type="range"
                      className="form-range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={monto}
                      onChange={(e) =>
                        setMonto(Number(e.target.value))
                      }
                    />

                  </div>

                  {/* PLAZO */}

                  <div>

                    <label className="form-label fw-semibold mb-3">
                      Tiempo de pago
                    </label>

                    <select
                      className="form-select"
                      value={meses}
                      onChange={(e) =>
                        setMeses(Number(e.target.value))
                      }
                    >

                      <option value="6">
                        6 meses
                      </option>

                      <option value="12">
                        12 meses
                      </option>

                      <option value="24">
                        24 meses
                      </option>

                      <option value="36">
                        36 meses
                      </option>

                    </select>

                  </div>

                </div>

              </div>

            </div>

            {/* RESULTADO */}

            <div className="col-lg-7">

              <div className="card bg-dark text-white border-0 shadow rounded-4 h-100">

                <div className="card-body p-5 text-center d-flex flex-column justify-content-center">

                  <span className="text-info fw-semibold mb-3">
                    Cuota mensual aproximada
                  </span>

                  <h1 className="display-2 fw-bold text-info mb-4">
                    S/ {cuota.toFixed(2)}
                  </h1>

                  <div className="row mt-4 text-start g-4">

                    <div className="col-md-4">

                      <div className="bg-secondary bg-opacity-25 rounded-4 p-3">

                        <small className="text-light-emphasis">
                          Monto
                        </small>

                        <h5 className="fw-bold mt-2">
                          S/ {monto}
                        </h5>

                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="bg-secondary bg-opacity-25 rounded-4 p-3">

                        <small className="text-light-emphasis">
                          Total
                        </small>

                        <h5 className="fw-bold mt-2">
                          S/ {total.toFixed(2)}
                        </h5>

                      </div>

                    </div>

                    <div className="col-md-4">

                      <div className="bg-secondary bg-opacity-25 rounded-4 p-3">

                        <small className="text-light-emphasis">
                          Interés
                        </small>

                        <h5 className="fw-bold mt-2">
                          18%
                        </h5>

                      </div>

                    </div>

                  </div>

                  <Link
  to={
    autenticado
      ? "/garantia"
      : "/acceder"
  }
  className="btn btn-info btn-lg mt-5 fw-bold"
>

  Continuar solicitud

</Link>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* BENEFICIOS */}

      <section
        id="beneficios"
        className="py-5"
      >

        <div className="container py-4">

          <div className="text-center mb-5">

            <h2 className="fw-bold display-6">
              ¿Por qué elegir PrestaYa?
            </h2>

            <p className="text-muted">
              Plataforma moderna para préstamos digitales.
            </p>

          </div>

          <div className="row g-4">

            <div className="col-md-4">

              <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                <div className="mb-3">
                  <i className="bi bi-lightning-charge-fill fs-1 text-warning"></i>
                </div>

                <h4 className="fw-bold">
                  Evaluación rápida
                </h4>

                <p className="text-muted mt-3">
                  Procesamos solicitudes y activos digitales
                  en tiempo récord.
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                <div className="mb-3">
                  <i className="bi bi-shield-lock-fill fs-1 text-primary"></i>
                </div>

                <h4 className="fw-bold">
                  Seguridad financiera
                </h4>

                <p className="text-muted mt-3">
                  Protección de datos y procesos confiables.
                </p>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow-sm rounded-4 h-100 text-center p-4">

                <div className="mb-3">
                  <i className="bi bi-graph-up-arrow fs-1 text-success"></i>
                </div>

                <h4 className="fw-bold">
                  Activos digitales
                </h4>

                <p className="text-muted mt-3">
                  Monetiza tus canales, dominios y plataformas.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* GARANTÍAS */}

      <section
        id="garantias"
        className="bg-light py-5"
      >

        <div className="container py-4">

          <div className="text-center mb-5">

            <h2 className="fw-bold display-6">
              Garantías Digitales Aceptadas
            </h2>

          </div>

          <div className="row g-4 text-center">

            <div className="col-md-3">

              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                <i className="bi bi-youtube fs-1 text-danger"></i>

                <h5 className="fw-bold mt-3">
                  YouTube
                </h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                <i className="bi bi-globe fs-1 text-primary"></i>

                <h5 className="fw-bold mt-3">
                  Dominios
                </h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                <i className="bi bi-credit-card-2-front fs-1 text-success"></i>

                <h5 className="fw-bold mt-3">
                  Stripe
                </h5>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow-sm rounded-4 p-4 h-100">

                <i className="bi bi-paypal fs-1 text-info"></i>

                <h5 className="fw-bold mt-3">
                  PayPal
                </h5>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-dark text-white py-4">

        <div className="container">

          <div className="row align-items-center">

            <div className="col-md-6 mb-3 mb-md-0">

              <h5 className="fw-bold">
                PrestaYa
              </h5>

              <small className="text-light-emphasis">
                Plataforma fintech de préstamos digitales.
              </small>

            </div>

            <div className="col-md-6 text-md-end">

              <small>
                © 2026 Todos los derechos reservados.
              </small>

            </div>

          </div>

        </div>

      </footer>

    </>

  )
}

export default Home