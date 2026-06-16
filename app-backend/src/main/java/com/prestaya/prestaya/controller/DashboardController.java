package com.prestaya.prestaya.controller;

import com.prestaya.prestaya.application.query.dashboard.ObtenerDashboardQuery;
import com.prestaya.prestaya.application.query.dashboard.ObtenerDashboardQueryHandler;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final ObtenerDashboardQueryHandler
            obtenerDashboardQueryHandler;

    public DashboardController(
            ObtenerDashboardQueryHandler
                    obtenerDashboardQueryHandler) {

        this.obtenerDashboardQueryHandler =
                obtenerDashboardQueryHandler;
    }

    @GetMapping
    public Map<String, Object> obtenerDashboard() {

        return obtenerDashboardQueryHandler.handle(
                new ObtenerDashboardQuery());
    }
}
