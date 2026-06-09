package org.example.odm_backend.dtos.MissionDTO;

import org.example.odm_backend.dtos.TransportDTO.TransportPdfData;
import org.example.odm_backend.enums.TypePersonel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record MissionPdfData(

        // ================= AGENT =================
        String agentFullName,
        String agentEmail,
        String equipe,

        String residenceAdministrative,
        String adressePersonnelle,
        LocalDate dateNaissance,
        TypePersonel personnelType,
        String grade,

        String signatureAgent,
        String signatureResponsable,
        String signatureDirecteur,

        // ================= MISSION =================
        Long missionId,
        Long numeroMission,
        String motif,
        String projet,
        String lieu,
        String complementMotif,
        String dateDepart,
        String dateRetour,
        String heureDepart,
        String heureRetour,
        String etat,
        //String dateEdition,

        // ================= TRANSPORT =================
        List<TransportPdfData> transports,
        Integer nbNuite,
        Integer nbRepas,
        Boolean sansFrais,
        Boolean billetAgence,
        String commentaireTransport,
        String adEntiteDemandante,


        // ================= ENTREPRISE =================
        String companyName,
        String appName,
        String address,
        String phone,
        String email,
        String website,
        String textFooter,

        String logoBase64

) {}