package com.example.e_commerce.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil
{
    @Value("${jwt.security.key}")
    private String securityKey;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(securityKey.getBytes());
    }

    public String generateToken(String username)
    {
        return Jwts.builder().setSubject(username)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+ 1000 * 60 * 60 * 24 * 7))
                .compact();
    }

    public String extractUsername(String username)
    {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(username)
                .getBody().getSubject();
    }

}
