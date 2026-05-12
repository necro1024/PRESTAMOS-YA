import { Link } from "react-router-dom"

function MisPrestamos() {

  const prestamos = [

    {

      id: 1,

      garantia: "Canal YouTube",

      monto: 12000,

      estado: "Pendiente"

    },

    {

      id: 2,

      garantia: "Dominio Web",

      monto: 5000,

      estado: "Aprobado"

    }

  ]

  return (

    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h1 className="fw-bold">

              Mis Préstamos

            </h1>

            <p className="text-muted">

              Historial de solicitudes y estados.

            </p>

          </div>

          <Link
            to="/garantia"
            className="btn btn-primary"
          >

            Nuevo préstamo

          </Link>

        </div>

        {/* TABLA */}

        <div className="card border-0 shadow-sm rounded-4">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table align-middle">

                <thead className="table-light">

                  <tr>

                    <th>ID</th>

                    <th>Garantía</th>

                    <th>Monto</th>

                    <th>Estado</th>

                  </tr>

                </thead>

                <tbody>

                  {prestamos.map(prestamo => (

                    <tr key={prestamo.id}>

                      <td>

                        #{prestamo.id}

                      </td>

                      <td>

                        {prestamo.garantia}

                      </td>

                      <td>

                        S/ {prestamo.monto}

                      </td>

                      <td>

                        <span className={

                          prestamo.estado === "Aprobado"

                          ? "badge bg-success"

                          : "badge bg-warning"

                        }>

                          {prestamo.estado}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default MisPrestamos