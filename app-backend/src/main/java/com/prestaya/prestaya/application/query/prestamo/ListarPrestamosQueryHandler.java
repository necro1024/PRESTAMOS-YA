package com.prestaya.prestaya.application.query.prestamo;

import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.service.PrestamoService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListarPrestamosQueryHandler {

    private final PrestamoService prestamoService;

    public ListarPrestamosQueryHandler(
            PrestamoService prestamoService) {

        this.prestamoService = prestamoService;
    }

    public List<Prestamo> handle(
            ListarPrestamosQuery query) {

        return prestamoService.listar();
    }
}
