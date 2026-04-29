package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.EquipeDto.EquipeRequestDTO;
import org.example.odm_backend.dtos.EquipeDto.EquipeResponseDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EquipeMapper {

    // Entity → Response
    @Mapping(source = "projets", target = "projets")
    EquipeResponseDTO toResponse(Equipe equipe);

    // Conversion Projet → String
    default String map(Projet projet) {
        return projet != null ? projet.getNomProjet() : null;
    }

    // Request → Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "projets", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Equipe toEntity(EquipeRequestDTO dto);
}