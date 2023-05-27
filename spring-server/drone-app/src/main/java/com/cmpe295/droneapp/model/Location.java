package com.cmpe295.droneapp.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "gps")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Location {
    @Id
    private ObjectId id;
    private String droneIdentifier;
    private double latitude;
    private double longitude;
    private double altitude;
    private double speed;
}
