package org.example.odm_backend.dtos.UserDTO;

public record CasAuthRequestDTO(
        String loginCas,
        String email,
        String firstName,
        String lastName
) {}
