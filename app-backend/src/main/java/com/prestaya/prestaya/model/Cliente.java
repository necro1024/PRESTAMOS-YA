package com.prestaya.prestaya.model;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private String dni;

    private String correo;

    private String telefono;

    private String estado;

    @OneToMany(mappedBy = "cliente")
    @JsonIgnore
    private List<Prestamo> prestamos;

    public Cliente() {
    }

    public Cliente(Long id, String nombre, String dni,
                String correo, String telefono,
                String estado) {

        this.id = id;
        this.nombre = nombre;
        this.dni = dni;
        this.correo = correo;
        this.telefono = telefono;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}