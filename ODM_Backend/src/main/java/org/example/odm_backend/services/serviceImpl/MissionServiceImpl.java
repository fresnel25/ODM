package org.example.odm_backend.services.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.example.odm_backend.dtos.MissionDTO.MissionFilterDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionRequestDTO;
import org.example.odm_backend.dtos.MissionDTO.MissionResponseDTO;
import org.example.odm_backend.entities.*;
import org.example.odm_backend.exceptions.NotFoundException;
import org.example.odm_backend.exceptions.ValidationException;
import org.example.odm_backend.mappers.MissionMapper;
import org.example.odm_backend.repositories.*;
import org.example.odm_backend.services.serviceInterface.MissionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
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

        if (dto.dateR().isBefore(dto.dateD())) {
            throw new ValidationException("dateR doit être après dateD");
        }

        Mission mission = missionMapper.toEntity(dto);

        mission.setDateD(dto.dateD());
        mission.setDateR(dto.dateR());

        calculerFrais(mission);

        if (dto.motifId() != null) {
            Motif motif = motifRepository.findById(dto.motifId())
                    .orElseThrow(() -> new NotFoundException("Motif non trouvé"));
            mission.setMotif(motif);
        }

        if (dto.userId() != null) {
            User user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new NotFoundException("User non trouvé"));
            mission.setUser(user);
        }

        if (dto.projetId() != null) {
            Projet projet = projetRepository.findById(dto.projetId())
                    .orElseThrow(() -> new NotFoundException("Projet non trouvé"));
            mission.setProjet(projet);
        }

        mission = missionRepository.save(mission);

        return missionMapper.toResponse(mission);
    }

    @Override
    public MissionResponseDTO updateMission(Long id, MissionRequestDTO dto) {


        // Vérification mission
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Mission non trouvée"));

        LocalDateTime dateD = dto.dateD() != null ? dto.dateD() : mission.getDateD();
        LocalDateTime dateR = dto.dateR() != null ? dto.dateR() : mission.getDateR();

        if (dateR.isBefore(dateD)) {
            throw new ValidationException("dateR doit être après dateD");
        }

        // update champs
        missionMapper.updateMissionFromDto(dto, mission);

        mission.setDateD(dateD);
        mission.setDateR(dateR);

        calculerFrais(mission);

        // update relations
        if (dto.motifId() != null) {
            Motif motif = motifRepository.findById(dto.motifId())
                    .orElseThrow(() -> new NotFoundException("Motif non trouvé"));
            mission.setMotif(motif);
        }

        if (dto.userId() != null) {
            User user = userRepository.findById(dto.userId())
                    .orElseThrow(() -> new NotFoundException("User non trouvé"));
            mission.setUser(user);
        }

        if (dto.projetId() != null) {
            Projet projet = projetRepository.findById(dto.projetId())
                    .orElseThrow(() -> new NotFoundException("Projet non trouvé"));
            mission.setProjet(projet);
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
    public Page<MissionResponseDTO> search(MissionFilterDTO filter, Pageable pageable) {
        return missionRepository.search(
                filter.userId(), filter.motifId(), filter.projetId(), filter.etat(), filter.sansFrais(), filter.billetAgence(), filter.lieu(), filter.dateFrom(), filter.dateTo(),
                pageable
        )
        .map(missionMapper::toResponse);
    }
}