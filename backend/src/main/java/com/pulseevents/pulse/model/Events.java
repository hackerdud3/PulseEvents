package com.pulseevents.pulse.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


@Document(collection = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String  eid;
    private String event_name;

    private String userId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createdDate = new Date();


    private String venue;

    private List<Interested> attending;
    private int num_attending;

    private String month;

    private String date;

    private String day;

    private String time;

    private byte[] eventImage;

    public Events(String eid, String event_name, String userId, Date createdDate, String venue, List<Interested> attending, int num_attending, String month, String date, String day, String time, byte[] eventImage) {
        this.eid = eid;
        this.event_name = event_name;
        this.userId = userId;
        this.createdDate = createdDate;
        this.venue = venue;
        this.attending = attending;
        this.num_attending = num_attending;
        this.month = month;
        this.date = date;
        this.day = day;
        this.time = time;
        this.eventImage = eventImage;
    }

    @Override
    public String toString() {
        return "Events{" +
                "eid='" + eid + '\'' +
                ", event_name='" + event_name + '\'' +
                ", userId='" + userId + '\'' +
                ", createdDate=" + createdDate +
                ", venue='" + venue + '\'' +
                ", attending=" + attending +
                ", num_attending=" + num_attending +
                ", month='" + month + '\'' +
                ", date='" + date + '\'' +
                ", day='" + day + '\'' +
                ", time='" + time + '\'' +
                ", eventImage=" + Arrays.toString(eventImage) +
                '}';
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Events() {
        this.attending = new ArrayList<>();
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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public List<Interested> getAttending() {
        return attending;
    }

    public void setAttending(List<Interested> attending) {
        this.attending = attending;
    }

    public int getNum_attending() {
        return num_attending;
    }

    public void setNum_attending(int num_attending) {
        this.num_attending = num_attending;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public byte[] getEventImage() {
        return eventImage;
    }

    public void setEventImage(byte[] eventImage) {
        this.eventImage = eventImage;
    }
}
