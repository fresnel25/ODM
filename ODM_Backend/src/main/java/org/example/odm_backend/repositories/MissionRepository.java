package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Mission;
import org.example.odm_backend.enums.Etat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface MissionRepository extends JpaRepository <Mission, Long> {

    Optional<Mission> findById(Long id);

    @EntityGraph(attributePaths = {"transports", "user", "motif", "user.equipe"})
    Optional<Mission> findWithDetailsById(Long id);

    boolean existsByMotifId(Long motifId);
    boolean existsByProjet_Id(Long projetId);

    @Query("""
    SELECT m FROM Mission m
    WHERE (
        :search IS NULL OR :search = ''
        OR LOWER(m.lieu) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.complementMotif) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.user.name) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.motif.nomMotif) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.projet.nomProjet) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(CAST(m.etat AS string)) LIKE LOWER(CONCAT('%', :search, '%'))
    )
""")
    Page<Mission> search(@Param("search") String search, Pageable pageable);


    @Query("""
    SELECT m FROM Mission m
    WHERE m.user.id = :userId
      AND (
        :search IS NULL OR :search = ''
        OR LOWER(m.lieu) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.complementMotif) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.motif.nomMotif) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(m.projet.nomProjet) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(CAST(m.etat AS string)) LIKE LOWER(CONCAT('%', :search, '%'))
      )
""")
    Page<Mission> searchByUser(Long userId, @Param("search") String search, Pageable pageable);
}
