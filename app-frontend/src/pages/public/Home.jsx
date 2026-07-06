import { useState } from "react"
import { Link } from "react-router-dom"

import { estaAutenticado } from "../../services/authService"
import Navbar from "../../components/common/Navbar"
import {
  DESCUENTO_MAXIMO_SEGURIDAD,
  INTERES_BASE_ANUAL,
  PUNTAJE_MINIMO_RECOMPENSA,
  TRAMOS_RECOMPENSA_SEGURIDAD,
  calcularDescuentoSeguridad,
  calcularInteresConRecompensa,
  formatearPorcentaje
} from "../../utils/recompensaSeguridad"

const pasosFuncionamiento = [
  "Registrate o inicia sesion.",
  "Registra tu garantia digital.",
  "El sistema evalua el activo.",
  "El administrador audita la garantia.",
  "Recibe respuesta de aprobacion o rechazo."
]

const serviciosFinancieros = [
  {
    titulo: "Tasacion de activos digitales",
    icono: "bi-clipboard-data",
    descripcion: "Analisis del valor estimado, ingresos y cobertura del activo."
  },
  {
    titulo: "Simulador financiero",
    icono: "bi-calculator",
    descripcion: "Proyeccion de cuotas, tasa y total a pagar antes de solicitar."
  },
  {
    titulo: "Seguimiento de solicitudes",
    icono: "bi-kanban",
    descripcion: "Estados claros para saber si el prestamo sigue pendiente, aprobado o rechazado."
  },
  {
    titulo: "Centro de documentos",
    icono: "bi-folder-check",
    descripcion: "Registro de identidad, ingresos, historial y soporte del activo."
  },
  {
    titulo: "Historial financiero",
    icono: "bi-clock-history",
    descripcion: "Consulta de prestamos, acuerdos digitales y decisiones recibidas."
  },
  {
    titulo: "Precalificacion de prestamo",
    icono: "bi-shield-check",
    descripcion: "Estimacion inicial de seguridad y posible beneficio de tasa."
  }
]

const estadisticas = [
  {
    valor: "+500",
    etiqueta: "Clientes activos",
    icono: "bi-people"
  },
  {
    valor: "+820",
    etiqueta: "Garantias registradas",
    icono: "bi-shield-lock"
  },
  {
    valor: "+1,200",
    etiqueta: "Prestamos evaluados",
    icono: "bi-wallet2"
  },
  {
    valor: "24h",
    etiqueta: "Tiempo promedio de evaluacion",
    icono: "bi-stopwatch"
  }
]

const confianza = [
  "Proteccion de datos",
  "Auditoria de garantias",
  "Validacion documental",
  "Clasificacion de riesgo",
  "Registro de actividad",
  "Acceso por roles"
]

const garantiasAceptadas = [
  {
    nombre: "YouTube",
    icono: "bi-youtube",
    color: "text-danger",
    detalle: "Canales con monetizacion o audiencia demostrable."
  },
  {
    nombre: "Dominios",
    icono: "bi-globe",
    color: "text-primary",
    detalle: "Dominios con valor comercial, trafico o marca."
  },
  {
    nombre: "Stripe",
    icono: "bi-credit-card-2-front",
    color: "text-success",
    detalle: "Cuentas con transacciones y comprobantes."
  },
  {
    nombre: "PayPal",
    icono: "bi-paypal",
    color: "text-info",
    detalle: "Historial de ingresos y titularidad verificable."
  }
]

const preguntasFrecuentes = [
  {
    pregunta: "Quien puede solicitar un prestamo?",
    respuesta:
      "Cualquier cliente registrado que pueda documentar identidad, ingresos y una garantia digital verificable."
  },
  {
    pregunta: "Que garantias digitales aceptan?",
    respuesta:
      "Se aceptan activos como canales de YouTube, dominios web, cuentas PayPal, Stripe y plataformas SaaS."
  },
  {
    pregunta: "Como se calcula el valor del activo?",
    respuesta:
      "Se revisan ingresos, antiguedad, documentacion, titularidad, cobertura frente al monto solicitado y consistencia del historial."
  },
  {
    pregunta: "Cuanto demora la evaluacion?",
    respuesta:
      "El objetivo operativo es revisar solicitudes completas en un promedio aproximado de 24 horas."
  },
  {
    pregunta: "Que pasa si mi garantia es rechazada?",
    respuesta:
      "Puedes recibir una observacion, corregir informacion o registrar una nueva garantia digital mas consistente."
  },
  {
    pregunta: "Necesito estar registrado para solicitar un prestamo?",
    respuesta:
      "Si. El registro permite asociar el prestamo, la garantia, los documentos y el resultado de auditoria a tu cuenta."
  }
]

