package com.prestaya.prestaya.application.query.garantia;

import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.service.GarantiaService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListarGarantiasQueryHandler {

    private final GarantiaService garantiaService;

    public ListarGarantiasQueryHandler(
            GarantiaService garantiaService) {

        this.garantiaService = garantiaService;
    }

    public List<Garantia> handle(
            ListarGarantiasQuery query) {

        return garantiaService.listar();
    }
}
