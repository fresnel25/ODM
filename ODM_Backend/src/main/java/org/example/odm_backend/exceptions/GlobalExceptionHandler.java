package org.example.odm_backend.exceptions;

import org.example.odm_backend.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Helper central : construit une réponse API standardisée
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

    // Erreurs de validation (@Valid DTO) : champs invalides dans la requête
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

    // Ressource non trouvée en base de données (id ou email inexistant)
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleNotFound(NotFoundException ex) {
        return build(
                HttpStatus.NOT_FOUND,
                ex.getMessage(),
                null
        );
    }

    // Erreur métier ou règle de gestion non respectée
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidate(ValidationException ex) {
        return build(
                HttpStatus.BAD_REQUEST,
                ex.getMessage(),
                null
        );
    }

    // Identifiants incorreca la base j'ai ceci : ts (login / password invalide)
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadCredentials(BadCredentialsException ex) {
        return build(
                HttpStatus.UNAUTHORIZED,
                "Email ou mot de passe incorrect",
                null
        );
    }

    // Tentative de création d’une ressource déjà existante (doublon)
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicate(DuplicateResourceException ex) {
        return build(
                HttpStatus.CONFLICT,
                ex.getMessage(),
                null
        );
    }

    // Accès refusé (user authentifié mais sans permissions suffisantes)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Void>> handleAccessDenied(AccessDeniedException ex) {
        return build(
                HttpStatus.FORBIDDEN,
                "Accès refusé",
                null
        );
    }

    // Erreur inattendue du serveur (fallback global)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {
        ex.printStackTrace();
        return build(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Erreur interne du serveur",
                null
        );
    }
}