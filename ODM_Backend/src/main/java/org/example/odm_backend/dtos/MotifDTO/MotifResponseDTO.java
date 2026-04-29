package org.example.odm_backend.dtos.MotifDTO;

public record MotifResponseDTO(
        Long id,
        String nomMotif,
        Boolean estDansListe
) {
}
