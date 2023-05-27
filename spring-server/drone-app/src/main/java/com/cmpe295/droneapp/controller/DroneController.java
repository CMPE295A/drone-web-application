package com.cmpe295.droneapp.controller;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe295.droneapp.model.Drone;
import com.cmpe295.droneapp.service.DroneService;

@RestController
@RequestMapping("drone")
@CrossOrigin("*")
public class DroneController {

    @Autowired
    private DroneService droneService;

    @PostMapping
    public Drone createDrone(@RequestBody Drone drone) {
        return droneService.createDrone(drone);
    }

    @GetMapping("/{id}")
    public Drone getDroneById(@PathVariable ObjectId id) {
        return droneService.getDroneById(id);
    }

}
