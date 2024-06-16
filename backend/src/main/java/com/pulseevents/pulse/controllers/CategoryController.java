package com.pulseevents.pulse.controllers;

import com.pulseevents.pulse.models.EventCategory;
import com.pulseevents.pulse.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @GetMapping(value = "/categories")
    public List<EventCategory> getAllCategories(){
        return categoryService.getAllCategories();
    }
}
