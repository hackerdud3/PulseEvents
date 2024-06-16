package com.pulseevents.pulse.services;

import com.pulseevents.pulse.models.EventCategory;
import com.pulseevents.pulse.repository.EventCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private EventCategoryRepo categoryRepo;

    public List<EventCategory> getAllCategories(){
        return categoryRepo.findAll();
    }
}
