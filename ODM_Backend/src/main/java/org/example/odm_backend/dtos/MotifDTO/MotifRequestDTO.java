package org.example.odm_backend.dtos.MotifDTO;

import jakarta.validation.constraints.NotBlank;

public record MotifRequestDTO(

        @NotBlank(message = "nom du motif obligatoire")
        String nomMotif,
        Boolean estDansListe
) {
}
