package org.example.odm_backend.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private List<FieldError> errors;

    @AllArgsConstructor
    @Data
    @NoArgsConstructor
    public static class FieldError {
        private String field;
        private String message;
    }
}