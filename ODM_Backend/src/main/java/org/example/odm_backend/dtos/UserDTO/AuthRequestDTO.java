package org.example.odm_backend.dtos.UserDTO;

public record AuthRequestDTO(
        String email,
        String password
) {}