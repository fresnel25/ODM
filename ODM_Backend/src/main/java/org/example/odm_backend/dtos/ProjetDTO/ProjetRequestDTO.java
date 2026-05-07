package org.example.odm_backend.dtos.ProjetDTO;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record ProjetRequestDTO(
        @NotBlank(message = "nom du projet oubligatoire")
        String nomProjet,
        List<Long> equipeIds
) {
}
