package com.prestaya.prestaya.security;

import com.prestaya.prestaya.model.Garantia;
import com.prestaya.prestaya.model.Prestamo;
import com.prestaya.prestaya.model.Cliente;
import com.prestaya.prestaya.repository.ClienteRepository;
import com.prestaya.prestaya.repository.PrestamoRepository;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("authorizationService")
public class AuthorizationService {

    private final ClienteRepository clienteRepository;

    private final PrestamoRepository prestamoRepository;

    public AuthorizationService(
            ClienteRepository clienteRepository,
            PrestamoRepository prestamoRepository) {

        this.clienteRepository = clienteRepository;
        this.prestamoRepository = prestamoRepository;
    }

    public boolean puedeAccederCliente(
            Long clienteId,
            Authentication authentication) {

        if (esAdmin(authentication)) {
            return true;
        }

        return clienteRepository
                .findById(clienteId)
                .map(cliente ->
                    cliente.getCorreo() != null
                    && cliente.getCorreo().equalsIgnoreCase(
                        authentication.getName()
                    )
                )
                .orElse(false);
    }

    public boolean puedeAccederPrestamo(
            Long prestamoId,
            Authentication authentication) {

        if (esAdmin(authentication)) {
            return true;
        }

        return prestamoRepository
                .findById(prestamoId)
                .map(prestamo ->
                    prestamo.getCliente() != null
                    && prestamo.getCliente().getCorreo() != null
                    && prestamo.getCliente()
                    .getCorreo()
                    .equalsIgnoreCase(
                        authentication.getName()
                    )
                )
                .orElse(false);
    }

    public boolean puedeCrearPrestamo(
            Prestamo prestamo,
            Authentication authentication) {

        return prestamo != null
                && prestamo.getCliente() != null
                && puedeAccederCliente(
                    prestamo.getCliente().getId(),
                    authentication
                );
    }

    public boolean puedeCrearCliente(
            Cliente cliente,
            Authentication authentication) {

        return cliente != null
                && cliente.getCorreo() != null
                && cliente.getCorreo().equalsIgnoreCase(
                    authentication.getName()
                );
    }

    public boolean puedeRegistrarGarantia(
            Garantia garantia,
            Authentication authentication) {

        return garantia != null
                && garantia.getPrestamo() != null
                && puedeAccederPrestamo(
                    garantia.getPrestamo().getId(),
                    authentication
                );
    }

    private boolean esAdmin(
            Authentication authentication) {

        return authentication
                .getAuthorities()
                .stream()
                .anyMatch(authority ->
                    authority.getAuthority()
                    .equals("ROLE_ADMIN")
                );
    }
}
