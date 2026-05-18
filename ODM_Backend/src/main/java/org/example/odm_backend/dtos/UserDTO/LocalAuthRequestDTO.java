package org.example.odm_backend.dtos.UserDTO;

public record LocalAuthRequestDTO(
        String email,
        String password
) {}