package com.prestaya.prestaya.model;    

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
            Cliente cliente) {

        this.id = id;
        this.monto = monto;
        this.garantia = garantia;
        this.estado = estado;
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

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
