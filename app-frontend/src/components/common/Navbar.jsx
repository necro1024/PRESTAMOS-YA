import { Link } from "react-router-dom"

import {

estaAutenticado,

obtenerUsuario,

logout

} from "../../services/authService"


function Navbar() {

const autenticado =
    estaAutenticado()

const usuario =
    obtenerUsuario()

const seccionesHome = [
    {
        href: "/#como-funciona",
        label: "Como funciona"
    },
    {
        href: "/#servicios",
        label: "Servicios financieros"
    },
    {
        href: "/#evaluar-garantia",
        label: "Evaluar garantia"
    },
    {
        href: "/#estadisticas",
        label: "Estadisticas"
    },
    {
        href: "/#confianza",
        label: "Centro de confianza"
    },
    {
        href: "/#comparativa",
        label: "Comparativa"
    },
    {
        href: "/#preguntas",
        label: "Preguntas frecuentes"
    }
]

return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">

    <div className="container">

        {/* LOGO */}

        <Link
        className="navbar-brand fw-bold fs-3"
        to="/"
        >

        PrestaYa

        </Link>

        {/* TOGGLER */}

        <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
        >

        <span className="navbar-toggler-icon"></span>

        </button>

        {/* NAVBAR */}

        <div
        className="collapse navbar-collapse"
        id="navbarMain"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* LINKS PÚBLICOS */}

            <li className="nav-item">

            <a
                href="/#simulador"
                className="nav-link"
            >

                Simulador

            </a>

            </li>

            <li className="nav-item">

            <a
                href="/#recompensa"
                className="nav-link"
            >

                Recompensa

            </a>

            </li>

            <li className="nav-item">

            <a
                href="/#garantias"
                className="nav-link"
            >

                Garantías

            </a>

            </li>

            <li className="nav-item dropdown">

              <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

                Explorar

              </button>

              <ul className="dropdown-menu dropdown-menu-dark">

                {seccionesHome.map((seccion) => (

                  <li key={seccion.href}>

                    <a
                      className="dropdown-item"
                      href={seccion.href}
                    >

                      {seccion.label}

                    </a>

                  </li>

                ))}

              </ul>

            </li>

            {/* USUARIO LOGUEADO */}

            {autenticado ? (

            <>

                {/* CLIENTE */}

                {usuario?.rol ===
                "CLIENTE" && (

                <>

                <li className="nav-item">

                    <Link
                    to="/evaluar-garantia"
                    className="btn btn-outline-info btn-sm ms-lg-3"
                    >

                    Evaluar garantia

                    </Link>

                  </li>

                <li className="nav-item">

                    <Link
                    to="/mis-prestamos"
                    className="btn btn-info btn-sm ms-lg-3"
                    >

                    Mis préstamos

                    </Link>

                  </li>

                </>

                )}

                {/* ADMIN */}

                {usuario?.rol ===
                  "ADMIN" && (

                  <li className="nav-item">

                    <Link
                      to="/admin/dashboard"
                      className="btn btn-warning btn-sm ms-lg-3"
                    >

                      Dashboard

                    </Link>

                  </li>

                )}

                {/* USER */}

                <li className="nav-item ms-lg-3">

                  <span className="text-white small">

                    <i className="bi bi-person-circle me-2"></i>

                    {usuario?.nombre || "Usuario"}

                  </span>

                </li>

                {/* LOGOUT */}

                <li className="nav-item ms-lg-3">

                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => {

                      logout()

                      window.location.reload()

                    }}
                  >

                    Cerrar sesión

                  </button>

                </li>

              </>

            ) : (

              /* INVITADO */

              <li className="nav-item ms-lg-3">

                <Link
                  to="/acceder"
                  className="btn btn-primary"
                >

                  Acceder

                </Link>

              </li>

            )}

          </ul>

        </div>

      </div>

    </nav>

  )
}

export default Navbar
