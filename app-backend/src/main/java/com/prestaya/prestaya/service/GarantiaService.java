package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Garantia;

import com.prestaya.prestaya.repository.GarantiaRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GarantiaService {

    private final GarantiaRepository repository;
    private final PrestamoService prestamoService;

    public GarantiaService(
            GarantiaRepository repository,
            PrestamoService prestamoService) {

        this.repository = repository;
        this.prestamoService = prestamoService;
    }

    public List<Garantia> listar() {
        return repository.findAll();
    }

    public List<Garantia> listarPorPrestamo(
            Long prestamoId) {

        return repository.findByPrestamoId(
                prestamoId);
    }

    public Garantia guardar(
            Garantia garantia) {

        prepararGarantia(garantia);
        return repository.save(garantia);
    }

    public Garantia actualizar(
            Long id,
            Garantia actualizada) {

        Garantia garantia =
                repository.findById(id).orElse(null);

        if (garantia == null) {
            return null;
        }

        garantia.setTipo(actualizada.getTipo());
        garantia.setNombreActivo(
                actualizada.getNombreActivo());

        garantia.setIdentificador(
                actualizada.getIdentificador());

        garantia.setCorreoTitular(
                actualizada.getCorreoTitular());

        garantia.setFechaInicio(
                actualizada.getFechaInicio());

        garantia.setValorEstimado(
                actualizada.getValorEstimado());

        garantia.setIngresosMensuales(
                actualizada.getIngresosMensuales());

        garantia.setIdentificacionPersonal(
                actualizada.getIdentificacionPersonal());

        garantia.setDocumentacionPersonal(
                actualizada.getDocumentacionPersonal());

        garantia.setHistorialCrediticio(
                actualizada.getHistorialCrediticio());

        garantia.setComprobantesIngresos(
                actualizada.getComprobantesIngresos());

        garantia.setComprobanteActivo(
                actualizada.getComprobanteActivo());

        garantia.setEstado(
                actualizada.getEstado());

        garantia.setPuntuacion(
                actualizada.getPuntuacion());

        garantia.setNivelRiesgo(
                actualizada.getNivelRiesgo());

        garantia.setRecomendacion(
                actualizada.getRecomendacion());

        garantia.setResultadoEvaluacion(
                actualizada.getResultadoEvaluacion());

        prepararGarantia(garantia);

        if (garantia.getPuntuacion() != null) {
            prestamoService.aplicarRecompensaSeguridad(
                    garantia.getPrestamo(),
                    garantia.getPuntuacion());
        }

        return repository.save(garantia);
    }

    public Garantia evaluarActivo(Long id) {

        Garantia garantia =
                repository.findById(id).orElse(null);

        if (garantia == null) {
            return null;
        }

        int puntuacion = 20;

        if (tieneTexto(garantia.getIdentificador())) {
            puntuacion += 15;
        }

        if (tieneTexto(garantia.getComprobanteActivo())) {
            puntuacion += 15;
        }

        if (tieneTexto(garantia.getIdentificacionPersonal())
                && tieneTexto(garantia.getDocumentacionPersonal())) {
            puntuacion += 15;
        }

        if (tieneTexto(garantia.getHistorialCrediticio())) {
            puntuacion += 10;
        }

        if (tieneTexto(garantia.getComprobantesIngresos())) {
            puntuacion += 10;
        }

        if (garantia.getIngresosMensuales() != null
                && garantia.getIngresosMensuales() >= 1000) {
            puntuacion += 10;
        }

        if (garantia.getValorEstimado() != null
                && garantia.getPrestamo() != null
                && garantia.getPrestamo().getMonto() != null
                && garantia.getValorEstimado()
                >= garantia.getPrestamo().getMonto() * 1.2) {
            puntuacion += 15;
        }

        puntuacion = Math.min(puntuacion, 100);

        garantia.setPuntuacion(puntuacion);

        if (puntuacion >= 75) {
            garantia.setNivelRiesgo("Bajo");
            garantia.setRecomendacion("Aprobar");
            garantia.setEstado("Verificada");
        } else if (puntuacion >= 55) {
            garantia.setNivelRiesgo("Medio");
            garantia.setRecomendacion("Revisar");
            garantia.setEstado("Pendiente");
        } else {
            garantia.setNivelRiesgo("Alto");
            garantia.setRecomendacion("Rechazar");
            garantia.setEstado("Rechazada");
        }

        garantia.setResultadoEvaluacion(
                "Score generado con validacion de identidad, "
                + "documentos, ingresos, historial y cobertura "
                + "del activo digital. Tasa base: "
                + PrestamoService.INTERES_BASE_ANUAL
                + "%. Descuento por seguridad: "
                + prestamoService.calcularDescuentoPorSeguridad(
                        puntuacion)
                + "%. Tasa final estimada: "
                + prestamoService.calcularInteresConRecompensa(
                        puntuacion)
                + "%.");

        prestamoService.aplicarRecompensaSeguridad(
                garantia.getPrestamo(),
                puntuacion);

        return repository.save(garantia);
    }

    public void eliminar(Long id) {

        repository.deleteById(id);
    }

    private void prepararGarantia(Garantia garantia) {

        if (garantia.getEstado() == null
                || garantia.getEstado().isBlank()) {
            garantia.setEstado("Pendiente");
        }
    }

    private boolean tieneTexto(String valor) {

        return valor != null && !valor.isBlank();
    }
}
