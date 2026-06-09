package org.example.odm_backend.dtos.ProjetDTO;

import org.example.odm_backend.dtos.EquipeDto.EquipeSimpleDTO;

import java.util.List;

public record ProjetResponseDTO(
        Long id,
        String nomProjet,
        List<EquipeSimpleDTO> equipes
) {
}
