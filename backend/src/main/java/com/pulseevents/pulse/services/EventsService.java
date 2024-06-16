package com.pulseevents.pulse.services;

import com.pulseevents.pulse.models.Events;
import com.pulseevents.pulse.repository.EventsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventsService {
    @Autowired
    private EventsRepo repo;

    public List<Events> getAllEvents() {
        return repo.findAll();
    }

    public Events addEvent(Events events) {
        return repo.insert(events);
    }


    public Optional<Events> getEvent(String eid) {
        return repo.findById(eid);
    }

    public Events saveEvent(Events event) {
        return repo.save(event);

    }


    public void delete(String eid) {
        repo.deleteById(eid);
    }
}
