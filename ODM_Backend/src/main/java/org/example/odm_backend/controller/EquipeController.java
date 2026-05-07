package org.example.odm_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.EquipeDto.EquipeFilterDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.example.odm_backend.services.serviceInterface.EquipeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipes")
@RequiredArgsConstructor
public class EquipeController {

    private final EquipeService equipeService;

    // CREATE
    @PostMapping
    public EquipeResponseDTO create(@Valid @RequestBody EquipeRequestDTO dto) throws Throwable {
        return equipeService.addEquipe(dto);
    }

    // UPDATE
    @PutMapping("/{id}")
    public EquipeResponseDTO update(@PathVariable Long id, @RequestBody EquipeRequestDTO dto){
        return equipeService.updateEquipe(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        equipeService.deleteEquipe(id);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public EquipeResponseDTO getById(@PathVariable Long id) {
        return equipeService.getById(id);
    }

    // GET ALL
    @GetMapping
    public Page<EquipeResponseDTO> getEquipeFilter(EquipeFilterDTO filter, Pageable pageable) {
        return equipeService.search(filter, pageable);
    }
}
