import { Link, useLocation } from "react-router-dom"

function HomeButton() {
  const location = useLocation()

  if (
    location.pathname === "/" ||
    location.pathname.startsWith("/admin/")
  ) {
    return null
  }

  return (
    <Link
      to="/"
      className="btn btn-light border shadow-sm position-fixed top-0 start-0 m-3"
      style={{ zIndex: 1040 }}
    >
      <i className="bi bi-house-door me-2"></i>
      Inicio
    </Link>
  )
}

export default HomeButton
