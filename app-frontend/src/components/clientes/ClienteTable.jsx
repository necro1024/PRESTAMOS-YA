function ClienteTable() {

const clientes = [
    {
    id: 1,
    nombre: "Juan Pérez",
    dni: "74589632",
    estado: "Activo"
    }
]

return (
    <table className="table table-hover mt-4">

    <thead>
        <tr>
        <th>ID</th>
        <th>DNI</th>
        <th>Cliente</th>
        <th>Estado</th>
        </tr>
    </thead>

    <tbody>

        {clientes.map(cliente => (
        <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.dni}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.estado}</td>
        </tr>
        ))}

    </tbody>

    </table>
)
}

export default ClienteTable