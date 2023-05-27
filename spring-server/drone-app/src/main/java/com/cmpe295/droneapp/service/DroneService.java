package com.cmpe295.droneapp.service;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe295.droneapp.config.NotFoundException;
import com.cmpe295.droneapp.model.Drone;
import com.cmpe295.droneapp.repository.DroneRepository;

@Service
public class DroneService {
    @Autowired
    private DroneRepository droneRepository;

    // register drone
    public Drone createDrone(Drone drone) {
        return droneRepository.save(drone);
    }

    public Drone getDroneById(ObjectId id) {
        return droneRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Drone ID: " + id + "not found."));
    }

}
