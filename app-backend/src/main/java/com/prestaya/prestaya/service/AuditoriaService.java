package com.prestaya.prestaya.service;

import com.prestaya.prestaya.model.Auditoria;
import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.model.Usuario;
import com.prestaya.prestaya.repository.AuditoriaRepository;
import com.prestaya.prestaya.repository.GarantiaRepository;
import com.prestaya.prestaya.repository.UsuarioRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditoriaService {

    private final AuditoriaRepository repository;

    private final UsuarioRepository usuarioRepository;

    private final GarantiaRepository garantiaRepository;

    public AuditoriaService(
            AuditoriaRepository repository,
            UsuarioRepository usuarioRepository,
            GarantiaRepository garantiaRepository) {

        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
        this.garantiaRepository = garantiaRepository;
    }

    public List<Auditoria> listar() {

        return repository.findAllByOrderByFechaHoraDesc();
    }

    public void registrarGarantia(
            Garantia garantia,
            String accion,
            String resultado,
            String detalle) {

        Auditoria auditoria =
                crearBase(
                        accion,
                        "GARANTIA",
                        garantia.getId(),
                        resultado,
                        detalle
                );

        auditoria.setGarantiaId(garantia.getId());

        if (garantia.getPrestamo() != null) {
            auditoria.setPrestamoId(
                    garantia.getPrestamo().getId());

            if (garantia.getPrestamo()
                    .getCliente() != null) {

                auditoria.setCliente(
                        garantia.getPrestamo()
                        .getCliente()
                        .getNombre()
                );
            }
        }

        repository.save(auditoria);
    }

    public void registrarPrestamo(
            Prestamo prestamo,
            String resultado,
            String detalle) {

        Auditoria auditoria =
                crearBase(
                        "DECISION_PRESTAMO",
                        "PRESTAMO",
                        prestamo.getId(),
                        resultado,
                        detalle
                );

        auditoria.setPrestamoId(prestamo.getId());

        if (prestamo.getCliente() != null) {
            auditoria.setCliente(
                    prestamo.getCliente().getNombre());
        }

        List<Garantia> garantias =
                garantiaRepository.findByPrestamoId(
                        prestamo.getId());

        if (!garantias.isEmpty()) {
            auditoria.setGarantiaId(
                    garantias.get(0).getId());
        }

        repository.save(auditoria);
    }

    private Auditoria crearBase(
            String accion,
            String entidad,
            Long entidadId,
            String resultado,
            String detalle) {

        Authentication authentication =
                SecurityContextHolder
                .getContext()
                .getAuthentication();

        String username =
                authentication.getName();

        Usuario usuario =
                usuarioRepository
                .findByUsername(username)
                .orElse(null);

        Auditoria auditoria = new Auditoria();
        auditoria.setUsuario(username);
        auditoria.setNombreUsuario(
                usuario != null
                ? usuario.getNombre()
                : "Administrador"
        );
        auditoria.setAccion(accion);
        auditoria.setEntidad(entidad);
        auditoria.setEntidadId(entidadId);
        auditoria.setResultado(resultado);
        auditoria.setDetalle(detalle);
        auditoria.setFechaHora(LocalDateTime.now());

        return auditoria;
    }
}
