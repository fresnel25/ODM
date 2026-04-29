package org.example.odm_backend.dtos.MissionDTO;

import org.example.odm_backend.dtos.TransportDTO.TransportRequestDTO;
import org.example.odm_backend.enums.Etat;
import org.example.odm_backend.enums.TypeTransport;

import java.time.LocalDateTime;
import java.util.List;

public record MissionResponseDTO(

        Long id,
        List<String> transports,
        String motif,
        String user,
        String projet,

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
