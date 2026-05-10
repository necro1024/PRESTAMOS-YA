import React, { useState, useEffect } from 'react';

const Simulador = () => {
  const [monto, setMonto] = useState(5000);
  const [plazo, setPlazo] = useState(12);
  const [resultados, setResultados] = useState({ cuota: 0, total: 0 });

  useEffect(() => {
    const interes = 0.15;
    const total = monto + (monto * interes * (plazo / 12));
    setResultados({
      cuota: (total / plazo).toFixed(2),
      total: total.toFixed(2)
    });
  }, [monto, plazo]);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-5">
          <div className="card p-4 shadow-sm">
            <h5>Configura tu Préstamo</h5>
            <input 
              type="range" className="form-range" min="500" max="50000" 
              value={monto} onChange={(e) => setMonto(Number(e.target.value))} 
            />
            <p>Monto: S/. {monto}</p>
            <select className="form-select" value={plazo} onChange={(e) => setPlazo(Number(e.target.value))}>
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
            </select>
          </div>
        </div>
        <div className="col-lg-7 text-center bg-dark text-white p-4 rounded">
          <h3>Cuota Mensual: S/. {resultados.cuota}</h3>
          <p>Total: S/. {resultados.total}</p>
        </div>
      </div>
    </div>
  );
};

export default Simulador;