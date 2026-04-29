package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProjetMapper {

    @Mapping(source = "equipes", target = "equipes")
    ProjetResponseDTO toResponse(Projet projet);

    default String map(Equipe equipe) {
        return equipe != null && equipe.getNomEquipe() != null
                ? equipe.getNomEquipe()
                : null;
    }

    @Mapping(target = "equipes", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Projet toEntity(ProjetRequestDTO dto);
}
