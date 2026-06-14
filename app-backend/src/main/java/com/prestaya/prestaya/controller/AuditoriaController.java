package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.model.Auditoria;
import com.prestaya.prestaya.service.AuditoriaService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auditorias")
@PreAuthorize("hasRole('ADMIN')")
public class AuditoriaController {

    private final AuditoriaService service;

    public AuditoriaController(
            AuditoriaService service) {

        this.service = service;
    }

    @GetMapping
    public List<Auditoria> listar() {

        return service.listar();
    }
}
