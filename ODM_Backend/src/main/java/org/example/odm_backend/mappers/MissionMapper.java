package org.example.odm_backend.mappers;

import org.example.odm_backend.dtos.MissionDTO.MissionRequestDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionResponseDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifSimpleDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetSimpleDTO;
import org.example.odm_backend.dtos.TransportDTO.TransportResponseDTO;
import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.entities.Motif;
import org.example.odm_backend.entities.Projet;
import org.example.odm_backend.entities.Transport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MissionMapper {

    // Entity → Response
    @Mapping(source = "motif", target = "motif")
    @Mapping(source = "user.name", target = "user")
    @Mapping(source = "projet", target = "projet")
    @Mapping(source = "transports", target = "transports")
    MissionResponseDTO toResponse(Mission mission);


    default MotifSimpleDTO toMotifSimpleDTO(Motif motif) {
        if (motif == null) return null;

        return new MotifSimpleDTO(
                motif.getId(),
                motif.getNomMotif()
        );
    }


    default ProjetSimpleDTO toProjetSimpleDTO(Projet projet) {
        if (projet == null) return null;

        return new ProjetSimpleDTO(
                projet.getId(),
                projet.getNomProjet()
        );
    }


    default TransportResponseDTO toTransportResponseDTO(Transport transport) {
        if (transport == null) return null;

        return new TransportResponseDTO(
                transport.getId(),
                transport.getTypeTransport(),
                transport.getAdresseDepart(),
                transport.getPaysDepart(),
                transport.getAdresseArrivee(),
                transport.getPaysArrivee(),
                transport.getImVehicule(),
                transport.getPfVehicule()
        );
    }

    // UPDATE PARTIEL
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "motif", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "projet", ignore = true)
    @Mapping(target = "nbNuite", ignore = true)
    @Mapping(target = "nbRepas", ignore = true)
    @Mapping(target = "transports", ignore = true)
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
    @Mapping(target = "transports", ignore = true)
    Mission toEntity(MissionRequestDTO dto);
}