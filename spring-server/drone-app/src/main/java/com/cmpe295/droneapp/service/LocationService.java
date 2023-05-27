package com.cmpe295.droneapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe295.droneapp.config.NotFoundException;
import com.cmpe295.droneapp.model.Location;
import com.cmpe295.droneapp.repository.LocationRepository;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    public Location getLocation(String droneId) {
        return locationRepository.findByDroneIdentifier(droneId)
                .orElseThrow(() -> new NotFoundException("Drone identifier " + droneId + "not found."));

    }
}
