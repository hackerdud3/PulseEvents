package com.pulseevents.pulse.service;

import com.pulseevents.pulse.model.Events;
import com.pulseevents.pulse.repository.EventsRepo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventsService {
    @Autowired
    private EventsRepo repo;

    public List<Events> getAllEvents(){
        return repo.findAll();
    }

    public Events addEvent(Events events) {
        return repo.insert(events);
    }

    public Events saveEvent(Events events) {
        Events updateEvent = repo.findById(events.);
        return repo.save()
    }
}
