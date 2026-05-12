import { useEffect, useState } from "react";
import { obtenerPrestamos } from "../services/api";

export default function TablaPrestamos() {

    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {

        cargarPrestamos();

    }, []);

    const cargarPrestamos = async () => {

        try {

            const response =
                await obtenerPrestamos();

            setPrestamos(response.data);

        } catch (error) {

            console.error(
                "Error al obtener préstamos",
                error
            );
        }
    };

    return (

        <div className="container mt-5">

            <div className="card shadow-sm">

                <div className="card-body">

                    <h3>
                        Lista de préstamos
                    </h3>

                    <table className="table">

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>

                        </thead>

                        <tbody>

                            {prestamos.map((prestamo) => (

                                <tr key={prestamo.id}>

                                    <td>
                                        {prestamo.id}
                                    </td>

                                    <td>
                                        S/. {prestamo.monto}
                                    </td>

                                    <td>
                                        {prestamo.estado}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}