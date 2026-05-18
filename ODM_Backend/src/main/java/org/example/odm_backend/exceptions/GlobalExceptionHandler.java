package org.example.odm_backend.exceptions;

import org.example.odm_backend.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Helper central
    private <T> ResponseEntity<ApiResponse<T>> build(
            HttpStatus status,
            String message,
            List<ApiResponse.FieldError> errors
    ) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(false);
        response.setMessage(message);
        response.setErrors(errors);

        return ResponseEntity.status(status).body(response);
    }

    // Validation des DTO (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex) {

        List<ApiResponse.FieldError> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> new ApiResponse.FieldError(
                        err.getField(),
                        err.getDefaultMessage()
                ))
                .toList();

        return build(
                HttpStatus.BAD_REQUEST,
                "Erreur de validation",
                errors
        );
    }

    // Ressource non trouvée
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(NotFoundException ex) {

        return build(
                HttpStatus.NOT_FOUND,
                ex.getMessage(),
                null
        );
    }

    // Validation incorrecte
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidate(ValidationException ex) {

        return build(
                HttpStatus.BAD_REQUEST,
                ex.getMessage(),
                null
        );
    }


    // Conflit (doublon, etc.)
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicate(DuplicateResourceException ex) {

        return build(
                HttpStatus.CONFLICT,
                ex.getMessage(),
                null
        );
    }

    // Erreur générique (fallback)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {

        return build(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Erreur interne du serveur",
                null
        );
    }
}