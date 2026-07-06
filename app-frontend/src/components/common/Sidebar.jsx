import { Link, useLocation } from "react-router-dom"

function Sidebar() {

const location = useLocation()

return (

    <div
    className="bg-dark text-white p-3 d-flex flex-column"
    style={{
        width: "260px",
        minHeight: "100vh"
    }}
    >

    <h4 className="text-center mb-4">
        <i className="bi bi-cash-coin me-2"></i>
        Presta-Ya
    </h4>

    <div className="text-center mb-4 border-bottom pb-3">

        <div
        className="bg-primary rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center"
        style={{
            width: "60px",
            height: "60px"
        }}
        >
        Admin
        </div>

        <small>Administrador</small>

    </div>

    <ul className="nav flex-column">

        <li className="nav-item mb-2">

        <Link
            to="/admin/dashboard"
            className={`nav-link text-white ${
            location.pathname === "/admin/dashboard"
                ? "bg-primary rounded"
                : ""
            }`}
        >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
        </Link>

        </li>

        <li className="nav-item mb-2">

        <Link
            to="/admin/clientes"
            className={`nav-link text-white ${
            location.pathname === "/admin/clientes"
                ? "bg-primary rounded"
                : ""
            }`}
        >
            <i className="bi bi-people me-2"></i>
            Clientes
        </Link>

        </li>

        <li className="nav-item mb-2">

        <Link
            to="/admin/prestamos"
            className={`nav-link text-white ${
            location.pathname === "/admin/prestamos"
                ? "bg-primary rounded"
                : ""
            }`}
        >
            <i className="bi bi-wallet2 me-2"></i>
            Préstamos
        </Link>

        </li>

        <li className="nav-item">

        <Link
            to="/admin/garantias"
            className={`nav-link text-white ${
            location.pathname === "/admin/garantias"
                ? "bg-primary rounded"
                : ""
            }`}
        >
            <i className="bi bi-shield-check me-2"></i>
            Garantías
        </Link>

        </li>

        <li className="nav-item mt-2">

        <Link
            to="/admin/acuerdos"
            className={`nav-link text-white ${
            location.pathname === "/admin/acuerdos"
                ? "bg-primary rounded"
                : ""
            }`}
        >
            <i className="bi bi-file-earmark-pdf me-2"></i>
            Acuerdos PDF
        </Link>

        </li>

        <li className="nav-item mt-2">

        <Link
            to="/admin/auditorias"
            className={`nav-link text-white ${
            location.pathname === "/admin/auditorias"
                ? "bg-primary rounded"
                : ""
            }`}
        >
            <i className="bi bi-journal-check me-2"></i>
            Auditorias
        </Link>

        </li>

    </ul>

    <Link
        to="/"
        className="btn btn-outline-light w-100 mt-auto"
    >
        <i className="bi bi-house-door me-2"></i>
        Ir al inicio
    </Link>

    </div>
)
}

export default Sidebar
