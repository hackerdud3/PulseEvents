package com.pulseevents.pulse.controllers;

import com.pulseevents.pulse.models.ERole;
import com.pulseevents.pulse.models.Role;
import com.pulseevents.pulse.models.User;
import com.pulseevents.pulse.payload.request.LoginRequest;
import com.pulseevents.pulse.payload.request.SingupRequest;
import com.pulseevents.pulse.payload.response.JwtResponse;
import com.pulseevents.pulse.payload.response.MessageResponse;
import com.pulseevents.pulse.repository.RoleRepo;
import com.pulseevents.pulse.repository.UserRepo;
import com.pulseevents.pulse.security.jwt.JwtUtils;
import com.pulseevents.pulse.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepo userRepo;
    @Autowired
    RoleRepo roleRepo;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtUtils jwtUtils;

    /**
     * Allow user to Login and get all the user roles
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
//        Use authenticate method in AuthenticationManager and pass username and password from the login request
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//        Set the authentication context
        SecurityContextHolder.getContext().setAuthentication(authentication);
//        Generate JWT token
        String jwt = jwtUtils.generateJwtToken(authentication);
//        Get all the user roles for role based authorization
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), userDetails.getUsername(), roles));
    }

    /**
     * Allow users to signUp
     * */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SingupRequest signupRequest){
        if(userRepo.existsByUsername(signupRequest.getUsername())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken"));
        }
        if(userRepo.existsByEmail(signupRequest.getEmail())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use"));
        }
//        If the user does not exist then create new User, store email and encoded password in the database
        User user = new User(signupRequest.getUsername(),
                signupRequest.getEmail(),
                passwordEncoder.encode(signupRequest.getPassword()));
//        Set user roles
        Set<String> strRoles = signupRequest.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin" -> {
                        Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found 2."));
                        roles.add(adminRole);
                    }
                    case "mod" -> {
                        Role modRole = roleRepo.findByName(ERole.ROLE_MOD)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found 3."));
                        roles.add(modRole);
                    }
                    default -> {
                        Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found 4."));
                        roles.add(userRole);
                    }
                }
            });
        }
        user.setRoles(roles);
        logger.info("User {} registered successfully!", user.getUsername());
        userRepo.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}
