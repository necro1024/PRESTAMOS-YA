import { useEffect, useState } from "react"

function ClienteModal({
onGuardar,
clienteEditar
}) {

const [cliente, setCliente] = useState({
    nombre: "",
    dni: "",
    correo: "",
    telefono: "",
    estado: "Activo"
})

useEffect(() => {

    if (clienteEditar) {

    setCliente(clienteEditar)

    }

}, [clienteEditar])

const handleChange = (e) => {

    setCliente({
    ...cliente,
    [e.target.name]: e.target.value
    })
}

const handleSubmit = (e) => {

    e.preventDefault()

    onGuardar(cliente)

}

return (

    <div
    className="modal fade"
    id="clienteModal"
    tabIndex="-1"
    >

    <div className="modal-dialog">

        <div className="modal-content">

        <div className="modal-header">

            <h5 className="modal-title">

            {clienteEditar
                ? "Editar Cliente"
                : "Nuevo Cliente"}

            </h5>

            <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            ></button>

        </div>

        <form onSubmit={handleSubmit}>

            <div className="modal-body">

            <input
                type="text"
                name="nombre"
                className="form-control mb-3"
                placeholder="Nombre"
                value={cliente.nombre}
                onChange={handleChange}
            />

            <input
                type="text"
                name="dni"
                className="form-control mb-3"
                placeholder="DNI"
                value={cliente.dni}
                onChange={handleChange}
            />

            <input
                type="email"
                name="correo"
                className="form-control mb-3"
                placeholder="Correo"
                value={cliente.correo}
                onChange={handleChange}
            />

            <input
                type="text"
                name="telefono"
                className="form-control mb-3"
                placeholder="Teléfono"
                value={cliente.telefono}
                onChange={handleChange}
            />

            <select
                name="estado"
                className="form-select"
                value={cliente.estado}
                onChange={handleChange}
            >

                <option value="Activo">
                Activo
                </option>

                <option value="Moroso">
                Moroso
                </option>

                <option value="Inhabilitado">
                Inhabilitado
                </option>

            </select>

            </div>

            <div className="modal-footer">

            <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
            >
                Cerrar
            </button>

            <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Volver al listado
            </button>

            <button
                type="submit"
                className="btn btn-primary"
            >

                {clienteEditar
                ? "Actualizar"
                : "Guardar"}

            </button>

            </div>

        </form>

        </div>

    </div>

    </div>
)
}

export default ClienteModal
