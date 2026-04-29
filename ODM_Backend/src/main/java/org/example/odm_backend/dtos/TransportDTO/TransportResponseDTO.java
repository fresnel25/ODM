package org.example.odm_backend.dtos.TransportDTO;

import org.example.odm_backend.enums.TypeTransport;

public record TransportResponseDTO(

        Long id,
        String missionLieu,
        TypeTransport typeTransport,
        String imVehicule,
        Integer pfVehicule
) {}
