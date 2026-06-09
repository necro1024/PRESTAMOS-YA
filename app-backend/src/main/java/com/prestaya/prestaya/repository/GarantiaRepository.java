package com.prestaya.prestaya.repository;


import com.prestaya.prestaya.model.Garantia;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GarantiaRepository
        extends JpaRepository<Garantia, Long> {

    List<Garantia> findByPrestamoId(Long prestamoId);
}
