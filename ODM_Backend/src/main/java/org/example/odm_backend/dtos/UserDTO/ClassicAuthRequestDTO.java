package org.example.odm_backend.dtos.UserDTO;

public record ClassicAuthRequestDTO(
        String email,
        String password
) {}