package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.EquipeDto.EquipeSimpleDTO;
import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    // ENTITY → RESPONSE
    @Mapping(source = "equipe", target = "equipe")
    UserResponseDTO toResponse(User user);

    default EquipeSimpleDTO toEquipeSimpleDTO(Equipe equipe) {
        if (equipe == null) return null;

        return new EquipeSimpleDTO(
                equipe.getId(),
                equipe.getNomEquipe()
        );
    }

    // REQUEST → ENTITY
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserRequestDTO dto);

    // UPDATE PARTIEL DTO USER → ENTITY EXISTANTE
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateUserFromDto(UserRequestDTO dto, @MappingTarget User user);

    // UPDATE PARTIEL DTO ADMIN → ENTITY EXISTANTE
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateUserAdminFromDto(UserUpdateRequestDTO dto, @MappingTarget User user);
}