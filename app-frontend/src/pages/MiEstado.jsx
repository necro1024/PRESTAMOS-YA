import Navbar from "../components/Navbar";

function MiEstado() {
    return (
        <>
            <Navbar />
            <div className="container my-5 py-5">
                <div className="bg-white p-5 shadow rounded">
                    <h3>Mis Solicitudes de Préstamo</h3>
                    <p>A continuación se muestra el estado de tu trámite actual:</p>
                    <table className="table table-dark table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Monto</th>
                                <th>Cuotas</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center text-muted py-4 bg-white">
                                    No tienes solicitudes activas.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default MiEstado;
