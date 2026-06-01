package org.example.odm_backend.services.serviceImpl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.ProjetDTO.ProjetFilterDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.exceptions.ValidationException;
import org.example.odm_backend.mappers.ProjetMapper;
import org.example.odm_backend.repositories.EquipeRepository;
import org.example.odm_backend.repositories.ProjetRepository;
import org.example.odm_backend.security.config.SecurityUtils;
import org.example.odm_backend.services.serviceInterface.ProjetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjetServiceImpl implements ProjetService {

    private final ProjetRepository projetRepository;
    private final ProjetMapper projetMapper;
    private final EquipeRepository equipeRepository;
    private final SecurityUtils securityUtils;

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
        Projet projet = projetRepository.findByIdWithEquipes(id)
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


    @Override
    public List<ProjetResponseDTO> getProjectsByCurrentUserEquipe() {

        User user = securityUtils.getCurrentUserEntity();

        if (user.getEquipe() == null) {
            throw new ValidationException(
                    "Aucune équipe associée à l'utilisateur"
            );
        }

        List<Projet> projets = projetRepository.findByEquipes_Id(user.getEquipe().getId());

        return projets.stream()
                .map(projetMapper::toResponse)
                .toList();
    }
}