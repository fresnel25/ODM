package org.example.odm_backend.dtos.TransportDTO;

import org.example.odm_backend.enums.TypeTransport;

public record TransportRequestDTO(

        Long missionId,
        TypeTransport typeTransport,
        String imVehicule,
        Integer pfVehicule
) {}
