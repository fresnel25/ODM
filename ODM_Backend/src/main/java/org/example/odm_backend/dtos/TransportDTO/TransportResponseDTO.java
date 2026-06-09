package org.example.odm_backend.dtos.TransportDTO;

import org.example.odm_backend.enums.TypeTransport;

public record TransportResponseDTO(

        Long id,
        TypeTransport typeTransport,
        String adresseDepart,
        String paysDepart,
        String adresseArrivee,
        String paysArrivee,
        String imVehicule,
        Integer pfVehicule
) {}
