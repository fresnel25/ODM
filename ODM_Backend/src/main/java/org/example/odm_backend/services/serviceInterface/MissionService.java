package org.example.odm_backend.services.serviceInterface;

import org.example.odm_backend.dtos.MissionDTO.MissionFilterDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionRequestDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface MissionService {
    MissionResponseDTO addMission(MissionRequestDTO dto);
    MissionResponseDTO updateMission(Long id, MissionRequestDTO dto);
    void deleteMission(Long id);
    MissionResponseDTO getById(Long id);
   // List<MissionResponseDTO> getAll();
   Page<MissionResponseDTO> allMissions(MissionFilterDTO filter, Pageable pageable);
   Page<MissionResponseDTO> myMissions(MissionFilterDTO filter, Pageable pageable);
}
