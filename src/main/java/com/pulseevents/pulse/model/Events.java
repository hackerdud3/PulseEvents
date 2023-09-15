package com.pulseevents.pulse.model;

import jakarta.annotation.Generated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String  eid;
    private String event_name;
    private String venue;
    private boolean isAttending;
    private int num_attending;

    public Events() {
    }

    public Events(String eid, String event_name, String venue, boolean isAttending, int num_attending) {
        this.eid = eid;
        this.event_name = event_name;
        this.venue = venue;
        this.isAttending = isAttending;
        this.num_attending = num_attending;
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getEvent_name() {
        return event_name;
    }

    public void setEvent_name(String event_name) {
        this.event_name = event_name;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public boolean isAttending() {
        return isAttending;
    }

    public void setAttending(boolean attending) {
        isAttending = attending;
    }

    public int getNum_attending() {
        return num_attending;
    }

    public void setNum_attending(int num_attending) {
        this.num_attending = num_attending;
    }

    @Override
    public String toString() {
        return "Events{" +
                "eid='" + eid + '\'' +
                ", event_name='" + event_name + '\'' +
                ", venue='" + venue + '\'' +
                ", isAttending=" + isAttending +
                ", num_attending=" + num_attending +
                '}';
    }
}
