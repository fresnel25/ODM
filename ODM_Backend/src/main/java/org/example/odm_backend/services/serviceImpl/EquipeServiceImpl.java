package org.example.odm_backend.services.serviceImpl;

import org.example.odm_backend.dtos.EquipeDto.EquipeFilterDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.example.odm_backend.exceptions.DuplicateResourceException;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.mappers.EquipeMapper;
import org.example.odm_backend.repositories.EquipeRepository;
import org.example.odm_backend.repositories.ProjetRepository;
import org.example.odm_backend.services.serviceInterface.EquipeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipeServiceImpl implements EquipeService {

    private final EquipeRepository equipeRepository;
    private final ProjetRepository projetRepository;
    private final EquipeMapper equipeMapper;

    public EquipeServiceImpl(
            EquipeRepository equipeRepository,
            ProjetRepository projetRepository,
            EquipeMapper equipeMapper
    ) {
        this.equipeRepository = equipeRepository;
        this.projetRepository = projetRepository;
        this.equipeMapper = equipeMapper;
    }

    @Override
    public EquipeResponseDTO addEquipe(EquipeRequestDTO dto) {

        if (equipeRepository.existsByNomEquipe(dto.nomEquipe())) {
            throw new DuplicateResourceException("Cette équipe existe déjà");
        }

        Equipe equipe = equipeMapper.toEntity(dto);

        if (dto.projetIds() != null && !dto.projetIds().isEmpty()) {
            List<Projet> projets = projetRepository.findAllById(dto.projetIds());

            if (projets.size() != dto.projetIds().size()) {
                throw new NotFoundException("Un ou plusieurs projets sont introuvables");
            }

            equipe.setProjets(projets);
        }

        equipe = equipeRepository.save(equipe);

        return equipeMapper.toResponse(equipe);
    }

    @Override
    public EquipeResponseDTO updateEquipe(Long id, EquipeRequestDTO dto) {

        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Equipe non trouvée"));

        if (dto.nomEquipe() != null &&
                !dto.nomEquipe().isBlank() &&
                !dto.nomEquipe().equals(equipe.getNomEquipe())) {

            if (equipeRepository.existsByNomEquipe(dto.nomEquipe())) {
                throw new DuplicateResourceException("Cette équipe existe déjà");
            }

            equipe.setNomEquipe(dto.nomEquipe());
        }

        if (dto.projetIds() != null) {
            List<Projet> projets = projetRepository.findAllById(dto.projetIds());
            equipe.setProjets(projets);
        }

        equipeRepository.save(equipe);

        return equipeMapper.toResponse(equipe);
    }

    @Override
    public void deleteEquipe(Long id) {

        if (!equipeRepository.existsById(id)) {
            throw new NotFoundException("Equipe non trouvée");
        }

        equipeRepository.deleteById(id);
    }

    @Override
    public EquipeResponseDTO getById(Long id) {

        Equipe equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Equipe non trouvée"));

        return equipeMapper.toResponse(equipe);
    }

    @Override
    public Page<EquipeResponseDTO> search(EquipeFilterDTO filter, Pageable pageable) {
        return equipeRepository.search(
                filter.nomEquipe(),
                pageable
        ).map(equipeMapper::toResponse);
    }
}