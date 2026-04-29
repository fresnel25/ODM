package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.MotifDTO.MotifRequestDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifResponseDTO;
import org.example.odm_backend.entities.Motif;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MotifMapper {

    MotifResponseDTO toResponse(Motif motif);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Motif toEntity(MotifRequestDTO motifDTO);
}
