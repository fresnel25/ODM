package org.example.odm_backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.odm_backend.common.ApiResponse;
import org.example.odm_backend.dtos.MissionDTO.MotifFilterDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifRequestDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifResponseDTO;
import org.example.odm_backend.services.serviceInterface.MotifService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motifs")
@RequiredArgsConstructor
public class MotifController {

    private final MotifService motifService;

    @PostMapping
    public ResponseEntity<ApiResponse<MotifResponseDTO>> create(@RequestBody MotifRequestDTO dto) {

        MotifResponseDTO result = motifService.addMotif(dto);

        return ResponseEntity.status(201).body(
                new ApiResponse<>(
                        true,
                        "Motif créé avec succès",
                        result,
                        null
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MotifResponseDTO>> update( @PathVariable Long id, @RequestBody MotifRequestDTO dto) {

        MotifResponseDTO result = motifService.updateMotif(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Motif mis à jour",
                        result,
                        null
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {

        motifService.deleteMotif(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Motif supprimé",
                        null,
                        null
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MotifResponseDTO>> getById(@PathVariable Long id) {

        MotifResponseDTO result = motifService.getById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Motif récupéré",
                        result,
                        null
                )
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<MotifResponseDTO>>> getAll( @RequestParam(required = false) String search, Pageable pageable
    ) {

        Page<MotifResponseDTO> page = motifService.search(search, pageable);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Liste des motifs",
                        page,
                        null
                )
        );
    }
}
