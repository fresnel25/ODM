package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.dtos.MissionDTO.MotifFilterDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifRequestDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface MotifService {

    MotifResponseDTO addMotif(MotifRequestDTO dto);
    MotifResponseDTO updateMotif(Long id, MotifRequestDTO dto);
    void deleteMotif(Long id);
    MotifResponseDTO getById(Long id);
    // List<MotifResponseDTO> getAll();
    Page<MotifResponseDTO> search(MotifFilterDTO filter, Pageable pageable);

}
