package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;

import java.util.List;

public interface EquipeService {

    EquipeResponseDTO  addEquipe(EquipeRequestDTO dto);
    EquipeResponseDTO updateEquipe(Long id, EquipeRequestDTO dto);
    void deleteEquipe(Long id);

    EquipeResponseDTO getById(Long id);
    List<EquipeResponseDTO> getAll();
}
