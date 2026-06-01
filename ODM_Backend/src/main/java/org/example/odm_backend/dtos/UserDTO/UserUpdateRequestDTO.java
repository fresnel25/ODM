package org.example.odm_backend.dtos.UserDTO;

import org.example.odm_backend.enums.Role;
import org.example.odm_backend.enums.TypePersonel;

import java.time.LocalDate;

public record UserUpdateRequestDTO(
        Long equipeId,
        TypePersonel personnelType,
        String grade,
        Boolean actif,
        Role role,
        Integer matricule,
        String loginCas
) {}