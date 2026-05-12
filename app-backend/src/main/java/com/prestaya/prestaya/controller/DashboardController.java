package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.repository.ClienteRepository;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final ClienteRepository clienteRepository;

    private final PrestamoRepository prestamoRepository;

    public DashboardController(
            ClienteRepository clienteRepository,
            PrestamoRepository prestamoRepository) {

        this.clienteRepository = clienteRepository;
        this.prestamoRepository = prestamoRepository;
    }

    @GetMapping
    public Map<String, Object> obtenerDashboard() {

        Map<String, Object> data = new HashMap<>();

        // TOTAL CLIENTES

        long totalClientes =
                clienteRepository.count();

        // TOTAL PRÉSTAMOS

        long totalPrestamos =
                prestamoRepository.count();

        // PRÉSTAMOS APROBADOS

        long aprobados =
                prestamoRepository
                .findAll()
                .stream()
                .filter(p ->
                    p.getEstado()
                    .equalsIgnoreCase("Aprobado"))
                .count();

        // PENDIENTES

        long pendientes =
                prestamoRepository
                .findAll()
                .stream()
                .filter(p ->
                    p.getEstado()
                    .equalsIgnoreCase("Pendiente"))
                .count();

        // MONTO TOTAL

        double montoTotal =
                prestamoRepository
                .findAll()
                .stream()
                .mapToDouble(p -> p.getMonto())
                .sum();

        data.put("clientes", totalClientes);

        data.put("prestamos", totalPrestamos);

        data.put("aprobados", aprobados);

        data.put("pendientes", pendientes);

        data.put("montoTotal", montoTotal);

        return data;
    }
}