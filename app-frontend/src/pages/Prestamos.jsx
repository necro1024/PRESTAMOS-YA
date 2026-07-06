import { useEffect, useState } from "react";

import api from "../services/api";

function Prestamos() {

    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {

        api.get("/prestamos")
            .then((response) => setPrestamos(response.data));

    }, []);

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Lista de Préstamos</h2>

            <table className="table table-dark table-striped">

                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Monto</th>
                        <th>Garantía</th>
                    </tr>
                </thead>

                <tbody>

                    {prestamos.map((prestamo, index) => (

                        <tr key={index}>
                            <td>{prestamo.cliente}</td>
                            <td>S/ {prestamo.monto}</td>
                            <td>{prestamo.garantia}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Prestamos;
