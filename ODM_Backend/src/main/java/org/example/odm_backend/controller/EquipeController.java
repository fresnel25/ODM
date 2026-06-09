package org.example.odm_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.EquipeDto.EquipeFilterDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.example.odm_backend.services.serviceInterface.EquipeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipes")
@RequiredArgsConstructor
public class EquipeController {

    private final EquipeService equipeService;

    // CREATE
    @PostMapping
    public ResponseEntity<ApiResponse<EquipeResponseDTO>> create(@Valid @RequestBody EquipeRequestDTO dto) throws Throwable {
        EquipeResponseDTO result = equipeService.addEquipe(dto);
        return ResponseEntity.status(201).body(
                new ApiResponse<>(
                        true,
                        "équipe créée avec succès",
                        result,
                        null
                )
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EquipeResponseDTO>> update(@PathVariable Long id, @RequestBody EquipeRequestDTO dto){
        EquipeResponseDTO result = equipeService.updateEquipe(id, dto);
        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "équipe mise à jour",
                        result,
                        null
                )
        );
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        equipeService.deleteEquipe(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "équipe supprimée",
                        null,
                        null
                )
        );

    }

    // GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EquipeResponseDTO>> getById(@PathVariable Long id) {
        EquipeResponseDTO result = equipeService.getById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "équipe récupérée",
                        result,
                        null
                )
        );
    }

    // GET ALL
    @GetMapping
    public ResponseEntity<ApiResponse<Page<EquipeResponseDTO>>> getEquipeFilter(@RequestParam(required = false) String search, Pageable pageable) {
        Page<EquipeResponseDTO> page = equipeService.search(search, pageable);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Liste des équipes",
                        page,
                        null
                )
        );
    }
}
