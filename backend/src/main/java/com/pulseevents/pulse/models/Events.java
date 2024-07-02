package com.pulseevents.pulse.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Document(collection = "events")
public class Events {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String  eid;
    private String eventName;
    private String description;
    private Object address;
    private Date startDate;
    private Date endDate;
    private String createdBy;
    private Binary eventImage;
    private int interestedCount;
    @CreatedDate
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date createdAt;
    private List<String> categories;

    public Events(String eid, String eventName, String description, Object address, Date startDate, Date endDate, String createdBy, Binary eventImage, int interestedCount, Date createdAt, List<String> categories) {
        this.eid = eid;
        this.eventName = eventName;
        this.description = description;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdBy = createdBy;
        this.eventImage = eventImage;
        this.interestedCount = interestedCount;
        this.createdAt = createdAt;
        this.categories = categories;
    }

    public Events() {
    }

    public String getEid() {
        return eid;
    }

    public void setEid(String eid) {
        this.eid = eid;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Object getAddress() {
        return address;
    }

    public void setAddress(Object address) {
        this.address = address;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Binary getEventImage() {
        return eventImage;
    }

    public void setEventImage(Binary eventImage) {
        this.eventImage = eventImage;
    }

    public int getInterestedCount() {
        return interestedCount;
    }

    public void setInterestedCount(int interestedCount) {
        this.interestedCount = interestedCount;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public List<String> getCategories() {
        return categories;
    }

    public void setCategories(List<String> categories) {
        this.categories = categories;
    }
}