function Home() {
  const autenticado = estaAutenticado()
  const rutaSolicitud = autenticado ? "/solicitar" : "/acceder"
  const rutaGarantia = autenticado ? "/garantia" : "/acceder"
  const rutaEvaluarGarantia = autenticado ? "/evaluar-garantia" : "/acceder"

  const [monto, setMonto] = useState(10000)
  const [meses, setMeses] = useState(12)
  const [scoreSeguridad, setScoreSeguridad] = useState(85)

  const descuentoSeguridad =
    calcularDescuentoSeguridad(scoreSeguridad)

  const interesFinal =
    calcularInteresConRecompensa(scoreSeguridad)

  const total =
    monto + (monto * (interesFinal / 100) * (meses / 12))

  const cuota = total / meses

  return (
    <>
      <Navbar />

      <section id="inicio" className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-primary mb-3 px-3 py-2 fs-6">
                Plataforma Fintech
              </span>

              <h1 className="display-3 fw-bold mb-4">
                Convierte tus activos digitales en capital
              </h1>

              <p className="lead text-light-emphasis mb-4">
                Solicita prestamos respaldados por canales de YouTube,
                dominios, cuentas de pago y plataformas SaaS con evaluacion
                documental y seguimiento digital.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Link to={rutaSolicitud} className="btn btn-primary btn-lg">
                  Solicitar prestamo
                </Link>

                <Link to={rutaEvaluarGarantia} className="btn btn-outline-info btn-lg">
                  Evaluar garantia
                </Link>

                <a href="#como-funciona" className="btn btn-outline-light btn-lg">
                  Conocer mas
                </a>
              </div>

              <div className="row mt-5 g-4">
                <HeroMetric valor="15%" etiqueta="Tasa base anual" color="text-info" />
                <HeroMetric valor="-5%" etiqueta="Beneficio maximo" color="text-success" />
                <HeroMetric valor="24h" etiqueta="Evaluacion promedio" color="text-warning" />
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
                alt="Analisis financiero digital"
                className="img-fluid rounded-3 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-5 bg-light">
        <div className="container py-4">
          <SectionHeader
            titulo="Como funciona"
            texto="Un recorrido claro desde el registro hasta la respuesta final."
          />

          <div className="row g-4">
            {pasosFuncionamiento.map((paso, index) => (
              <div className="col-md-6 col-lg" key={paso}>
                <div className="card border-0 shadow-sm h-100 rounded-3">
                  <div className="card-body p-4">
                    <span className="badge bg-primary rounded-pill mb-3">
                      {index + 1}
                    </span>

                    <p className="fw-semibold mb-0">
                      {paso}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="simulador" className="py-5">
        <div className="container py-4">
          <SectionHeader
            titulo="Simulador financiero"
            texto="Calcula una cuota estimada y visualiza como influye el score de seguridad."
          />

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm rounded-3 h-100">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">
                    Configuracion
                  </h4>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Monto solicitado
                    </label>

                    <h3 className="text-primary fw-bold mb-3">
                      S/ {monto.toLocaleString("es-PE")}
                    </h3>

                    <input
                      type="range"
                      className="form-range"
                      min="1000"
                      max="50000"
                      step="500"
                      value={monto}
                      onChange={(e) => setMonto(Number(e.target.value))}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Tiempo de pago
                    </label>

                    <select
                      className="form-select"
                      value={meses}
                      onChange={(e) => setMeses(Number(e.target.value))}
                    >
                      <option value="6">6 meses</option>
                      <option value="12">12 meses</option>
                      <option value="24">24 meses</option>
                      <option value="36">36 meses</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label fw-semibold">
                      Puntuacion de seguridad estimada
                    </label>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h3 className="text-success fw-bold mb-0">
                        {scoreSeguridad}/100
                      </h3>

                      <span className="badge bg-success">
                        -{formatearPorcentaje(descuentoSeguridad)}
                      </span>
                    </div>

                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="100"
                      step="1"
                      value={scoreSeguridad}
                      onChange={(e) => setScoreSeguridad(Number(e.target.value))}
                    />

                    <small className="text-muted">
                      El descuento comienza desde {PUNTAJE_MINIMO_RECOMPENSA + 1}
                      puntos y puede llegar a {formatearPorcentaje(DESCUENTO_MAXIMO_SEGURIDAD)}.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card bg-dark text-white border-0 shadow rounded-3 h-100">
                <div className="card-body p-5 d-flex flex-column justify-content-center">
                  <span className="text-info fw-semibold mb-3">
                    Cuota mensual aproximada
                  </span>

                  <h2 className="display-3 fw-bold text-info mb-4">
                    S/ {cuota.toFixed(2)}
                  </h2>

                  <div className="row g-3">
                    <ResultMetric label="Monto" value={`S/ ${monto.toLocaleString("es-PE")}`} />
                    <ResultMetric label="Total" value={`S/ ${total.toFixed(2)}`} />
                    <ResultMetric label="Interes final" value={formatearPorcentaje(interesFinal)} />
                  </div>

                  <div className="alert alert-info border-0 mt-4 mb-0">
                    <strong>Programa de recompensa:</strong>
                    {" "}la tasa base es {formatearPorcentaje(INTERES_BASE_ANUAL)}.
                    Si la garantia supera {PUNTAJE_MINIMO_RECOMPENSA} puntos,
                    puede alcanzar una tasa de
                    {" "}{formatearPorcentaje(INTERES_BASE_ANUAL - DESCUENTO_MAXIMO_SEGURIDAD)}.
                  </div>

                  <Link to={rutaSolicitud} className="btn btn-info btn-lg mt-5 fw-bold">
                    Continuar solicitud
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recompensa" className="py-5 bg-light">
        <div className="container py-4">
          <SectionHeader
            titulo="Beneficio por Garantia Segura"
            texto="Mientras mas segura y documentada sea tu garantia digital, menor puede ser el interes aplicado a tu prestamo."
          />

          <div className="row g-4 align-items-stretch">
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-3 h-100">
                <div className="card-body p-4">
                  <i className="bi bi-award fs-1 text-success"></i>
                  <h4 className="fw-bold mt-3">
                    Menor tasa por mejor respaldo
                  </h4>
                  <p className="text-muted mb-0">
                    El score considera titularidad, documentacion, ingresos,
                    historial y cobertura del activo digital frente al monto solicitado.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="table-responsive bg-white rounded-3 shadow-sm">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Score de Garantia</th>
                      <th>Beneficio</th>
                      <th>Tasa final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRAMOS_RECOMPENSA_SEGURIDAD.map((tramo) => (
                      <tr key={tramo.rango}>
                        <td className="fw-semibold">{tramo.rango}</td>
                        <td>
                          <span className={tramo.descuento > 0
                            ? "badge bg-success"
                            : "badge bg-secondary"}
                          >
                            {tramo.beneficio}
                          </span>
                        </td>
                        <td>{tramo.tasa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evaluar-garantia" className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <span className="badge bg-success mb-3">
                Solo para clientes registrados
              </span>

              <h2 className="fw-bold display-6">
                Evalua tu garantia antes de enviarla
              </h2>

              <p className="text-muted">
                Completa los datos principales de tu activo digital y revisa
                un score aproximado de seguridad, nivel de riesgo, descuento
                posible y recomendaciones para mejorar la documentacion.
              </p>

              <Link to={rutaEvaluarGarantia} className="btn btn-primary btn-lg">
                Revisar mi garantia
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-3">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                      <i className="bi bi-shield-check fs-3"></i>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">
                        Precalificacion de seguridad
                      </h5>
                      <p className="text-muted mb-0">
                        Resultado orientativo antes de la auditoria final.
                      </p>
                    </div>
                  </div>

                  <div className="row g-3">
                    <MiniFeature icono="bi-percent" texto="Descuento progresivo hasta 5%" />
                    <MiniFeature icono="bi-file-earmark-check" texto="Revision de documentos clave" />
                    <MiniFeature icono="bi-graph-up-arrow" texto="Score aproximado del activo" />
                    <MiniFeature icono="bi-arrow-repeat" texto="Sugerencias para mejorar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="py-5">
        <div className="container py-4">
          <SectionHeader
            titulo="Servicios financieros"
            texto="Herramientas utiles para evaluar, documentar y seguir una solicitud digital."
          />

          <div className="row g-4">
            {serviciosFinancieros.map((servicio) => (
              <IconCard
                key={servicio.titulo}
                item={servicio}
                className="col-md-6 col-lg-4"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="estadisticas" className="py-5 bg-white">
        <div className="container py-4">
          <SectionHeader
            titulo="Estadisticas de la plataforma"
            texto="Indicadores sinteticos para entender el volumen operativo de PrestaYa."
          />

          <div className="row g-4">
            {estadisticas.map((stat) => (
              <div className="col-md-6 col-lg-3" key={stat.etiqueta}>
                <div className="border rounded-3 p-4 h-100 shadow-sm bg-white">
                  <i className={`bi ${stat.icono} fs-2 text-primary`}></i>
                  <h3 className="fw-bold mt-3 mb-1">{stat.valor}</h3>
                  <p className="text-muted mb-0">{stat.etiqueta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="confianza" className="py-5 bg-light">
        <div className="container py-4">
          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <span className="badge bg-primary mb-3">Centro de confianza</span>
              <h2 className="fw-bold display-6">
                Seguridad y control en cada evaluacion
              </h2>
              <p className="text-muted">
                La plataforma combina validacion documental, auditoria
                administrativa y registro de actividad para reducir riesgos
                operativos antes de aprobar un prestamo.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {confianza.map((item) => (
                  <div className="col-md-6" key={item}>
                    <div className="bg-white border rounded-3 p-3 h-100">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      <span className="fw-semibold">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="comparativa" className="py-5">
        <div className="container py-4">
          <SectionHeader
            titulo="Comparativa de enfoque"
            texto="PrestaYa se centra en activos digitales y trazabilidad documental."
          />

          <div className="table-responsive rounded-3 shadow-sm">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Criterio</th>
                  <th>PrestaYa</th>
                  <th>Prestamo tradicional</th>
                </tr>
              </thead>
              <tbody>
                <ComparisonRow
                  criterio="Garantia"
                  prestaya="Activos digitales verificables"
                  tradicional="Aval fisico, historial bancario o garantia tradicional"
                />
                <ComparisonRow
                  criterio="Evaluacion"
                  prestaya="Score de seguridad, documentos y auditoria"
                  tradicional="Revision crediticia convencional"
                />
                <ComparisonRow
                  criterio="Beneficio"
                  prestaya="Descuento por garantia segura"
                  tradicional="Tasa fija segun politica interna"
                />
                <ComparisonRow
                  criterio="Seguimiento"
                  prestaya="Estado visible desde el panel del cliente"
                  tradicional="Seguimiento por oficina, correo o llamada"
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-5 bg-light">
        <div className="container py-4">
          <SectionHeader
            titulo="Por que elegir PrestaYa"
            texto="Un flujo pensado para clientes con patrimonio digital."
          />

          <div className="row g-4">
            <div className="col-md-4">
              <BenefitCard
                icono="bi-lightning-charge-fill"
                color="text-warning"
                titulo="Evaluacion rapida"
                texto="Procesamos solicitudes completas con un recorrido digital y trazable."
              />
            </div>
            <div className="col-md-4">
              <BenefitCard
                icono="bi-shield-lock-fill"
                color="text-primary"
                titulo="Seguridad financiera"
                texto="Roles, auditorias, validacion documental y control de riesgo."
              />
            </div>
            <div className="col-md-4">
              <BenefitCard
                icono="bi-graph-up-arrow"
                color="text-success"
                titulo="Activos digitales"
                texto="Monetiza canales, dominios, cuentas y plataformas con valor demostrable."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="garantias" className="py-5">
        <div className="container py-4">
          <SectionHeader
            titulo="Garantias digitales aceptadas"
            texto="Tipos de activos que pueden registrarse para evaluacion."
          />

          <div className="row g-4 text-center">
            {garantiasAceptadas.map((garantia) => (
              <div className="col-md-3" key={garantia.nombre}>
                <div className="card border-0 shadow-sm rounded-3 p-4 h-100">
                  <i className={`bi ${garantia.icono} fs-1 ${garantia.color}`}></i>
                  <h5 className="fw-bold mt-3">{garantia.nombre}</h5>
                  <p className="text-muted small mb-0">{garantia.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="preguntas" className="py-5 bg-light">
        <div className="container py-4">
          <SectionHeader
            titulo="Preguntas frecuentes"
            texto="Respuestas directas antes de iniciar una solicitud."
          />

          <div className="accordion shadow-sm rounded-3 overflow-hidden" id="faqPrestaYa">
            {preguntasFrecuentes.map((item, index) => (
              <div className="accordion-item" key={item.pregunta}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button fw-semibold ${index === 0 ? "" : "collapsed"}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#faq-${index}`}
                  >
                    {item.pregunta}
                  </button>
                </h2>

                <div
                  id={`faq-${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                  data-bs-parent="#faqPrestaYa"
                >
                  <div className="accordion-body text-muted">
                    {item.respuesta}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-final" className="py-5 bg-dark text-white">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h2 className="fw-bold display-6 mb-3">
                Convierte tus activos digitales en oportunidades
              </h2>
              <p className="lead mb-0">
                Inicia el registro, documenta tu garantia y consulta el
                estado de tu evaluacion desde un flujo digital.
              </p>
            </div>

            <div className="col-lg-5 text-lg-end">
              <div className="d-flex flex-wrap justify-content-lg-end gap-3">
                <Link to={rutaGarantia} className="btn btn-light btn-lg fw-bold">
                  Registrar garantia
                </Link>
                <Link to="/acceder" className="btn btn-outline-light btn-lg">
                  Acceder
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-3 mb-md-0">
              <h5 className="fw-bold">PrestaYa</h5>
              <small className="text-light-emphasis">
                Plataforma fintech de prestamos digitales.
              </small>
            </div>

            <div className="col-md-6 text-md-end">
              <small>2026 Todos los derechos reservados.</small>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

function SectionHeader({ titulo, texto, light = false }) {
  return (
    <div className="text-center mb-5">
      <h2 className="fw-bold display-6">
        {titulo}
      </h2>
      <p className={light ? "text-light-emphasis mb-0" : "text-muted mb-0"}>
        {texto}
      </p>
    </div>
  )
}

function HeroMetric({ valor, etiqueta, color }) {
  return (
    <div className="col-4">
      <h3 className={`fw-bold ${color}`}>{valor}</h3>
      <small>{etiqueta}</small>
    </div>
  )
}

function IconCard({ item, className = "col-md-6 col-lg-3" }) {
  return (
    <div className={className}>
      <div className="card border-0 shadow-sm rounded-3 h-100">
        <div className="card-body p-4">
          <i className={`bi ${item.icono} fs-1 ${item.color || "text-primary"}`}></i>
          <h5 className="fw-bold mt-3">{item.nombre || item.titulo}</h5>
          <p className="text-muted mb-0">{item.descripcion}</p>
        </div>
      </div>
    </div>
  )
}

function ResultMetric({ label, value }) {
  return (
    <div className="col-md-4">
      <div className="bg-secondary bg-opacity-25 rounded-3 p-3 h-100">
        <small className="text-light-emphasis">{label}</small>
        <h5 className="fw-bold mt-2 mb-0">{value}</h5>
      </div>
    </div>
  )
}

function ComparisonRow({ criterio, prestaya, tradicional }) {
  return (
    <tr>
      <td className="fw-semibold">{criterio}</td>
      <td>
        <i className="bi bi-check-circle-fill text-success me-2"></i>
        {prestaya}
      </td>
      <td className="text-muted">{tradicional}</td>
    </tr>
  )
}

function MiniFeature({ icono, texto }) {
  return (
    <div className="col-md-6">
      <div className="border rounded-3 p-3 h-100">
        <i className={`bi ${icono} text-primary me-2`}></i>
        <span className="fw-semibold">{texto}</span>
      </div>
    </div>
  )
}

function BenefitCard({ icono, color, titulo, texto }) {
  return (
    <div className="card border-0 shadow-sm rounded-3 h-100 text-center p-4">
      <div className="mb-3">
        <i className={`bi ${icono} fs-1 ${color}`}></i>
      </div>
      <h4 className="fw-bold">{titulo}</h4>
      <p className="text-muted mt-3 mb-0">{texto}</p>
    </div>
  )
}

export default Home
