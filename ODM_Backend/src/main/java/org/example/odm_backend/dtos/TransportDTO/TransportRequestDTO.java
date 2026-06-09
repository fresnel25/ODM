package org.example.odm_backend.dtos.TransportDTO;

import org.example.odm_backend.enums.TypeTransport;

public record TransportRequestDTO(
        TypeTransport typeTransport,
        String adresseDepart,
        String paysDepart,
        Double latitudeDepart,
        Double longitudeDepart,
        String adresseArrivee,
        String paysArrivee,
        Double latitudeArrivee,
        Double longitudeArrivee,
        String imVehicule,
        Integer pfVehicule
) {}
