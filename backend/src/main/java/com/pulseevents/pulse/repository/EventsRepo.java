package com.pulseevents.pulse.repository;

import com.pulseevents.pulse.model.Events;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EventsRepo extends MongoRepository<Events, String> {

    List<Events> findByUserId(String userId);
}
