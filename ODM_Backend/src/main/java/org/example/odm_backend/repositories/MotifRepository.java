package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Motif;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MotifRepository extends JpaRepository<Motif, Long> {
    boolean existsByNomMotif(String nomMotif);

    @Query("""
        SELECT m FROM Motif m
        WHERE (:nomMotif IS NULL OR LOWER(m.nomMotif) LIKE LOWER(CONCAT('%', :nomMotif, '%')))
        AND (:estDansListe IS NULL OR m.estDansListe = :estDansListe)
    """)

    Page<Motif> search(
            @Param("nomMotif") String nomMotif,
            @Param("estDansListe") Boolean estDansListe,
            Pageable pageable
    );
}
