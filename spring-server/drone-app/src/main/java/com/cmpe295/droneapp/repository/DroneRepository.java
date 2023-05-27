package com.cmpe295.droneapp.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cmpe295.droneapp.model.Drone;

@Repository
public interface DroneRepository extends MongoRepository<Drone, ObjectId> {

}
