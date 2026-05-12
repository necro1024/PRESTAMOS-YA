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

    // URL o ID

    private String identificador;

    // Valor tasado

    private Double valorEstimado;

    // Verificada
    // Pendiente

    private String estado;

    // RELACIÓN
    // MUCHAS GARANTÍAS
    // PARA UN PRÉSTAMO

    @ManyToOne
    @JoinColumn(name = "prestamo_id")
    private Prestamo prestamo;

    public Garantia() {
    }

    public Garantia(
            Long id,
            String tipo,
            String identificador,
            Double valorEstimado,
            String estado,
            Prestamo prestamo) {

        this.id = id;
        this.tipo = tipo;
        this.identificador = identificador;
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

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public Double getValorEstimado() {
        return valorEstimado;
    }

    public void setValorEstimado(Double valorEstimado) {
        this.valorEstimado = valorEstimado;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Prestamo getPrestamo() {
        return prestamo;
    }

    public void setPrestamo(Prestamo prestamo) {
        this.prestamo = prestamo;
    }
}