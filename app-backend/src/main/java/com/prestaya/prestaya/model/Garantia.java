package com.prestaya.prestaya.model;

import jakarta.persistence.*;

@Entity
@Table(name = "garantias")
public class Garantia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // YouTube
    // Dominio
    // Stripe
    // PayPal

    private String tipo;

    private String nombreActivo;

    // URL o ID

    private String identificador;

    private String correoTitular;

    private String fechaInicio;

    // Valor tasado

    private Double valorEstimado;

    private Double ingresosMensuales;

    @Column(length = 1000)
    private String identificacionPersonal;

    @Column(length = 1000)
    private String documentacionPersonal;

    @Column(length = 1000)
    private String historialCrediticio;

    @Column(length = 1000)
    private String comprobantesIngresos;

    @Column(length = 1000)
    private String comprobanteActivo;

    // Verificada
    // Pendiente

    private String estado;

    private Integer puntuacion;

    private String nivelRiesgo;

    private String recomendacion;

    @Column(length = 2000)
    private String resultadoEvaluacion;

    // RELACION
    // MUCHAS GARANTIAS
    // PARA UN PRESTAMO

    @ManyToOne
    @JoinColumn(name = "prestamo_id")
    private Prestamo prestamo;

    public Garantia() {
    }

    public Garantia(
            Long id,
            String tipo,
            String nombreActivo,
            String identificador,
            String correoTitular,
            Double valorEstimado,
            String estado,
            Prestamo prestamo) {

        this.id = id;
        this.tipo = tipo;
        this.nombreActivo = nombreActivo;
        this.identificador = identificador;
        this.correoTitular = correoTitular;
        this.valorEstimado = valorEstimado;
        this.estado = estado;
        this.prestamo = prestamo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getNombreActivo() {
        return nombreActivo;
    }

    public void setNombreActivo(String nombreActivo) {
        this.nombreActivo = nombreActivo;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public String getCorreoTitular() {
        return correoTitular;
    }

    public void setCorreoTitular(String correoTitular) {
        this.correoTitular = correoTitular;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Double getValorEstimado() {
        return valorEstimado;
    }

    public void setValorEstimado(Double valorEstimado) {
        this.valorEstimado = valorEstimado;
    }

    public Double getIngresosMensuales() {
        return ingresosMensuales;
    }

    public void setIngresosMensuales(Double ingresosMensuales) {
        this.ingresosMensuales = ingresosMensuales;
    }

    public String getIdentificacionPersonal() {
        return identificacionPersonal;
    }

    public void setIdentificacionPersonal(String identificacionPersonal) {
        this.identificacionPersonal = identificacionPersonal;
    }

    public String getDocumentacionPersonal() {
        return documentacionPersonal;
    }

    public void setDocumentacionPersonal(String documentacionPersonal) {
        this.documentacionPersonal = documentacionPersonal;
    }

    public String getHistorialCrediticio() {
        return historialCrediticio;
    }

    public void setHistorialCrediticio(String historialCrediticio) {
        this.historialCrediticio = historialCrediticio;
    }

    public String getComprobantesIngresos() {
        return comprobantesIngresos;
    }

    public void setComprobantesIngresos(String comprobantesIngresos) {
        this.comprobantesIngresos = comprobantesIngresos;
    }

    public String getComprobanteActivo() {
        return comprobanteActivo;
    }

    public void setComprobanteActivo(String comprobanteActivo) {
        this.comprobanteActivo = comprobanteActivo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Integer puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getNivelRiesgo() {
        return nivelRiesgo;
    }

    public void setNivelRiesgo(String nivelRiesgo) {
        this.nivelRiesgo = nivelRiesgo;
    }

    public String getRecomendacion() {
        return recomendacion;
    }

    public void setRecomendacion(String recomendacion) {
        this.recomendacion = recomendacion;
    }

    public String getResultadoEvaluacion() {
        return resultadoEvaluacion;
    }

    public void setResultadoEvaluacion(String resultadoEvaluacion) {
        this.resultadoEvaluacion = resultadoEvaluacion;
    }

    public Prestamo getPrestamo() {
        return prestamo;
    }

    public void setPrestamo(Prestamo prestamo) {
        this.prestamo = prestamo;
    }
}
