import {
PieChart,
Pie,
Tooltip,
Cell,
ResponsiveContainer
} from "recharts"

function GuaranteeChart() {

const data = [

    {
    name: "YouTube",
    value: 5
    },

    {
    name: "Dominios",
    value: 3
    },

    {
    name: "Stripe",
    value: 4
    }

]

return (

    <div className="card border-0 shadow-sm mt-4">

    <div className="card-body">

        <h5 className="fw-bold mb-4">
        Garantías Digitales
        </h5>

        <ResponsiveContainer
        width="100%"
        height={300}
        >

        <PieChart>

            <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
            >

            {data.map((entry, index) => (

                <Cell key={index} />

            ))}

            </Pie>

            <Tooltip />

        </PieChart>

        </ResponsiveContainer>

    </div>

    </div>
)
}

export default GuaranteeChart