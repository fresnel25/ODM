package org.example.odm_backend.dtos.EquipeDto;

import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;

import java.util.List;

public record EquipeRequestDTO(
        String nomEquipe,
        List<Long> projetIds
) {}
