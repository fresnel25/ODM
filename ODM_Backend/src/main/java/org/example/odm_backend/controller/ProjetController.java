package org.example.odm_backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.ProjetDTO.ProjetFilterDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.example.odm_backend.services.serviceInterface.ProjetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projets")
@RequiredArgsConstructor
public class ProjetController {

    private final ProjetService projetService;

    // CREATE
    @PostMapping
    public ProjetResponseDTO create(@RequestBody ProjetRequestDTO dto) {
        return projetService.addProjet(dto);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ProjetResponseDTO update(@PathVariable Long id,
                                    @RequestBody ProjetRequestDTO dto) {
        return projetService.updateProjet(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        projetService.deleteProjet(id);
    }

    // GET BY ID
    @GetMapping("/{id}")
    public ProjetResponseDTO getById(@PathVariable Long id) {
        return projetService.getById(id);
    }

    // GET ALL
    @GetMapping
    public Page<ProjetResponseDTO> getProjetFDilter(ProjetFilterDTO filter, Pageable pageable) {
        return projetService.search(filter, pageable);
    }
}