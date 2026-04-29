package org.example.odm_backend.dtos.UserDTO;

import org.example.odm_backend.enums.TypePersonel;

import java.time.LocalDate;

public record UserRequestDTO(

        String firstName,
        String name,
        String email,

        String password, // utilisé uniquement à la création

        Long equipeId,
        TypePersonel personnelType,

        String grade,
        LocalDate dateNaissance

) {}