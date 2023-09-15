package com.pulseevents.pulse.controllers;

import com.pulseevents.pulse.model.Events;
import com.pulseevents.pulse.repository.EventsRepo;
import com.pulseevents.pulse.service.EventsService;
import jdk.jfr.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping(value = "/events")
    public List<Events> allEvents(){
        return eventsService.getAllEvents();
    }

    @PostMapping(value = "/addevent")
    public ResponseEntity<Events> addEvent(@RequestBody Events events){
        Events savedEvent = eventsService.addEvent(events);
        return ResponseEntity.ok(savedEvent);
    }

    @PostMapping(value = "/updateevent")
    public ResponseEntity<Events> updateEvent(@RequestBody Events events){
        eventsService.saveEvent(events);
    }
}
