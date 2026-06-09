package org.example.odm_backend.dtos.MissionDTO;

import org.example.odm_backend.enums.Etat;

public record MissionValidationDTO(
        Etat etat
) {
}
