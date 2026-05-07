package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.ProjetDTO.ProjetFilterDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.mappers.ProjetMapper;
import org.example.odm_backend.repositories.EquipeRepository;
import org.example.odm_backend.repositories.ProjetRepository;
import org.example.odm_backend.services.serviceInterface.ProjetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjetServiceImpl implements ProjetService {

    private final ProjetRepository projetRepository;
    private final ProjetMapper projetMapper;
    private final EquipeRepository equipeRepository;

    @Override
    public ProjetResponseDTO addProjet(ProjetRequestDTO dto) {

        Projet projet = new Projet();
        projet.setNomProjet(dto.nomProjet());

        // 👉 conversion IDs -> Entities
        if (dto.equipeIds() != null && !dto.equipeIds().isEmpty()) {
            List<Equipe> equipes = equipeRepository.findAllById(dto.equipeIds());
            projet.setEquipes(equipes);
        }

        projet = projetRepository.save(projet);

        return projetMapper.toResponse(projet);
    }

    @Override
    public ProjetResponseDTO updateProjet(Long id, ProjetRequestDTO dto) {

        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Projet non trouvé"));

        if (dto.nomProjet() != null && !dto.nomProjet().isBlank()) {
            projet.setNomProjet(dto.nomProjet());
        }

        // 👉 conversion IDs -> Entities
        if (dto.equipeIds() != null) {
            List<Equipe> equipes = equipeRepository.findAllById(dto.equipeIds());
            projet.setEquipes(equipes);
        }

        projet = projetRepository.save(projet);

        return projetMapper.toResponse(projet);
    }

    @Override
    public void deleteProjet(Long id) {
        if (!projetRepository.existsById(id)) {
            throw new NotFoundException("Projet non trouvé");
        }
        projetRepository.deleteById(id);
    }

    @Override
    public ProjetResponseDTO getById(Long id) {
        Projet projet = projetRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Projet non trouvé"));

        return projetMapper.toResponse(projet);
    }

    @Override
    public Page<ProjetResponseDTO> search(ProjetFilterDTO filter, Pageable pageable) {
        return projetRepository.search(
                filter.nomProjet(),
                pageable
        ).map(projetMapper::toResponse);
    }
}