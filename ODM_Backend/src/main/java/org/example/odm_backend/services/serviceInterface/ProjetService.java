package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.dtos.ProjetDTO.ProjetFilterDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProjetService {
    ProjetResponseDTO addProjet(ProjetRequestDTO dto);
    ProjetResponseDTO updateProjet(Long id, ProjetRequestDTO dto);
    void deleteProjet(Long id);
    ProjetResponseDTO getById(Long id);
    //List<ProjetResponseDTO> getAll();
    Page<ProjetResponseDTO> search(ProjetFilterDTO filter, Pageable pageable);
}
