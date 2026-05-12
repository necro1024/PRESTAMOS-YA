function RegistroGarantia() {

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-7">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-5">

              <h2 className="fw-bold mb-4 text-center">

                Registrar Garantía Digital

              </h2>

              <div className="mb-3">

                <label className="form-label">

                  Tipo de garantía

                </label>

                <select className="form-select">

                  <option>
                    YouTube
                  </option>

                  <option>
                    Dominio
                  </option>

                  <option>
                    Stripe
                  </option>

                  <option>
                    PayPal
                  </option>

                </select>

              </div>

              <div className="mb-4">

                <label className="form-label">

                  URL o identificador

                </label>

                <input
                  type="text"
                  className="form-control"
                />

              </div>

              <button
                className="btn btn-success btn-lg w-100"
              >
                Enviar solicitud
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default RegistroGarantia