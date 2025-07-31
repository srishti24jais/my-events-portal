package com.srishti.EventsPortal.EventsPortal_Backend.Exception;

public class EmailAlreadyInUseException extends RuntimeException {
    public EmailAlreadyInUseException(String message) {
        super(message);
    }
}
