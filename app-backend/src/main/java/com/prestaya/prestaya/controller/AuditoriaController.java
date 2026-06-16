package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.query.auditoria.ListarAuditoriasQuery;
import com.prestaya.prestaya.application.query.auditoria.ListarAuditoriasQueryHandler;
import com.prestaya.prestaya.model.Auditoria;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auditorias")
@PreAuthorize("hasRole('ADMIN')")
public class AuditoriaController {

    private final ListarAuditoriasQueryHandler
            listarAuditoriasQueryHandler;

    public AuditoriaController(
            ListarAuditoriasQueryHandler
                    listarAuditoriasQueryHandler) {

        this.listarAuditoriasQueryHandler =
                listarAuditoriasQueryHandler;
    }

    @GetMapping
    public List<Auditoria> listar() {

        return listarAuditoriasQueryHandler.handle(
                new ListarAuditoriasQuery());
    }
}
