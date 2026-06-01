package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.MissionDTO.*;
import org.example.odm_backend.enums.Etat;
import org.example.odm_backend.services.serviceInterface.MissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    @PostMapping
    public ResponseEntity<ApiResponse<MissionResponseDTO>> create(@RequestBody MissionRequestDTO dto) {
        MissionResponseDTO result = missionService.addMission(dto);
        return ResponseEntity.status(201).body(
                new ApiResponse<>(
                        true,
                        "Mission créée avec succès",
                        result,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MissionResponseDTO>> update(@PathVariable Long id, @RequestBody MissionRequestDTO dto) {
        MissionResponseDTO result =  missionService.updateMission(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Mission mise à jour",
                        result,
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        missionService.deleteMission(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Mission Supprimée",
                        null,
                        null
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MissionResponseDTO>> getById(@PathVariable Long id) {
        MissionResponseDTO result = missionService.getById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Mission Récupérée",
                        result,
                        null
                )
        );
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<Page<MissionResponseDTO>>> getAllMissions(MissionFilterDTO filter, Pageable pageable) {
        Page<MissionResponseDTO> page = missionService.allMissions(filter, pageable);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Liste des Missions",
                        page,
                        null
                )
        );
    }

    @GetMapping("/myMissions")
    public ResponseEntity<ApiResponse<Page<MissionResponseDTO>>> getMyMissions(MissionFilterDTO filter, Pageable pageable) {
        Page<MissionResponseDTO> page = missionService.myMissions(filter, pageable);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Mes Missions ",
                        page,
                        null
                )
        );
    }

    @PutMapping("/{id}/validate")
    public ResponseEntity<ApiResponse<MissionResponseDTO>> validateMission(@PathVariable Long id, @RequestBody MissionValidationDTO dto) {

        MissionResponseDTO response =
                missionService.validateMission(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Mission Validée",
                        response,
                        null
                )
        );
    }

    @PutMapping("/{id}/process")
    public ResponseEntity<ApiResponse<MissionResponseDTO>> processMission(@PathVariable Long id, @RequestBody MissionProcessDTO dto) {

        MissionResponseDTO response =
                missionService.processMission(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Mission traitée",
                        response,
                        null
                )
        );
    }
}