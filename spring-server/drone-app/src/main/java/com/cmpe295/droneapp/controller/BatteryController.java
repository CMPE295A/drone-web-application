package com.cmpe295.droneapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe295.droneapp.model.Battery;
import com.cmpe295.droneapp.service.BatteryService;

@RestController
@RequestMapping("battery")
@CrossOrigin("*")
public class BatteryController {

    @Autowired
    private BatteryService batteryService;

    @GetMapping("/{id}")
    public Battery getBattery(@PathVariable String id) {
        // public ResponseEntity<Battery> getBattery(@PathVariable String id) {
        return batteryService.getBattery(id);
        // return new ResponseEntity<Battery>(batteryService.getBattery(id),
        // HttpStatus.OK);

    }

}
