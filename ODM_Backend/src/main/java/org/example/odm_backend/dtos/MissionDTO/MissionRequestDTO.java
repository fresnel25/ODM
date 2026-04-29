package org.example.odm_backend.dtos.MissionDTO;

import org.example.odm_backend.dtos.TransportDTO.TransportRequestDTO;
import org.example.odm_backend.enums.Etat;

import java.time.LocalDateTime;
import java.util.List;

public record MissionRequestDTO(

        List<Long> transportIds,
        Long motifId,
        Long userId,
        Long projetId,

        String complementMotif,
        String lieu,
        LocalDateTime dateD,
        LocalDateTime dateR,
        Boolean sansFrais,
        Etat etat,
        Integer nbNuite,
        Integer nbRepas,
        Boolean billetAgence,
        String commentaireTransport,

        String adEntiteDemandante,
        String adAllerTrajet,
        String adAllerPays,
        String adRetourTrajet,
        String adRetourPays
) {}
