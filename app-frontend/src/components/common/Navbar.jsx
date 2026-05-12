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
                href="#simulador"
                className="nav-link"
            >

                Simulador

            </a>

            </li>

            <li className="nav-item">

            <a
                href="#beneficios"
                className="nav-link"
            >

                Beneficios

            </a>

            </li>

            <li className="nav-item">

            <a
                href="#garantias"
                className="nav-link"
            >

                Garantías

            </a>

            </li>

            {/* USUARIO LOGUEADO */}

            {autenticado ? (

            <>

                {/* CLIENTE */}

                {usuario?.rol ===
                "CLIENTE" && (

                <li className="nav-item">

                    <Link
                    to="/mis-prestamos"
                    className="btn btn-info btn-sm ms-lg-3"
                    >

                    Mis préstamos

                    </Link>

                  </li>

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

                    {usuario?.username}

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