package com.prestaya.prestaya.application.query.garantia;

import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListarGarantiasPorPrestamoQueryHandler {

    private final GarantiaService garantiaService;

    public ListarGarantiasPorPrestamoQueryHandler(
            GarantiaService garantiaService) {

        this.garantiaService = garantiaService;
    }

    public List<Garantia> handle(
            ListarGarantiasPorPrestamoQuery query) {

        return garantiaService.listarPorPrestamo(
                query.prestamoId());
    }
}
