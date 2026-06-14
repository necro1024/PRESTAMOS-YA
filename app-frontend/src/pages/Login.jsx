import Navbar from "../components/common/Navbar.jsx";
import { Link } from "react-router-dom";

function Login() {

    return (

        <>

            <Navbar />

            <div className="container pt-5">

                <div className="card-box">

                    <h3 className="text-center mb-4">
                        Iniciar Sesión
                    </h3>

                    <form>

                        <div className="mb-3">

                            <label className="form-label">
                                Correo electrónico
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">

                                    <i className="fa-solid fa-envelope"></i>

                                </span>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="tuemail@ejemplo.com"
                                    required
                                />

                            </div>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Contraseña
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">

                                    <i className="fa-solid fa-lock"></i>

                                </span>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="****"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn-main w-100"
                        >
                            Entrar
                        </button>

                    </form>

                    <p
                        className="text-center mt-3"
                        style={{ fontSize: "14px" }}
                    >

                        ¿No tienes cuenta?

                        <Link to="/register">
                            {" "}Regístrate
                        </Link>

                    </p>

                </div>

            </div>

        </>
    );
}

export default Login;