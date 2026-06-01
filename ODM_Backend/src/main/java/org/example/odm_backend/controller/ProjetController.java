package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.ProjetDTO.ProjetFilterDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.example.odm_backend.services.serviceInterface.ProjetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projets")
@RequiredArgsConstructor
public class ProjetController {

    private final ProjetService projetService;

    // CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<ProjetResponseDTO>> create(@RequestBody ProjetRequestDTO dto) {
        ProjetResponseDTO result = projetService.addProjet(dto);
        return ResponseEntity.status(201).body(
                new ApiResponse<>(
                        true,
                        "Projet créé avec succès",
                        result,
                        null
                )
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjetResponseDTO>> update(@PathVariable Long id, @RequestBody ProjetRequestDTO dto) {
        ProjetResponseDTO result = projetService.updateProjet(id, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Projet mis à jour",
                        result,
                        null
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        projetService.deleteProjet(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Projet Supprimé",
                        null,
                        null
                )
        );
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjetResponseDTO>> getById(@PathVariable Long id) {
        ProjetResponseDTO result = projetService.getById(id);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Projet Récupéré",
                        result,
                        null
                )
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProjetResponseDTO>>> getProjetFDilter(ProjetFilterDTO filter, Pageable pageable) {
        Page<ProjetResponseDTO> page = projetService.search(filter, pageable);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Liste des Projets",
                        page,
                        null
                )
        );
    }

    @GetMapping("/equipe")
    public ResponseEntity<ApiResponse<List<ProjetResponseDTO>>> getMyEquipeProjects() {

        List<ProjetResponseDTO> projets = projetService.getProjectsByCurrentUserEquipe();

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Liste des projets de votre équipe",
                        projets,
                        null
                )
        );
    }
}