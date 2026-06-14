import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";

function Register() {

    return (

        <>

            <Navbar />

            <div className="container pt-5">

                <div className="card-box">

                    <h3 className="text-center mb-4">
                        Crear Cuenta
                    </h3>

                    <form>

                        <div className="mb-3">

                            <label className="form-label">
                                Nombre Completo
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">

                                    <i className="fa-solid fa-user"></i>

                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tu Nombre Completo"
                                    required
                                />

                            </div>

                        </div>

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
                                    placeholder="Crear una contraseña"
                                    required
                                />

                            </div>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Confirmar contraseña
                            </label>

                            <div className="input-group">

                                <span className="input-group-text">

                                    <i className="fa-solid fa-lock"></i>

                                </span>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Repite la contraseña"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn-main w-100"
                        >
                            Registrarse
                        </button>

                    </form>

                    <p
                        className="text-center mt-3"
                        style={{ fontSize: "14px" }}
                    >

                        ¿Ya tienes cuenta?

                        <Link to="/login">
                            {" "}Iniciar sesión
                        </Link>

                    </p>

                </div>

            </div>

        </>
    );
}

export default Register;