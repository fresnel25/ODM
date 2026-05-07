package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Equipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EquipeRepository extends JpaRepository <Equipe, Long> {
    boolean existsByNomEquipe(String nomEquipe);

    @Query("""
        SELECT e FROM Equipe e
        WHERE (:nomEquipe IS NULL OR LOWER(e.nomEquipe) LIKE LOWER(CONCAT('%', :nomEquipe, '%')))
    """)

    Page<Equipe> search(
            @Param("nomEquipe") String nomEquipe,
            Pageable pageable
    );
}
