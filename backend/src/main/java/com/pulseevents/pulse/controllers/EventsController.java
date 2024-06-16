package com.pulseevents.pulse.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseevents.pulse.models.Events;
import com.pulseevents.pulse.services.EventsService;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @GetMapping(value = "/events")
    public List<Events> allEvents() {
        return eventsService.getAllEvents();
    }

    @PostMapping("/events/add_event")
    public ResponseEntity<Events> addEvent(@RequestParam("event") String eventJson,
                                           @RequestParam("file") MultipartFile file) throws IOException {
        Events event = new ObjectMapper().readValue(eventJson, Events.class);

        event.setStartDate(new Date(eventJson.startDate));
        event.setCreatedAt(new Date());
        if (!file.isEmpty()) {
            event.setEventImage(new Binary(file.getBytes()));
        }
        Events savedEvent = eventsService.addEvent(event);
        return new ResponseEntity<>(savedEvent, HttpStatus.CREATED);
    }

    /**
    * Get event with event id
     * @param eid;
    **/
    @GetMapping(value = "/events/{eid}")
    public ResponseEntity<Events> getSingleEvent(@PathVariable("eid") String eid) {
        Optional<Events> optionalEvent = eventsService.getEvent(eid);
        if (optionalEvent.isPresent()) {
            Events event = optionalEvent.get();
            return ResponseEntity.ok(event);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update event with event id, takes updated event from the request
     * @param eid;
     * @param updatedEvent;
     * */
    @PutMapping(value = "/events/{eid}")
    public ResponseEntity<Events> updateEvent(@PathVariable("eid") String eid, @RequestBody Events updatedEvent) {
        Optional<Events> optionalEvent = eventsService.getEvent(eid);
        if (optionalEvent.isPresent()) {
            Events event = optionalEvent.get();
            event.setEventName(updatedEvent.getEventName() != null ? updatedEvent.getEventName() : event.getEventName());
            event.setVenue(updatedEvent.getVenue() != null ? updatedEvent.getVenue() : event.getVenue());
            event.setInterestedCount(updatedEvent.getInterestedCount());
            event.setDescription(updatedEvent.getDescription() != null ? updatedEvent.getDescription() : event.getDescription());
            event.setStartDate(updatedEvent.getStartDate() != null ? updatedEvent.getStartDate() : event.getStartDate());
            event.setEndDate(updatedEvent.getEndDate() != null ? updatedEvent.getEndDate() : event.getEndDate());
            event.setCategories(updatedEvent.getCategories());
            event.setCreatedBy(updatedEvent.getCreatedBy() != null ? updatedEvent.getCreatedBy() : event.getCreatedBy());
            Events savedEvent = eventsService.saveEvent(event);
            return ResponseEntity.ok(savedEvent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete event with event id
     * @param eid;
     * */
    @DeleteMapping(value = "/events/{eid}")
    public ResponseEntity<String> deleteEvent(@PathVariable("eid") String eid){
        eventsService.delete(eid);
        String message = "Successfully deleted the event";
        return new ResponseEntity<String>(message, HttpStatus.OK);

    }


}
