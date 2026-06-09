import { useState } from "react";
import Navbar from "../components/Navbar";

function SolicitarPrestamo() {
    const [monto, setMonto] = useState("");
    const [cuotas, setCuotas] = useState("3");
    const [motivo, setMotivo] = useState("Salud");

    const tasaMensual = 0.05; 
    const montoNum = parseFloat(monto) || 0;
    const cuotasNum = parseInt(cuotas);
    
    const totalInteres = montoNum * tasaMensual * cuotasNum;
    const totalPagar = montoNum + totalInteres;
    const cuotaMensual = cuotasNum > 0 ? (totalPagar / cuotasNum) : 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`¡Solicitud Registrada!\nMonto: S/. ${monto}\nPlazo: ${cuotas} meses\nCuota Estimada: S/. ${cuotaMensual.toFixed(2)}`);
    };

    return (
        <>
            <Navbar />
            <div className="container my-5 py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white p-5 shadow rounded">
                        <h2 className="text-center fw-bold text-dark mb-3">Solicitar Préstamo Personal</h2>
                        <p className="text-center text-muted mb-4">Completa los datos para evaluar tu crédito de inmediato con garantía de bienes.</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Monto que necesitas (S/.)</label>
                                <input 
                                    type="number" 
                                    id="montoSol" 
                                    className="form-control form-control-lg" 
                                    placeholder="Ej: 1500" 
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                    min="100"
                                    max="50000"
                                    required 
                                />
                                <div className="form-text">Montos disponibles desde S/. 100 hasta S/. 50,000.</div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">¿En cuántos meses lo pagarás?</label>
                                <select 
                                    id="cuotasSol" 
                                    className="form-select form-select-lg"
                                    value={cuotas}
                                    onChange={(e) => setCuotas(e.target.value)}
                                >
                                    <option value="3">3 meses</option>
                                    <option value="6">6 meses</option>
                                    <option value="12">12 meses</option>
                                    <option value="24">24 meses</option>
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label fw-bold">Motivo del préstamo</label>
                                <select 
                                    id="motivo" 
                                    className="form-select form-select-lg"
                                    value={motivo}
                                    onChange={(e) => setMotivo(e.target.value)}
                                >
                                    <option value="Salud">Salud / Emergencia médica</option>
                                    <option value="Educación">Educación / Pago de pensión</option>
                                    <option value="Negocio">Inversión / Capital de trabajo</option>
                                    <option value="Otros">Otros motivos</option>
                                </select>
                            </div>

                            {montoNum > 0 && (
                                <div className="p-3 my-4 bg-light rounded border border-primary-subtle shadow-sm">
                                    <h5 className="fw-bold text-primary mb-3">📊 Simulador de Cuotas</h5>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Pago Mensual (Cuota):</span>
                                        <strong className="text-dark fs-5">S/. {cuotaMensual.toFixed(2)}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Interés Total Estimado (5%):</span>
                                        <span className="text-danger fw-semibold">+ S/. {totalInteres.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="d-flex justify-content-between fw-bold fs-5 text-success">
                                        <span>Total Neto a Pagar:</span>
                                        <span>S/. {totalPagar.toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            <div className="alert alert-warning p-2 mt-3" style={{ fontSize: "13px" }}>
                                📌 <strong>Importante:</strong> Para el desembolso definitivo del dinero, deberás registrar un bien como garantía física en la pestaña correspondiente.
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg w-100 mt-2 shadow">
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