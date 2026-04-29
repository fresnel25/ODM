package org.example.odm_backend.dtos.ProjetDTO;

import java.util.List;

public record ProjetRequestDTO(
        String nomProjet,
        List<Long> equipeIds
) {
}
