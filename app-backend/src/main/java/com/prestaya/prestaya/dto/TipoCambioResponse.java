package com.prestaya.prestaya.dto;

public class TipoCambioResponse {

    private String monedaOrigen;

    private String monedaDestino;

    private Double monto;

    private Double tasa;

    private Double resultado;

    private String fuente;

    private String fechaActualizacion;

    private Boolean configurado;

    private String mensaje;

    public TipoCambioResponse() {
    }

    public TipoCambioResponse(
            String monedaOrigen,
            String monedaDestino,
            Double monto,
            Double tasa,
            Double resultado,
            String fuente,
            String fechaActualizacion,
            Boolean configurado,
            String mensaje) {

        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.monto = monto;
        this.tasa = tasa;
        this.resultado = resultado;
        this.fuente = fuente;
        this.fechaActualizacion = fechaActualizacion;
        this.configurado = configurado;
        this.mensaje = mensaje;
    }

    public String getMonedaOrigen() {
        return monedaOrigen;
    }

    public void setMonedaOrigen(String monedaOrigen) {
        this.monedaOrigen = monedaOrigen;
    }

    public String getMonedaDestino() {
        return monedaDestino;
    }

    public void setMonedaDestino(String monedaDestino) {
        this.monedaDestino = monedaDestino;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public Double getTasa() {
        return tasa;
    }

    public void setTasa(Double tasa) {
        this.tasa = tasa;
    }

    public Double getResultado() {
        return resultado;
    }

    public void setResultado(Double resultado) {
        this.resultado = resultado;
    }

    public String getFuente() {
        return fuente;
    }

    public void setFuente(String fuente) {
        this.fuente = fuente;
    }

    public String getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(String fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }

    public Boolean getConfigurado() {
        return configurado;
    }

    public void setConfigurado(Boolean configurado) {
        this.configurado = configurado;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
}
