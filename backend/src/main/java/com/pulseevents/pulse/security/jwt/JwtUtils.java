package com.pulseevents.pulse.security.jwt;

import com.pulseevents.pulse.services.UserDetailsImpl;
import io.jsonwebtoken.io.Decoders;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.*;

import java.nio.channels.UnsupportedAddressTypeException;
import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwtSecretKey}")
    private  String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication){
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
        logger.info("Secret",jwtSecret);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date().getTime())+ jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS256, key())
                .compact();
    }
    private Key key(){
        String secret = jwtSecret;
        logger.info("Base64 encoded secret: {}", secret);
        Key generatedKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        logger.info("Generated key: {}", generatedKey);
        return generatedKey;
    }


    public String getUsernameFromJwtToken(String token){
        return Jwts.parser().setSigningKey(key()).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken){
        try{
            Jwts.parser().setSigningKey(key()).parse(authToken);
            return true;
        } catch (MalformedJwtException e){
            logger.error("Invalid JWT Token: {}", e.getMessage());
        }catch (ExpiredJwtException e){
            logger.error("JWT token is expired: {}", e.getMessage());
        }catch (UnsupportedAddressTypeException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        }catch (IllegalArgumentException e){
            logger.error("JWT claims string is empty: {} ", e.getMessage());
        }
        return false;
    }





}
