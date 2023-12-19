package com.pulseevents.pulse.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pulseevents.pulse.model.Events;
import com.pulseevents.pulse.model.Interested;
import com.pulseevents.pulse.model.User;
import com.pulseevents.pulse.security.jwt.JwtUtils;
import com.pulseevents.pulse.service.EventsService;
import com.pulseevents.pulse.service.UserDetailsImpl;
import com.pulseevents.pulse.service.UserDetailsServiceImpl;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class EventsController {

    @Autowired
    private EventsService eventsService;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;



    @Autowired
    JwtUtils jwtUtils;


    @GetMapping(value = "/events")
    public List<Events> allEvents() {
        return eventsService.getAllEvents();
    }

    @GetMapping(value = "/myevents/{uid}")
    public List<Events> myEvents(@PathVariable("uid") String userId) {
    return eventsService.getMyEvents(userId);
    }


    @PostMapping(value = "/addevent")
    public ResponseEntity<Events> addEvent(@RequestParam("eventImage") MultipartFile file, @RequestParam("eventData") String eventData, @RequestParam("token") String token) throws IOException {
        Events events = new ObjectMapper().readValue(eventData, Events.class);
        byte[] eventImageBytes = file.getBytes();
        events.setEventImage(eventImageBytes);
        String userName = jwtUtils.getUsernameFromJwtToken(token);
        UserDetailsImpl user = (UserDetailsImpl) userDetailsService.loadUserByUsername(userName);
        String userId = user.getId();
        events.setUserId(userId);


        Interested interested = new Interested(userId);
        events.getAttending().add(interested);
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
            event.setCreatedDate(updatedEvent.getCreatedDate());
            event.setNum_attending(updatedEvent.getNum_attending());
            event.setAttending(updatedEvent.getAttending());
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
