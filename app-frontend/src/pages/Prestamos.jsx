import { useEffect, useState } from "react";

function Prestamos() {

    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/api/prestamos")
            .then((response) => response.json())
            .then((data) => setPrestamos(data));

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