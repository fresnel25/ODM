package org.example.odm_backend.dtos.MissionDTO;

import org.example.odm_backend.enums.Etat;
import org.example.odm_backend.enums.TypeTransport;

import java.time.LocalDateTime;

public record MissionFilterDTO(

        Long motifId,
        Long userId,
        Long projetId,

        Etat etat,

        Boolean sansFrais,
        Boolean billetAgence,

        String lieu,

        LocalDateTime dateFrom,
        LocalDateTime dateTo
) {}
