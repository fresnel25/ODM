package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.MissionDTO.MissionRequestDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionResponseDTO;
import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.entities.Transport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MissionMapper {

    // Entity → Response
    @Mapping(source = "motif.nomMotif", target = "motif")
    @Mapping(source = "user.name", target = "user")
    @Mapping(source = "projet.nomProjet", target = "projet")
    @Mapping(source = "transports", target = "transports")
    MissionResponseDTO toResponse(Mission mission);

    // mapping transport → String
    default String map(Transport transport) {
        return transport != null && transport.getTypeTransport() != null
                ? transport.getTypeTransport().name()
                : null;
    }

    // Request → Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)

    @Mapping(target = "motif", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "projet", ignore = true)
    @Mapping(target = "transports", ignore = true)

    Mission toEntity(MissionRequestDTO dto);
}