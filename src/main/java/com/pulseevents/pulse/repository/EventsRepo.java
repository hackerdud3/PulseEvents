package com.pulseevents.pulse.repository;

import com.pulseevents.pulse.model.Events;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EventsRepo extends MongoRepository<Events, String> {

}
