package org.example.odm_backend.exceptions;

import org.example.odm_backend.enums.ErrorCode;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
