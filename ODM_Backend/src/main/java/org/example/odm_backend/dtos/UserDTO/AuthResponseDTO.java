package org.example.odm_backend.dtos.UserDTO;

public record AuthResponseDTO(
        String token,
        Long userId,
        String email,
        String role
) {}