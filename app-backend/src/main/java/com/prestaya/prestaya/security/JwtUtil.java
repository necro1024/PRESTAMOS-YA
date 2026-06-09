package com.prestaya.prestaya.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET =
        "prestaya_secret_key_prestaya_secret_key";

    private final long EXPIRATION =
        1000 * 60 * 60 * 24;

    private Key getKey() {

        return Keys.hmacShaKeyFor(
            SECRET.getBytes()
        );
    }

    public String generarToken(
        String username,
        String rol) {

    return Jwts.builder()

            .setSubject(username)

            .claim(
                    "rol",
                    rol
            )

            .setIssuedAt(
                    new Date()
            )

            .setExpiration(
                    new Date(
                            System.currentTimeMillis()
                            + EXPIRATION
                    )
            )

            .signWith(
                    getKey(),
                    SignatureAlgorithm.HS256
            )

            .compact();
}

    public String obtenerUsername(
            String token) {

        return Jwts.parserBuilder()

                .setSigningKey(getKey())

                .build()

                .parseClaimsJws(token)

                .getBody()

                .getSubject();
    }

    public String obtenerRol(
        String token) {

    return Jwts.parserBuilder()

            .setSigningKey(
                    getKey()
            )

            .build()

            .parseClaimsJws(
                    token
            )

            .getBody()

            .get(
                    "rol",
                    String.class
            );
}

    public boolean validarToken(
            String token) {

        try {

            Jwts.parserBuilder()
                    .setSigningKey(getKey())
                    .build()
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }
}
