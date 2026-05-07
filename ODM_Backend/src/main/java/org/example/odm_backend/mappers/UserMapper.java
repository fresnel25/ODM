package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {

    // ENTITY → RESPONSE
    @Mapping(source = "equipe.nomEquipe", target = "equipe")
    @Mapping(source = "role", target = "role")
    UserResponseDTO toResponse(User user);

    // REQUEST → ENTITY
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateUserFromDto(UserRequestDTO dto, @MappingTarget User user);

    // REQUEST → ENTITY
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserRequestDTO dto);


    // UTILS
    /*default String map(Equipe equipe) {
        return equipe != null ? equipe.getNomEquipe() : null;
    }*/
}