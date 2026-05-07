package org.example.odm_backend.dtos.UserDTO;

import org.example.odm_backend.enums.TypePersonel;

public record UserFilterDTO(
        String firstName,
        String name,
        String email,
        TypePersonel personnelType,
        Long equipeId,
        String grade
) {}
