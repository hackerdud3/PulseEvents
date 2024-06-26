package com.pulseevents.pulse.repository;

import com.pulseevents.pulse.models.ERole;
import com.pulseevents.pulse.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepo extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
