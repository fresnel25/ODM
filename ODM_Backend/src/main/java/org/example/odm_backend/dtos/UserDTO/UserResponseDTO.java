package org.example.odm_backend.dtos.UserDTO;

import org.example.odm_backend.enums.TypePersonel;

import java.time.LocalDate;

public record UserResponseDTO(

        Long id,
        String firstName,
        String name,
        String email,

        String equipe,
        TypePersonel personnelType,

        String grade,
        LocalDate dateNaissance,

        Boolean actif,
        String role

) {}
