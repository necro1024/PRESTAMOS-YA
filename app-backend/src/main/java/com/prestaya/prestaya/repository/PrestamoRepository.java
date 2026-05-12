package com.prestaya.prestaya.repository;

import com.prestaya.prestaya.model.Prestamo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PrestamoRepository
        extends JpaRepository<Prestamo, Long> {

}
