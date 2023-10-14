package com.pulseevents.pulse.model;

import jakarta.annotation.Generated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Arrays;
import java.util.Date;

@Document(collection = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String  eid;
    private String event_name;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createdDate = new Date();
    private String venue;
    private boolean attending;
    private int num_attending;

    private Binary eventImage;

    public Binary getEventImage() {
        return eventImage;
    }

    public void setEventImage(Binary eventImage) {
        this.eventImage = eventImage;
    }

    public Events() {
        this.attending = false;
    }

    public Events(String eid, String event_name, Date createdDate, String venue, boolean attending, int num_attending, Binary eventImage) {
        this.eid = eid;
        this.event_name = event_name;
        this.createdDate = createdDate;
        this.venue = venue;
        this.attending = attending;
        this.num_attending = num_attending;
        this.eventImage = eventImage;
    }


    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
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
        return attending;
    }

    public void setAttending(boolean attending) {
        this.attending = attending;
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
                ", createdDate=" + createdDate +
                ", venue='" + venue + '\'' +
                ", attending=" + attending +
                ", num_attending=" + num_attending +
                ", eventImage=" + eventImage +
                '}';
    }
}
