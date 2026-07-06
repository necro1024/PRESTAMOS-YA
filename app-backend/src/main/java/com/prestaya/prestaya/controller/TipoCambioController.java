package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.dto.TipoCambioResponse;
import com.prestaya.prestaya.service.TipoCambioService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tipo-cambio")
@CrossOrigin("*")
public class TipoCambioController {

    private final TipoCambioService tipoCambioService;

    public TipoCambioController(
            TipoCambioService tipoCambioService) {

        this.tipoCambioService = tipoCambioService;
    }

    @GetMapping("/usd-pen")
    public TipoCambioResponse obtenerUsdPen() {
        return tipoCambioService.obtenerUsdPen();
    }

    @GetMapping("/convertir")
    public TipoCambioResponse convertir(
            @RequestParam(defaultValue = "USD") String origen,
            @RequestParam(defaultValue = "PEN") String destino,
            @RequestParam(defaultValue = "1") Double monto) {

        return tipoCambioService.convertir(
                origen,
                destino,
                monto);
    }
}
