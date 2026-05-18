package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.MissionDTO.MissionFilterDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionRequestDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionResponseDTO;
import org.example.odm_backend.services.serviceInterface.MissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    @PostMapping
    public MissionResponseDTO create(@RequestBody MissionRequestDTO dto) {
        return missionService.addMission(dto);
    }

    @PutMapping("/{id}")
    public MissionResponseDTO update(@PathVariable Long id,
                                     @RequestBody MissionRequestDTO dto) {
        return missionService.updateMission(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        missionService.deleteMission(id);
    }

    @GetMapping("/{id}")
    public MissionResponseDTO getById(@PathVariable Long id) {
        return missionService.getById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SECRETARY')")
    @GetMapping("/all")
    public Page<MissionResponseDTO> getAllMissions(MissionFilterDTO filter, Pageable pageable) {
        return missionService.allMissions(filter, pageable);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my")
    public Page<MissionResponseDTO> getMyMissions(MissionFilterDTO filter, Pageable pageable) {
        return missionService.myMissions(filter, pageable);
    }
}