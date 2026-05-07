package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Projet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjetRepository extends JpaRepository<Projet, Long> {

    @Query("""
        SELECT p FROM Projet p
        WHERE (:nomProjet IS NULL OR LOWER(p.nomProjet) LIKE LOWER(CONCAT('%', :nomProjet, '%')))
    """)

    Page<Projet> search(
            @Param("nomProjet") String nomProjet,
            Pageable pageable
    );
}
