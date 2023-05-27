package com.cmpe295.droneapp.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cmpe295.droneapp.model.Location;

@Repository
public interface LocationRepository extends MongoRepository<Location, String> {

    Optional<Location> findByDroneIdentifier(String droneIdentifier);

}
