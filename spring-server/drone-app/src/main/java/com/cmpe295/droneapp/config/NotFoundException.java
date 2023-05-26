package com.cmpe295.droneapp.config;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }

    //try catch
    public NotFoundException(String message, Throwable cause) {
    super(message, cause);
    }
}
