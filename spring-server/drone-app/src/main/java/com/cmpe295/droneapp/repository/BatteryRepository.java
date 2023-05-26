package com.cmpe295.droneapp.repository;

import java.util.Optional;

// import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cmpe295.droneapp.model.Battery;

@Repository
public interface BatteryRepository extends MongoRepository<Battery, String> {

    // Optional<Battery> findById(String batteryId);
    Optional<Battery> findByDroneIdentifier(String droneIdentifier);


}
