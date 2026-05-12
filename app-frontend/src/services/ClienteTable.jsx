import { useEffect, useState } from "react"
import { obtenerClientes } from "../../services/clienteService"

function ClienteTable() {

const [clientes, setClientes] = useState([])

useEffect(() => {
    cargarClientes()
}, [])

const cargarClientes = async () => {
    const response = await obtenerClientes()
    setClientes(response.data)
}

return (
    <table className="table">
    ...
    </table>
)
}