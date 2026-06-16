package com.prestaya.prestaya.application.query.auditoria;

import com.prestaya.prestaya.model.Auditoria;
import com.prestaya.prestaya.service.AuditoriaService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListarAuditoriasQueryHandler {

    private final AuditoriaService auditoriaService;

    public ListarAuditoriasQueryHandler(
            AuditoriaService auditoriaService) {

        this.auditoriaService = auditoriaService;
    }

    public List<Auditoria> handle(
            ListarAuditoriasQuery query) {

        return auditoriaService.listar();
    }
}
