package com.pulseevents.pulse.security;

import com.pulseevents.pulse.security.jwt.AuthEntryPointJwt;
import com.pulseevents.pulse.security.jwt.AuthTokenFilter;
import com.pulseevents.pulse.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    public AuthTokenFilter aut

}
