package com.prestaya.prestaya.repository;

import com.prestaya.prestaya.model.Cliente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository
        extends JpaRepository<Cliente, Long> {

}