package com.pulseevents.pulse.repository;

import com.pulseevents.pulse.models.EventCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EventCategoryRepo extends MongoRepository<EventCategory, String> {
}
