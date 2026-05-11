package backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/prestamos")
@CrossOrigin(origins = "http://localhost:5173")
public class PrestamoController {

    @GetMapping
    public List<Map<String, Object>> listarPrestamos() {

        List<Map<String, Object>> prestamos = new ArrayList<>();

        Map<String, Object> p1 = new HashMap<>();
        p1.put("cliente", "Juan Perez");
        p1.put("monto", 5000);
        p1.put("garantia", "Laptop Gamer");

        Map<String, Object> p2 = new HashMap<>();
        p2.put("cliente", "Maria Lopez");
        p2.put("monto", 3000);
        p2.put("garantia", "iPhone 14");

        Map<String, Object> p3 = new HashMap<>();
        p3.put("cliente", "Carlos Diaz");
        p3.put("monto", 7000);
        p3.put("garantia", "Moto");

        prestamos.add(p1);
        prestamos.add(p2);
        prestamos.add(p3);

        return prestamos;
    }
}