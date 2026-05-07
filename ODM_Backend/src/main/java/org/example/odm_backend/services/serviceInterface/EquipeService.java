package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.dtos.EquipeDto.EquipeFilterDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface EquipeService {

    EquipeResponseDTO  addEquipe(EquipeRequestDTO dto) throws Throwable;
    EquipeResponseDTO updateEquipe(Long id, EquipeRequestDTO dto);
    void deleteEquipe(Long id);
    EquipeResponseDTO getById(Long id);
    // List<EquipeResponseDTO> getAll();
    Page<EquipeResponseDTO> search(EquipeFilterDTO filter, Pageable pageable);
}
