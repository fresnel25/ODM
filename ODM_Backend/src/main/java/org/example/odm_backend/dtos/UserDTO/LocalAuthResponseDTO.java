package org.example.odm_backend.dtos.UserDTO;

public record LocalAuthResponseDTO(
        String token,
        Long userId,
        String email,
        String role,
        Boolean actif
) {}