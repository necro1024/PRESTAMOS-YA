import Navbar from "../components/Navbar";

function SolicitarPrestamo() {
    return (
        <>
            <Navbar />
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white p-5 shadow rounded">
                        <h2 className="text-center">Solicitar Préstamo Personal</h2>
                        <p className="text-center">Completa los datos para evaluar tu crédito de inmediato.</p>
                        <form>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Monto que necesitas (S/.)</label>
                                <input type="number" id="montoSol" className="form-control" placeholder="Ej: 1500" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">¿En cuántos meses lo pagarás?</label>
                                <select id="cuotasSol" className="form-select">
                                    <option value="3">3 meses</option>
                                    <option value="6">6 meses</option>
                                    <option value="12">12 meses</option>
                                    <option value="24">24 meses</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Motivo del préstamo</label>
                                <select id="motivo" className="form-select">
                                    <option value="Salud">Salud</option>
                                    <option value="Educación">Educación / Cursos</option>
                                    <option value="Negocio">Inversión en Negocio</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-primary btn-lg w-100 mt-3">
                                Enviar Solicitud para Revisión
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SolicitarPrestamo;
