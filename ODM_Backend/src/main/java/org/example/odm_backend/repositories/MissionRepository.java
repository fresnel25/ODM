package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.enums.Etat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface MissionRepository extends JpaRepository <Mission, Long> {

    @Query("""
        SELECT m FROM Mission m
        WHERE (:userId IS NULL OR m.user.id = :userId)
        AND (:motifId IS NULL OR m.motif.id = :motifId)
        AND (:projetId IS NULL OR m.projet.id = :projetId)
        AND (:etat IS NULL OR m.etat = :etat)
        AND (:sansFrais IS NULL OR m.sansFrais = :sansFrais)
        AND (:billetAgence IS NULL OR m.billetAgence = :billetAgence)
        AND (:lieu IS NULL OR LOWER(m.lieu) LIKE LOWER(CONCAT('%', :lieu, '%')))
        AND (:dateFrom IS NULL OR m.dateD >= :dateFrom)
        AND (:dateTo IS NULL OR m.dateR <= :dateTo)
    """)

    Page<Mission> search(
            Long userId,
            Long motifId,
            Long projetId,
            Etat etat,
            Boolean sansFrais,
            Boolean billetAgence,
            String lieu,
            LocalDateTime dateFrom,
            LocalDateTime dateTo,
            Pageable pageable
    );
}
