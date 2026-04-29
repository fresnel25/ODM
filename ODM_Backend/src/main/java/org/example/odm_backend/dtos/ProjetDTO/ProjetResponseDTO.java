package org.example.odm_backend.dtos.ProjetDTO;

import java.util.List;

public record ProjetResponseDTO(
        Long id,
        String nomProjet,
        List<String> equipes
) {
}
