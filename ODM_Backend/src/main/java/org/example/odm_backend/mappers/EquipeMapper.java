package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetSimpleDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EquipeMapper {

    // Entity → Response
    @Mapping(source = "projets", target = "projets")
    EquipeResponseDTO toResponse(Equipe equipe);

    // Projet -> ProjetSimpleDTO
    default List<ProjetSimpleDTO> map(List<Projet> projets) {
        if (projets == null) {
            return List.of();
        }
        return projets.stream()
                .map(projet -> new ProjetSimpleDTO(
                        projet.getId(),
                        projet.getNomProjet()
                ))
                .toList();
    }

    // Request → Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projets", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Equipe toEntity(EquipeRequestDTO dto);
}