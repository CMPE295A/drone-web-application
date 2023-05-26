package com.cmpe295.droneapp.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.*;

@Document(collection = "batteries")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Battery {

    @Id
    private ObjectId id;
    private String droneIdentifier;
    private int batteryLevel;

}
