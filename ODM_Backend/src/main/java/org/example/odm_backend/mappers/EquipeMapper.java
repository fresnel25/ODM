package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
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

    // Conversion Projet → String
    default List<String> map(List<Projet> projets) {
        if (projets == null) return null;

        return projets.stream()
                .map(Projet::getNomProjet)
                .toList();
    }

    // Request → Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projets", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Equipe toEntity(EquipeRequestDTO dto);
}