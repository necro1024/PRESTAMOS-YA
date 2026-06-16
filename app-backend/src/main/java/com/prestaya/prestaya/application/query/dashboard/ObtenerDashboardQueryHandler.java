package com.prestaya.prestaya.application.query.dashboard;

import com.prestaya.prestaya.repository.ClienteRepository;
import com.prestaya.prestaya.repository.GarantiaRepository;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ObtenerDashboardQueryHandler {

    private final ClienteRepository clienteRepository;

    private final PrestamoRepository prestamoRepository;

    private final GarantiaRepository garantiaRepository;

    public ObtenerDashboardQueryHandler(
            ClienteRepository clienteRepository,
            PrestamoRepository prestamoRepository,
            GarantiaRepository garantiaRepository) {

        this.clienteRepository = clienteRepository;
        this.prestamoRepository = prestamoRepository;
        this.garantiaRepository = garantiaRepository;
    }

    public Map<String, Object> handle(
            ObtenerDashboardQuery query) {

        Map<String, Object> data = new HashMap<>();

        long totalClientes =
                clienteRepository.count();

        long totalPrestamos =
                prestamoRepository.count();

        long aprobados =
                prestamoRepository
                .findAll()
                .stream()
                .filter(p ->
                    p.getEstado() != null &&
                    p.getEstado()
                    .equalsIgnoreCase("Aprobado"))
                .count();

        long pendientes =
                prestamoRepository
                .findAll()
                .stream()
                .filter(p ->
                    p.getEstado() != null &&
                    p.getEstado()
                    .equalsIgnoreCase("Pendiente"))
                .count();

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
