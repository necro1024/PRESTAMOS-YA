import Navbar from "../components/common/Navbar"

function Home() {
return (
    <>
    <Navbar />

    <div className="container mt-5">

        <div className="p-5 bg-dark text-white rounded">

        <h1>Préstamos con Garantías Digitales</h1>

        <p>
            Plataforma fintech para validar activos digitales
            mediante APIs externas.
        </p>

        </div>

    </div>
    </>
)
}

export default Home