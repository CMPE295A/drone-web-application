package com.cmpe295.droneapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cmpe295.droneapp.config.NotFoundException;
import com.cmpe295.droneapp.model.Battery;
import com.cmpe295.droneapp.repository.BatteryRepository;

@Service
public class BatteryService {

    @Autowired
    private BatteryRepository batteryRepository;

    public Battery getBattery(String droneId) {
        return batteryRepository.findByDroneIdentifier(droneId)
                .orElseThrow(() -> new NotFoundException("Drone identifier " + droneId + "not found."));

    }

}
