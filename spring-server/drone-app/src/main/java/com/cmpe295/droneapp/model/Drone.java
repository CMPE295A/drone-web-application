package com.cmpe295.droneapp.model;

import java.time.LocalDateTime;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Document(collection = "drone")
@AllArgsConstructor
@Data
public class Drone {
    @Id
    private ObjectId id;
    private String droneIdentifier;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Drone() {
        this.status = Status.IDLE;
    }

    public enum Status {
        IDLE, FLYING
    }

}
