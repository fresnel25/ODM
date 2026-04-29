package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.TransportDTO.TransportRequestDTO;
import org.example.odm_backend.dtos.TransportDTO.TransportResponseDTO;
import org.example.odm_backend.entities.Transport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransportMapper {

    // Entity → Response
    @Mapping(source = "mission.lieu", target = "missionLieu")
    TransportResponseDTO toResponse(Transport transport);

    // Request → Entity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "mission", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Transport toEntity(TransportRequestDTO dto);
}