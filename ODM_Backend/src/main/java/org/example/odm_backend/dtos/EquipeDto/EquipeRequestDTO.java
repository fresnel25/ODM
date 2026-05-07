package org.example.odm_backend.dtos.EquipeDto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record EquipeRequestDTO(
        @NotBlank(message = "nom équipe obligatoire")
        String nomEquipe,
        List<Long> projetIds
) {}
