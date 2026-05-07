package org.example.odm_backend.controller;


import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.MissionDTO.MotifFilterDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifRequestDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifResponseDTO;
import org.example.odm_backend.services.serviceInterface.MotifService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/motifs")
@RequiredArgsConstructor
public class MotifController {

    private final MotifService motifService;

    // CREATE
    @PostMapping
    public MotifResponseDTO create(@RequestBody MotifRequestDTO dto){
        return motifService.addMotif(dto);
    }

    // UPDATE
    @PutMapping("/{id}")
    public MotifResponseDTO update(@PathVariable Long id, @RequestBody MotifRequestDTO dto){
        return motifService.updateMotif(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        motifService.deleteMotif(id);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public MotifResponseDTO getById(@PathVariable Long id) {
        return motifService.getById(id);
    }

    // GET ALL
    @GetMapping
    public Page<MotifResponseDTO> getMotifFilter(MotifFilterDTO filter, Pageable pageable) {
        return motifService.search(filter, pageable);
    }
}
