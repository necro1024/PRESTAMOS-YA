package com.prestaya.prestaya.model;    

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "prestamos")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double monto;

    private String garantia;

    private String estado;

    private Integer cuotas;

    private Double interesAnual;

    private Double cuotaMensual;

    private Double totalPagar;

    @Column(length = 2000)
    private String acuerdoDigital;

    private String estadoAcuerdo;

    private LocalDateTime fechaFirma;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "prestamo")
@JsonIgnore
private List<Garantia> garantias;

    public Prestamo() {
    }

    public Prestamo(
            Long id,
            Double monto,
            String garantia,
            String estado,
            Integer cuotas,
            Double interesAnual,
            Double cuotaMensual,
            Double totalPagar,
            Cliente cliente) {

        this.id = id;
        this.monto = monto;
        this.garantia = garantia;
        this.estado = estado;
        this.cuotas = cuotas;
        this.interesAnual = interesAnual;
        this.cuotaMensual = cuotaMensual;
        this.totalPagar = totalPagar;
        this.cliente = cliente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMonto() {
        return monto;
    }

    public void setMonto(Double monto) {
        this.monto = monto;
    }

    public String getGarantia() {
        return garantia;
    }

    public void setGarantia(String garantia) {
        this.garantia = garantia;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Integer getCuotas() {
        return cuotas;
    }

    public void setCuotas(Integer cuotas) {
        this.cuotas = cuotas;
    }

    public Double getInteresAnual() {
        return interesAnual;
    }

    public void setInteresAnual(Double interesAnual) {
        this.interesAnual = interesAnual;
    }

    public Double getCuotaMensual() {
        return cuotaMensual;
    }

    public void setCuotaMensual(Double cuotaMensual) {
        this.cuotaMensual = cuotaMensual;
    }

    public Double getTotalPagar() {
        return totalPagar;
    }

    public void setTotalPagar(Double totalPagar) {
        this.totalPagar = totalPagar;
    }

    public String getAcuerdoDigital() {
        return acuerdoDigital;
    }

    public void setAcuerdoDigital(String acuerdoDigital) {
        this.acuerdoDigital = acuerdoDigital;
    }

    public String getEstadoAcuerdo() {
        return estadoAcuerdo;
    }

    public void setEstadoAcuerdo(String estadoAcuerdo) {
        this.estadoAcuerdo = estadoAcuerdo;
    }

    public LocalDateTime getFechaFirma() {
        return fechaFirma;
    }

    public void setFechaFirma(LocalDateTime fechaFirma) {
        this.fechaFirma = fechaFirma;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
