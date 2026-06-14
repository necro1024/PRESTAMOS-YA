package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.repository.ClienteRepository;
import com.prestaya.prestaya.repository.GarantiaRepository;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final ClienteRepository clienteRepository;

    private final PrestamoRepository prestamoRepository;

    private final GarantiaRepository garantiaRepository;

    public DashboardController(
            ClienteRepository clienteRepository,
            PrestamoRepository prestamoRepository,
            GarantiaRepository garantiaRepository) {

        this.clienteRepository = clienteRepository;
        this.prestamoRepository = prestamoRepository;
        this.garantiaRepository = garantiaRepository;
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
                    p.getEstado() != null &&
                    p.getEstado()
                    .equalsIgnoreCase("Aprobado"))
                .count();

        // PENDIENTES

        long pendientes =
                prestamoRepository
                .findAll()
                .stream()
                .filter(p ->
                    p.getEstado() != null &&
                    p.getEstado()
                    .equalsIgnoreCase("Pendiente"))
                .count();

        // MONTO TOTAL

        double montoTotal =
                prestamoRepository
                .findAll()
                .stream()
                .filter(p -> p.getMonto() != null)
                .mapToDouble(p -> p.getMonto())
                .sum();

        long activosEvaluados =
                garantiaRepository
                .findAll()
                .stream()
                .filter(g -> g.getPuntuacion() != null)
                .count();

        long activosPendientes =
                garantiaRepository
                .findAll()
                .stream()
                .filter(g ->
                    g.getPuntuacion() == null)
                .count();

        double riesgoPromedio =
                garantiaRepository
                .findAll()
                .stream()
                .filter(g -> g.getPuntuacion() != null)
                .mapToInt(g -> g.getPuntuacion())
                .average()
                .orElse(0);

        data.put("clientes", totalClientes);

        data.put("prestamos", totalPrestamos);

        data.put("aprobados", aprobados);

        data.put("pendientes", pendientes);

        data.put("montoTotal", montoTotal);

        data.put("activosEvaluados", activosEvaluados);

        data.put("activosPendientes", activosPendientes);

        data.put("riesgoPromedio", riesgoPromedio);

        return data;
    }
}
