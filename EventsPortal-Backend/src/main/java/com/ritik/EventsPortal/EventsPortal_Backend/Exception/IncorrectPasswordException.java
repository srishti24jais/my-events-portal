package com.ritik.EventsPortal.EventsPortal_Backend.Exception;

public class IncorrectPasswordException extends RuntimeException {
    public IncorrectPasswordException(String message) {
        super(message);
    }
}
