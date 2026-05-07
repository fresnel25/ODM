package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.MissionDTO.MissionRequestDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionResponseDTO;
import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.enums.TypeTransport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MissionMapper {

    // Entity → Response
    @Mapping(source = "motif.nomMotif", target = "motif")
    @Mapping(source = "user.name", target = "user")
    @Mapping(source = "projet.nomProjet", target = "projet")
    @Mapping(source = "nbNuite", target = "nbNuite")
    @Mapping(source = "nbRepas", target = "nbRepas")
    @Mapping(target = "typeTransport", expression = "java(mapTypeTransport(mission.getTypeTransport()))")
    MissionResponseDTO toResponse(Mission mission);

    default List<String> mapTypeTransport(List<TypeTransport> types) {
        if (types == null) return null;
        return types.stream()
                .map(Enum::name)
                .toList();
    }


    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "motif", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "projet", ignore = true)
    @Mapping(target = "nbNuite", ignore = true)
    @Mapping(target = "nbRepas", ignore = true)
    void updateMissionFromDto(MissionRequestDTO dto, @MappingTarget Mission mission);


    // Request → Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "motif", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "projet", ignore = true)
    @Mapping(target = "nbNuite", ignore = true)
    @Mapping(target = "nbRepas", ignore = true)
    Mission toEntity(MissionRequestDTO dto);
}