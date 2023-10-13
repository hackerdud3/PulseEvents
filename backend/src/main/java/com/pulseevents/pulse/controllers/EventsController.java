package com.pulseevents.pulse.controllers;

import com.pulseevents.pulse.model.Events;
import com.pulseevents.pulse.service.EventsService;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping(value = "/events")
    public List<Events> allEvents() {
        return eventsService.getAllEvents();
    }

    @PostMapping(value = "/addevent")
    public ResponseEntity<Events> addEvent(@RequestParam("eventImage") MultipartFile file, @RequestBody Events events) throws IOException {
        Binary eventImage = new Binary(file.getBytes());
        events.setEventImage(eventImage);
        Events savedEvent = eventsService.addEvent(events);
        return ResponseEntity.ok(savedEvent);
    }

    @GetMapping(value = "/event/{eid}")
    public ResponseEntity<Events> getSingleEvent(@PathVariable("eid") String eid) {
        Optional<Events> optionalEvent = eventsService.getEvent(eid);
        if (optionalEvent.isPresent()) {
            Events event = optionalEvent.get();
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/event/{eid}")
    public ResponseEntity<Events> updateEvent(@PathVariable("eid") String eid, @RequestBody Events updatedEvent) {
        Optional<Events> optionalEvent = eventsService.getEvent(eid);
        if (optionalEvent.isPresent()) {
            Events event = optionalEvent.get();
            event.setEvent_name(updatedEvent.getEvent_name() != null ? updatedEvent.getEvent_name() : event.getEvent_name());
            event.setVenue(updatedEvent.getVenue() != null ? updatedEvent.getVenue() : event.getVenue());
            event.setAttending(updatedEvent.isAttending());
            event.setCreatedDate(updatedEvent.getCreatedDate());
            event.setNum_attending(updatedEvent.getNum_attending());
            Events savedEvent = eventsService.saveEvent(event);
            return ResponseEntity.ok(savedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping(value = "/events/{eid}")
    public ResponseEntity<String> deleteEvent(@PathVariable("eid") String eid){
        eventsService.delete(eid);
        String message = "Successfully deleted the event";
        return new ResponseEntity<String>(message, HttpStatus.OK);

    }


}
