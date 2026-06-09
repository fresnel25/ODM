package org.example.odm_backend.dtos.MissionDTO;
import org.example.odm_backend.dtos.MotifDTO.MotifSimpleDTO;
import org.example.odm_backend.dtos.ProjetDTO.ProjetSimpleDTO;
import org.example.odm_backend.dtos.TransportDTO.TransportResponseDTO;
import org.example.odm_backend.enums.Etat;
import org.example.odm_backend.enums.TypeTransport;
import java.time.LocalDateTime;
import java.util.List;
public record MissionResponseDTO(

        Long id,
        MotifSimpleDTO motif,
        String user,
        ProjetSimpleDTO projet,
        List<TransportResponseDTO> transports,
        String complementMotif,
        String lieu,
        LocalDateTime dateD,
        LocalDateTime dateR,
        Boolean sansFrais,
        Etat etat,
        Integer nbNuite,
        Integer nbRepas,
        Boolean billetAgence,
        String commentaireTransport,
        String adEntiteDemandante



) {}