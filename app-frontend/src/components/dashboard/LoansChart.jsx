import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

function LoansChart({ dashboard }) {

  const data = [

    {
    nombre: "Aprobados",
    cantidad: dashboard.aprobados
    },

    {
    nombre: "Pendientes",
    cantidad: dashboard.pendientes
    }

]

return (

    <div className="card border-0 shadow-sm mt-4">

    <div className="card-body">

        <h5 className="fw-bold mb-4">
        Estado de Préstamos
        </h5>

        <ResponsiveContainer
        width="100%"
        height={300}
        >

        <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="nombre" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="cantidad" />

        </BarChart>

        </ResponsiveContainer>

    </div>

    </div>
)
}

export default LoansChart