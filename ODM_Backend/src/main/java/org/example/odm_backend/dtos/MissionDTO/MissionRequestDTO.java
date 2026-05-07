package org.example.odm_backend.dtos.MissionDTO;

import org.example.odm_backend.enums.Etat;
import org.example.odm_backend.enums.TypeTransport;

import java.time.LocalDateTime;
import java.util.List;

public record MissionRequestDTO(


        Long motifId,
        Long userId,
        Long projetId,

        List<TypeTransport> typeTransport,
        String complementMotif,
        String lieu,
        LocalDateTime dateD,
        LocalDateTime dateR,
        Boolean sansFrais,
        Etat etat,
        Boolean billetAgence,
        String commentaireTransport,

        String adEntiteDemandante,
        String adAllerTrajet,
        String adAllerPays,
        String adRetourTrajet,
        String adRetourPays
) {}
