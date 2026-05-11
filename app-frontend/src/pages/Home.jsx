import Navbar from "../components/Navbar";



function Home() {

    return (

        <>

            <Navbar />

            <div
                id="carouselExample"
                className="carousel slide"
                data-bs-ride="carousel"
            >

                <div className="carousel-inner">

                    <div className="carousel-item active">

                        <img
    src="/img/img1.jpg"
    className="d-block w-100"
    alt=""
/>

                        <div className="carousel-caption">

                            <h5>CAMBIO DE BIENES</h5>

                            <p>

                                Plataforma moderna de préstamos
                                con garantía de bienes.

                            </p>

                            <button className="btn btn-primary">
                                Más Información
                            </button>

                        </div>

                    </div>

                    <div className="carousel-item">

                        <img
    src="/img/img2.jpg"
    className="d-block w-100"
    alt=""
/>  

                        <div className="carousel-caption">

                            <h5>PRÉSTAMOS RÁPIDOS</h5>

                            <p>

                                Solicita préstamos de manera
                                rápida y segura.

                            </p>

                            <button className="btn btn-primary">
                                Más Información
                            </button>

                        </div>

                    </div>

                    <div className="carousel-item">

                        <img
    src="/img/img3.jpg"
    className="d-block w-100"
    alt=""
/>

                        <div className="carousel-caption">

                            <h5>SISTEMA SEGURO</h5>

                            <p>

                                Seguridad y transparencia
                                en cada operación.

                            </p>

                            <button className="btn btn-primary">
                                Más Información
                            </button>

                        </div>

                    </div>

                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                >

                    <span className="carousel-control-prev-icon"></span>

                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                >

                    <span className="carousel-control-next-icon"></span>

                </button>

            </div>

        </>
    );
}

export default Home;