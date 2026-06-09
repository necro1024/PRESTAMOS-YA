package com.prestaya.prestaya.repository;

import com.prestaya.prestaya.model.Prestamo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrestamoRepository
        extends JpaRepository<Prestamo, Long> {

    List<Prestamo> findByClienteId(Long clienteId);
}
