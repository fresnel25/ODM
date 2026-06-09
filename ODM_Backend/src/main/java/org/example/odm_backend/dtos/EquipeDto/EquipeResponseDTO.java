package org.example.odm_backend.dtos.EquipeDto;

import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetSimpleDTO;

import java.util.List;

public record EquipeResponseDTO(
        Long id,
        String nomEquipe,
        List<ProjetSimpleDTO> projets
) {}