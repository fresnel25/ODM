package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.UserDTO.*;
import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {


    // ENTITY → RESPONSE

    @Mapping(source = "equipe.nomEquipe", target = "equipe")
    @Mapping(source = "role", target = "role")
    UserResponseDTO toResponse(User user);



    // REQUEST → ENTITY (CREATE / UPDATE)

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "actif", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    User toEntity(UserRequestDTO dto);



    // UPDATE EXISTING ENTITY

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "equipe", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "passwd", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateUser(UserRequestDTO dto, @MappingTarget User user);


    // AUTH RESPONSE

    @Mapping(source = "id", target = "userId")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "role", target = "role")
    AuthResponseDTO toAuthResponse(User user, String token);


    // UTILS

    default String map(Equipe equipe) {
        return equipe != null ? equipe.getNomEquipe() : null;
    }
}