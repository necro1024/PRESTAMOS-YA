import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  login,
  loginBackend,
  registrarUsuarioAuth
} from "../../services/authService"
import { crearCliente } from "../../services/clienteService"

const obtenerMensajeLogin = (error) => {
  const status = error.response?.status
  const mensajeBackend =
    error.response?.data?.message ||
    error.response?.data?.detail

  if (mensajeBackend) {
    return mensajeBackend
  }

  if (status === 401 || status === 403) {
    return "Correo o contrasena incorrectos."
  }

  if (status === 423) {
    return "La cuenta esta bloqueada temporalmente."
  }

  if (!error.response) {
    return "No se pudo conectar con el servidor."
  }

  return "No se pudo iniciar sesion."
}

function Acceder() {
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  })

  const [loginError, setLoginError] = useState("")

  const [loginLoading, setLoginLoading] = useState(false)

  const [register, setRegister] = useState({
    nombre: "",
    dni: "",
    correo: "",
    telefono: "",
    password: ""
  })

  const handleLoginChange = (e) => {
    setLoginError("")

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

  const iniciarSesion = async (e) => {
    e.preventDefault()
    setLoginError("")
    setLoginLoading(true)

    try {
      const response = await loginBackend(loginData)

      if (response.error) {
        throw new Error(response.error)
      }

      login({
        token: response.token,
        username: response.username,
        nombre: response.nombre,
        rol: response.rol,
        clienteId: response.clienteId
      })

      navigate(
        response.rol === "ADMIN"
          ? "/admin/dashboard"
          : "/solicitar"
      )
    } catch (error) {
      console.error(error)
      setLoginError(obtenerMensajeLogin(error))
    } finally {
      setLoginLoading(false)
    }
  }

  const registrarUsuario = async (e) => {
    e.preventDefault()

    try {
      const usuarioAuth = await registrarUsuarioAuth({
        nombre: register.nombre,
        username: register.correo,
        password: register.password
      })

      login({
        token: usuarioAuth.token,
        username: usuarioAuth.username,
        rol: usuarioAuth.rol,
        nombre: usuarioAuth.nombre
      })

      const cliente = await crearCliente({
        nombre: register.nombre,
        dni: register.dni,
        correo: register.correo,
        telefono: register.telefono,
        estado: "Activo"
      })

      login({
        token: usuarioAuth.token,
        username: usuarioAuth.username,
        rol: usuarioAuth.rol,
        clienteId: cliente.id,
        nombre: cliente.nombre,
        correo: cliente.correo,
        telefono: cliente.telefono,
        dni: cliente.dni
      })

      navigate("/solicitar")
    } catch (error) {
      console.error(error)
      alert("No se pudo registrar el cliente")
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">
                <div className="col-lg-5 bg-dark text-white p-5 d-flex flex-column justify-content-center">
                  <h1 className="fw-bold mb-4">
                    Bienvenido a PrestaYa
                  </h1>

                  <p className="lead text-light-emphasis">
                    Plataforma fintech para prestamos respaldados
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
                      Aprobaciones rapidas
                    </div>

                    <div>
                      <i className="bi bi-graph-up me-2"></i>
                      Garantias digitales
                    </div>
                  </div>
                </div>

                <div className="col-lg-7 p-5">
                  <ul className="nav nav-pills mb-4" id="authTabs">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="pill"
                        data-bs-target="#login"
                      >
                        Iniciar sesion
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
                    <div
                      className="tab-pane fade show active"
                      id="login"
                    >
                      <h3 className="fw-bold mb-4">
                        Acceder
                      </h3>

                      <form onSubmit={iniciarSesion}>
                        <div className="mb-3">
                          <label className="form-label">
                            Correo
                          </label>

                          <input
                            type="text"
                            name="username"
                            className={`form-control ${
                              loginError ? "is-invalid" : ""
                            }`}
                            value={loginData.username}
                            onChange={handleLoginChange}
                            autoComplete="username"
                            placeholder="correo@ejemplo.com o admin"
                            aria-invalid={Boolean(loginError)}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label">
                            Contrasena
                          </label>

                          <input
                            type="password"
                            name="password"
                            className={`form-control ${
                              loginError ? "is-invalid" : ""
                            }`}
                            value={loginData.password}
                            onChange={handleLoginChange}
                            autoComplete="current-password"
                            aria-invalid={Boolean(loginError)}
                            aria-describedby="loginError"
                            required
                          />

                          {loginError && (
                            <div
                              id="loginError"
                              className="invalid-feedback"
                            >
                              <i className="bi bi-exclamation-circle me-1"></i>
                              {loginError}
                            </div>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                          disabled={loginLoading}
                        >
                          {loginLoading
                            ? "Verificando..."
                            : "Ingresar"}
                        </button>
                      </form>
                    </div>

                    <div className="tab-pane fade" id="register">
                      <h3 className="fw-bold mb-4">
                        Crear cuenta
                      </h3>

                      <form onSubmit={registrarUsuario}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="form-label">
                              Nombre
                            </label>

                            <input
                              type="text"
                              name="nombre"
                              className="form-control"
                              value={register.nombre}
                              onChange={handleRegisterChange}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">
                              DNI
                            </label>

                            <input
                              type="text"
                              name="dni"
                              className="form-control"
                              value={register.dni}
                              onChange={handleRegisterChange}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">
                              Correo
                            </label>

                            <input
                              type="email"
                              name="correo"
                              className="form-control"
                              value={register.correo}
                              onChange={handleRegisterChange}
                              required
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label">
                              Telefono
                            </label>

                            <input
                              type="text"
                              name="telefono"
                              className="form-control"
                              value={register.telefono}
                              onChange={handleRegisterChange}
                              required
                            />
                          </div>

                          <div className="col-12">
                            <label className="form-label">
                              Contrasena
                            </label>

                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              value={register.password}
                              onChange={handleRegisterChange}
                              required
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-success btn-lg w-100 mt-4"
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
