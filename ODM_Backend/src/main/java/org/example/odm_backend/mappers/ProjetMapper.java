package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.EquipeDto.EquipeSimpleDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetResponseDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetRequestDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetSimpleDTO;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.Projet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjetMapper {

    @Mapping(source = "equipes", target = "equipes")
    ProjetResponseDTO toResponse(Projet projet);


    default List<EquipeSimpleDTO> map(List<Equipe> equipes) {
        if (equipes == null) {
            return List.of();
        }
        return equipes.stream()
                .map(equipe -> new EquipeSimpleDTO(
                        equipe.getId(),
                        equipe.getNomEquipe()
                ))
                .toList();
    }

    @Mapping(target = "equipes", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Projet toEntity(ProjetRequestDTO dto);
}
