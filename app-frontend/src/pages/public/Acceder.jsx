import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { login } from "../../services/authService"

function Acceder() {

  const navigate = useNavigate()

  const [loginData, setLoginData]
= useState({

  username: "",

  password: ""

})

  const [register, setRegister] = useState({

    nombre: "",

    correo: "",

    password: ""

  })

  const handleLoginChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]: e.target.value

    })

  }

  const handleRegisterChange = (e) => {

    setRegister({

      ...register,

      [e.target.name]: e.target.value

    })

  }


  const iniciarSesion = (e) => {

  e.preventDefault()

  // ADMIN

  if (

    loginData.username === "admin" &&
    loginData.password === "admin123"

  ) {

    login({

      username: "admin",

      rol: "ADMIN"

    })

    navigate("/admin/dashboard")

  }

  // CLIENTE

  else if (

    loginData.username === "cliente" &&
    loginData.password === "cliente123"

  ) {

    login({

      username: "cliente",

      rol: "CLIENTE"

    })

    navigate("/")

  }

  else {

    alert("Credenciales inválidas")

  }

}

  // =========================
  // REGISTER
  // =========================

  const registrarUsuario = (e) => {

    e.preventDefault()

    alert(
      "Usuario registrado correctamente"
    )

  }

  return (

    <div className="bg-light min-vh-100 d-flex align-items-center">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-10">

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

              <div className="row g-0">

                {/* PANEL IZQUIERDO */}

                <div className="col-lg-5 bg-dark text-white p-5 d-flex flex-column justify-content-center">

                  <h1 className="fw-bold mb-4">

                    Bienvenido a
                    PrestaYa

                  </h1>

                  <p className="lead text-light-emphasis">

                    Plataforma fintech para
                    préstamos respaldados
                    por activos digitales.

                  </p>

                  <hr className="my-4" />

                  <div className="d-flex flex-column gap-3">

                    <div>

                      <i className="bi bi-shield-check me-2"></i>

                      Seguridad financiera

                    </div>

                    <div>

                      <i className="bi bi-lightning-charge me-2"></i>

                      Aprobaciones rápidas

                    </div>

                    <div>

                      <i className="bi bi-graph-up me-2"></i>

                      Garantías digitales

                    </div>

                  </div>

                </div>

                {/* PANEL DERECHO */}

                <div className="col-lg-7 p-5">

                  {/* TABS */}

                  <ul
                    className="nav nav-pills mb-4"
                    id="authTabs"
                  >

                    <li className="nav-item">

                      <button
                        className="nav-link active"
                        data-bs-toggle="pill"
                        data-bs-target="#login"
                      >
                        Iniciar sesión
                      </button>

                    </li>

                    <li className="nav-item">

                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#register"
                      >
                        Registrarse
                      </button>

                    </li>

                  </ul>

                  <div className="tab-content">

                    {/* LOGIN */}

                    <div
                      className="tab-pane fade show active"
                      id="login"
                    >

                      <h3 className="fw-bold mb-4">

                        Acceder

                      </h3>

                      <form onSubmit={iniciarSesion}>

                        {/* USERNAME */}

                        <div className="mb-3">

                          <label className="form-label">

                            Usuario

                          </label>

                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            value={loginData.username}
                            onChange={handleLoginChange}
                          />

                        </div>

                        {/* PASSWORD */}

                        <div className="mb-4">

                          <label className="form-label">

                            Contraseña

                          </label>

                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={loginData.password}
                            onChange={handleLoginChange}
                          />

                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          Ingresar
                        </button>

                      </form>

                    </div>

                    {/* REGISTER */}

                    <div
                      className="tab-pane fade"
                      id="register"
                    >

                      <h3 className="fw-bold mb-4">

                        Crear cuenta

                      </h3>

                      <form onSubmit={registrarUsuario}>

                        {/* NOMBRE */}

                        <div className="mb-3">

                          <label className="form-label">

                            Nombre

                          </label>

                          <input
                            type="text"
                            name="nombre"
                            className="form-control"
                            value={register.nombre}
                            onChange={handleRegisterChange}
                          />

                        </div>

                        {/* CORREO */}

                        <div className="mb-3">

                          <label className="form-label">

                            Correo

                          </label>

                          <input
                            type="email"
                            name="correo"
                            className="form-control"
                            value={register.correo}
                            onChange={handleRegisterChange}
                          />

                        </div>

                        {/* PASSWORD */}

                        <div className="mb-4">

                          <label className="form-label">

                            Contraseña

                          </label>

                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={register.password}
                            onChange={handleRegisterChange}
                          />

                        </div>

                        <button
                          type="submit"
                          className="btn btn-success btn-lg w-100"
                        >
                          Registrarse
                        </button>

                      </form>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Acceder