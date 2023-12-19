package com.pulseevents.pulse.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class Interested {

    @Id
    private String userId;


    public Interested(String userId) {
        this.userId = userId;

    }

    public Interested() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    @Override
    public String toString() {
        return "Interested{" +
                "userId='" + userId + '\'' +
                '}';
    }
}
