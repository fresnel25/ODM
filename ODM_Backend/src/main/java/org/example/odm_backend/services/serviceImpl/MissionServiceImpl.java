package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.MissionDTO.*;
import org.example.odm_backend.dtos.TransportDTO.TransportRequestDTO;
import org.example.odm_backend.entities.*;
import org.example.odm_backend.enums.Etat;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.exceptions.ValidationException;
import org.example.odm_backend.mappers.MissionMapper;
import org.example.odm_backend.mappers.TransportMapper;
import org.example.odm_backend.repositories.*;
import org.example.odm_backend.security.config.SecurityUtils;
import org.example.odm_backend.services.emailService.MissionNotificationService;
import org.example.odm_backend.services.serviceInterface.MissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MissionServiceImpl implements MissionService {

    private final MissionRepository missionRepository;
    private final MotifRepository motifRepository;
    private final UserRepository userRepository;
    private final ProjetRepository projetRepository;
    private final MissionMapper missionMapper;
    private final TransportMapper transportMapper;
    private final SecurityUtils securityUtils;
    private final MissionNotificationService missionNotificationService;

    private int calculerNbNuite(LocalDateTime dateD, LocalDateTime dateR) {
        return (int) ChronoUnit.DAYS.between(
                dateD.toLocalDate(),
                dateR.toLocalDate()
        );
    }

    private int calculerNbRepas(LocalDateTime dateD, LocalDateTime dateR) {
        int repas = 0;

        LocalDate start = dateD.toLocalDate();
        LocalDate end = dateR.toLocalDate();

        if (dateD.toLocalTime().isBefore(LocalTime.of(12, 0))) repas++;
        if (dateD.toLocalTime().isBefore(LocalTime.of(19, 0))) repas++;

        long joursComplets = ChronoUnit.DAYS.between(start, end) - 1;
        if (joursComplets > 0) repas += joursComplets * 2;

        if (dateR.toLocalTime().isAfter(LocalTime.of(12, 0))) repas++;
        if (dateR.toLocalTime().isAfter(LocalTime.of(19, 0))) repas++;

        return Math.max(repas, 0);
    }

    public void calculerFrais(Mission mission) {

        if (Boolean.TRUE.equals(mission.getSansFrais())) {
            mission.setNbNuite(0);
            mission.setNbRepas(0);
            return;
        }

        if (mission.getDateD() == null || mission.getDateR() == null) {
            throw new IllegalArgumentException("Dates obligatoires");
        }

        if (mission.getDateR().isBefore(mission.getDateD())) {
            throw new IllegalArgumentException("dateR doit être après dateD");
        }

        mission.setNbNuite(calculerNbNuite(mission.getDateD(), mission.getDateR()));
        mission.setNbRepas(calculerNbRepas(mission.getDateD(), mission.getDateR()));
    }

    @Override
    public MissionResponseDTO addMission(MissionRequestDTO dto) {

        if (dto.dateR().isBefore(dto.dateD())) {throw new ValidationException("La date de retour doit être après la date de départ");}

        // USER CONNECTÉ
        User user = securityUtils.getCurrentUserEntity();
        if (user.getEquipe() == null) {throw new ValidationException("Aucune équipe associée à l'utilisateur");}

        Mission mission = missionMapper.toEntity(dto);
        mission.setDateD(dto.dateD());
        mission.setDateR(dto.dateR());

        // USER AUTOMATIQUE
        mission.setUser(user);

        // MOTIF
        if (dto.motifId() != null) {Motif motif = motifRepository.findById(dto.motifId()).orElseThrow(() -> new NotFoundException("Motif non trouvé"));mission.setMotif(motif);}

        // PROJET
        if (dto.projetId() != null) {
            Projet projet = projetRepository.findById(dto.projetId())
                    .orElseThrow(() ->
                            new NotFoundException("Projet non trouvé"));

            // Vérifie que le projet appartient bien
            // à l'équipe du user connecté
            boolean hasAccess = projet.getEquipes()
                    .stream()
                    .anyMatch(e ->
                            e.getId().equals(user.getEquipe().getId()));

            if (!hasAccess) {
                throw new ValidationException(
                        "Ce projet n'appartient pas à votre équipe"
                );
            }

            mission.setProjet(projet);
        }

        calculerFrais(mission);

        // TRANSPORTS
        List<Transport> transports = new ArrayList<>();
        if (dto.transports() != null) {

            for (TransportRequestDTO transportDTO : dto.transports()) {

                Transport transport =
                        transportMapper.toEntity(transportDTO);

                transport.setMission(mission);

                switch (transportDTO.typeTransport()) {

                    case VP -> {

                        if (user.getImVehicule() == null
                                || user.getPfVehicule() == null) {

                            throw new ValidationException(
                                    "Votre véhicule personnel est incomplet"
                            );
                        }

                        // snapshot véhicule personnel
                        transport.setImVehicule(user.getImVehicule());
                        transport.setPfVehicule(user.getPfVehicule());
                    }

                    case VS -> {

                        if (transportDTO.imVehicule() == null
                                || transportDTO.pfVehicule() == null) {

                            throw new ValidationException(
                                    "Les informations du véhicule sont obligatoires"
                            );
                        }

                        transport.setImVehicule(transportDTO.imVehicule());
                        transport.setPfVehicule(transportDTO.pfVehicule());
                    }

                    default -> {
                        transport.setImVehicule(null);
                        transport.setPfVehicule(null);
                    }
                }

                transports.add(transport);
            }
        }
        mission.setTransports(transports);
        mission = missionRepository.save(mission);

        //envoie de mail
        missionNotificationService.notifyMissionCreated(mission, user);

        return missionMapper.toResponse(mission);
    }

    @Override
    public MissionResponseDTO updateMission(Long id, MissionRequestDTO dto) {

        Mission mission = missionRepository.findById(id).orElseThrow(() -> new NotFoundException("Mission non trouvée"));

        // USER CONNECTÉ
        User currentUser = securityUtils.getCurrentUserEntity();

        // Vérifie propriétaire mission
        if (!mission.getUser().getId().equals(currentUser.getId())) {
            throw new ValidationException(
                    "Vous ne pouvez modifier que vos missions"
            );
        }

        // Mission déjà validée
        if (mission.getEtat() == Etat.VALIDE) {
            throw new ValidationException(
                    "Mission déjà validée, modification impossible"
            );
        }

        // Vérification dates
        LocalDateTime dateD = dto.dateD() != null ? dto.dateD() : mission.getDateD();
        LocalDateTime dateR = dto.dateR() != null ? dto.dateR() : mission.getDateR();

        if (dateR.isBefore(dateD)) {throw new ValidationException(
                "La date de retour doit être après la date de départ"
            );
        }

        // UPDATE SIMPLE CHAMPS
        missionMapper.updateMissionFromDto(dto, mission);

        mission.setDateD(dateD);
        mission.setDateR(dateR);

        // USER FIXE
        mission.setUser(currentUser);

        // MOTIF
        if (dto.motifId() != null) {
            Motif motif = motifRepository.findById(dto.motifId())
                    .orElseThrow(() ->
                            new NotFoundException("Motif non trouvé"));
            mission.setMotif(motif);
        }

        // PROJET
        if (dto.projetId() != null) {
            Projet projet = projetRepository.findById(dto.projetId())
                    .orElseThrow(() ->
                            new NotFoundException("Projet non trouvé"));

            // Vérifie projet appartient à l'équipe
            boolean hasAccess = projet.getEquipes()
                    .stream()
                    .anyMatch(e ->
                            e.getId().equals(currentUser.getEquipe().getId()));

            if (!hasAccess) {
                throw new ValidationException(
                        "Ce projet n'appartient pas à votre équipe"
                );
            }
            mission.setProjet(projet);
        }

        calculerFrais(mission);

        // RESET TRANSPORTS
        mission.getTransports().clear();
        // TRANSPORTS
        if (dto.transports() != null) {

            for (TransportRequestDTO transportDTO : dto.transports()) {
                Transport transport = transportMapper.toEntity(transportDTO);

                transport.setMission(mission);

                switch (transportDTO.typeTransport()) {
                    case VP -> {
                        if (currentUser.getImVehicule() == null
                                || currentUser.getPfVehicule() == null) {
                            throw new ValidationException(
                                    "Votre véhicule personnel est incomplet"
                            );
                        }
                        // snapshot véhicule personnel
                        transport.setImVehicule(
                                currentUser.getImVehicule()
                        );
                        transport.setPfVehicule(
                                currentUser.getPfVehicule()
                        );
                    }

                    case VS -> {
                        if (transportDTO.imVehicule() == null
                                || transportDTO.pfVehicule() == null) {

                            throw new ValidationException(
                                    "Les informations du véhicule sont obligatoires"
                            );
                        }
                        transport.setImVehicule(
                                transportDTO.imVehicule()
                        );
                        transport.setPfVehicule(
                                transportDTO.pfVehicule()
                        );
                    }

                    default -> {
                        transport.setImVehicule(null);
                        transport.setPfVehicule(null);
                    }
                }

                mission.getTransports().add(transport);
            }
        }

        mission = missionRepository.save(mission);

        return missionMapper.toResponse(mission);
    }

    @Override
    public void deleteMission(Long id) {
        if (!missionRepository.existsById(id)) {
            throw new NotFoundException("Mission non trouvée");
        }
        missionRepository.deleteById(id);
    }

    @Override
    public MissionResponseDTO getById(Long id) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Mission non trouvée"));

        return missionMapper.toResponse(mission);
    }

    @Override
    public Page<MissionResponseDTO> allMissions(MissionFilterDTO filter, Pageable pageable) {
        return missionRepository.search(
                filter.userId(), filter.motifId(), filter.projetId(), filter.etat(), filter.sansFrais(), filter.billetAgence(), filter.lieu(), filter.dateFrom(), filter.dateTo(),
                pageable
        )
        .map(missionMapper::toResponse);
    }

    @Override
    public Page<MissionResponseDTO> myMissions(MissionFilterDTO filter, Pageable pageable) {

        Long userId = securityUtils.getCurrentUserId();

        return missionRepository.search(
                        userId, filter.motifId(), filter.projetId(), filter.etat(), filter.sansFrais(), filter.billetAgence(), filter.lieu(), filter.dateFrom(), filter.dateTo(),
                        pageable
                )
                .map(missionMapper::toResponse);
    }

    @Transactional
    @Override
    public MissionResponseDTO validateMission(Long missionId, MissionValidationDTO dto) {

        User currentUser = securityUtils.getCurrentUserEntity();

        if (currentUser.getRole() != Role.ADMIN) {throw new ValidationException("Accès refusé");}

        Mission mission = missionRepository.findById(missionId).orElseThrow(() -> new NotFoundException("Mission introuvable"));

        if (mission.getUser() == null ||
                mission.getUser().getEquipe() == null ||
                currentUser.getEquipe() == null ||
                !mission.getUser().getEquipe().getId()
                        .equals(currentUser.getEquipe().getId())) {

            throw new ValidationException("Vous ne pouvez pas valider cette mission");
        }

        if (mission.getEtat() != Etat.SOUMIS) {
            throw new ValidationException("Mission déjà traitée");
        }

        mission.setEtat(Etat.VALIDE);

        mission = missionRepository.save(mission);

        // Mail après validation
        missionNotificationService.notifyMissionValidated(mission, currentUser);

        return missionMapper.toResponse(mission);
    }

    @Transactional
    @Override
    public MissionResponseDTO processMission(Long missionId, MissionProcessDTO dto) {

        User currentUser = securityUtils.getCurrentUserEntity();

        if (currentUser.getRole() != Role.SECRETARY) {
            throw new ValidationException("Accès refusé");
        }

        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new NotFoundException("Mission introuvable"));

        if (mission.getEtat() != Etat.VALIDE) {
            throw new ValidationException("Mission non validée");
        }

        if (mission.getDatePec() != null) {
            throw new ValidationException("Mission déjà traitée");
        }

        mission.setDatePec(dto.datePec());

        mission = missionRepository.save(mission);

        missionNotificationService.notifyDatePecUpdated(
                mission,
                currentUser
        );

        return missionMapper.toResponse(mission);
    }
}