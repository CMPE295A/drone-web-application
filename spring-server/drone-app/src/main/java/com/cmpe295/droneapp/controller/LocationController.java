package com.cmpe295.droneapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe295.droneapp.model.Location;
import com.cmpe295.droneapp.service.LocationService;

@RestController
@RequestMapping("gps")
@CrossOrigin("*")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/{id}")
    public Location getLocation(@PathVariable String id) {
        return locationService.getLocation(id);
    }

}
