package org.example.odm_backend.services.pdf;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.MissionDTO.MissionPdfData;
import org.example.odm_backend.dtos.TransportDTO.TransportPdfData;
import org.example.odm_backend.entities.AppSetting;
import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.repositories.MissionRepository;
import org.example.odm_backend.services.serviceInterface.AppSettingService;
import org.example.odm_backend.services.serviceInterface.FileStorageService;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MissionPdfService {

    private final MissionRepository missionRepository;
    private final AppSettingService appSettingService;
    private final PdfTemplateService templateService;
    private final PdfService pdfService;
    private final FileStorageService fileStorageService;


    private String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null) return "-";

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        return dateTime.format(formatter);
    }

    private MissionPdfData buildData(Mission mission, AppSetting settings) {

        String logoBase64 = loadLogo(settings);

        List<TransportPdfData> transports = mission.getTransports()
                .stream()
                .map(t -> new TransportPdfData(
                        t.getTypeTransport(),
                        t.getImVehicule(),
                        t.getPfVehicule(),
                        t.getAdresseDepart(),
                        t.getAdresseArrivee(),
                        t.getPaysDepart(),
                        t.getPaysArrivee()
                ))
                .toList();


        return new MissionPdfData(

                // ================= AGENT =================
                mission.getUser().getFirstName() + " " + mission.getUser().getName(),
                mission.getUser().getEmail(),

                mission.getUser().getEquipe() != null
                        ? mission.getUser().getEquipe().getNomEquipe()
                        : null,

                mission.getUser().getResidenceAdmin2(),
                mission.getUser().getAdresseAgent1(),
                mission.getUser().getDateNaissance(),
                mission.getUser().getPersonnelType(),
                mission.getUser().getGrade(),

                mission.getUser().getSignatureName(),
                null,
                null,

                // ================= MISSION =================
                mission.getId(),
                mission.getId(),

                mission.getMotif() != null
                        ? mission.getMotif().getNomMotif()
                        : null,

                mission.getProjet() != null
                        ? mission.getProjet().getNomProjet()
                        : null,

                mission.getLieu(),
                mission.getComplementMotif(),

                formatDateTime(mission.getDateD()),
                formatDateTime(mission.getDateR()),

                mission.getDateD() != null
                        ? mission.getDateD().toLocalTime().toString()
                        : null,

                mission.getDateR() != null
                        ? mission.getDateR().toLocalTime().toString()
                        : null,

                mission.getEtat().name(),

                // ================= TRANSPORT =================
                transports,

                mission.getNbNuite(),
                mission.getNbRepas(),
                mission.getSansFrais(),
                mission.getBilletAgence(),
                mission.getCommentaireTransport(),
                mission.getAdEntiteDemandante(),


                // ================= ENTREPRISE =================
                settings.getCompanyName(),
                settings.getAppName(),
                settings.getAddress(),
                settings.getPhone(),
                settings.getEmail(),
                settings.getWebsite(),
                settings.getTextFooter(),

                logoBase64
        );
    }

    @Transactional
    public byte[] generateMissionPdf(Long id) {

        Mission mission = missionRepository.findWithDetailsById(id).orElseThrow(() -> new NotFoundException("Mission introuvable"));
        AppSetting settings = appSettingService.get();
        MissionPdfData data = buildData(mission, settings);

        String html =
                templateService.render(
                        "pdf/mission",
                        Map.of("data", data)
                );

        return pdfService.generatePdf(html);
    }


    private String loadLogo(AppSetting settings) {

        if (settings.getLogoName() == null || settings.getLogoName().isBlank()) {
            return null;
        }
        try {
            Resource logo = fileStorageService.load("logos", settings.getLogoName());
            byte[] bytes = logo.getInputStream().readAllBytes();
            return "data:image/png;base64," +
                    Base64.getEncoder().encodeToString(bytes);

        } catch (IOException e) {
            throw new RuntimeException("Erreur lecture logo", e);
        }
    }
}