import { Link } from "react-router-dom"

function Navbar() {
return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

    <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
        Presta-Ya
        </Link>

        <div className="navbar-nav ms-auto">

        <Link className="nav-link" to="/simulador">
            Simulador
        </Link>

        <Link className="nav-link" to="/garantias">
            Garantías
        </Link>

        </div>
    </div>
    </nav>
)
}

export default Navbar