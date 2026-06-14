package com.prestaya.prestaya.repository;

import com.prestaya.prestaya.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository
        extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByCorreo(String correo);
}
