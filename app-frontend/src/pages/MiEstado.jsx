import Navbar from "../components/common/Navbar.jsx";

function MiEstado() {
    const historialCreditos = [
        { id: "PRST-2026-001", monto: "S/. 25,100", plazo: "12 meses", fecha: "05/06/2026", situacion: "En Revisión", estiloBadge: "bg-warning text-dark" },
        { id: "PRST-2026-002", monto: "S/. 5,000", plazo: "6 meses", fecha: "10/05/2026", situacion: "Aprobado", estiloBadge: "bg-success text-white" }
    ];

    return (
        <>
            <Navbar />
            <div className="container my-5 py-5">
                <div className="bg-white p-5 shadow rounded">
                    <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                        <div>
                            <h3 className="fw-bold text-dark mb-1">Estado de mis Solicitudes</h3>
                            <p className="text-muted mb-0">Monitorea el progreso de tus trámites en tiempo real y descarga tus cronogramas.</p>
                        </div>
                        <span className="badge bg-dark px-3 py-2 fs-6 rounded">Vista de Cliente</span>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mt-2">
                            <thead className="table-secondary">
                                <tr>
                                    <th className="py-3">Código Interno</th>
                                    <th className="py-3">Monto Solicitado</th>
                                    <th className="py-3">Plazo Elegido</th>
                                    <th className="py-3">Fecha de Registro</th>
                                    <th className="py-3 text-center">Estado del Trámite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historialCreditos.map((credito, indice) => (
                                    <tr key={indice}>
                                        <td className="fw-bold text-primary">{credito.id}</td>
                                        <td className="fw-bold text-dark">{credito.monto}</td>
                                        <td>{credito.plazo}</td>
                                        <td className="text-muted">{credito.fecha}</td>
                                        <td className="text-center">
                                            <span className={`badge ${credito.estiloBadge} px-3 py-2 fs-7 rounded-pill fw-bold shadow-sm`}>
                                                {credito.situacion}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5 p-4 bg-light rounded border border-light-subtle">
                        <h5 className="fw-bold text-dark mb-3">📌 ¿Qué significan los estados de mi préstamo?</h5>
                        <div className="row g-3" style={{ fontSize: "14px" }}>
                            <div className="col-md-4">
                                <span className="badge bg-warning text-dark mb-2">En Revisión</span>
                                <p className="text-muted">Nuestros asesores se encuentran verificando la tasación de las garantías físicas registradas.</p>
                            </div>
                            <div className="col-md-4">
                                <span className="badge bg-success text-white mb-2">Aprobado</span>
                                <p className="text-muted">Tu crédito fue validado. El monto está listo para desembolso directo en ventanilla o transferencia.</p>
                            </div>
                            <div className="col-md-4">
                                <span className="badge bg-danger text-white mb-2">Rechazado</span>
                                <p className="text-muted">La solicitud fue denegada debido a inconsistencias en la documentación del bien inmueble o mueble.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MiEstado;