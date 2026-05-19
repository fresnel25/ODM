package org.example.odm_backend.dtos.UserDTO;

public record ClassicAuthResponseDTO(
        String token,
        Long userId,
        String email,
        String role,
        Boolean actif
) {}