package com.ufc.br.api_gateway.infra;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.ufc.br.api_gateway.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    public String generateToken(User user){
        try {
            Algorithm alg = Algorithm.HMAC256(secret);

            String token = JWT.create()
                    .withIssuer("api-gateway")
                    .withSubject(user.getEmail())
                    .withExpiresAt(genExpirationDate())
                    .sign(alg);

            return token;
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error while authentication!");
        }
    }

    public String validateToken(String token){
        try {
            Algorithm alg = Algorithm.HMAC256(secret);

            return JWT.require(alg)
                    .withIssuer("api-gateway")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private Instant genExpirationDate(){
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
