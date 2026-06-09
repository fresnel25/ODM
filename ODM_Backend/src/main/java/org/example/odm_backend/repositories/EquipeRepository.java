package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Equipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EquipeRepository extends JpaRepository <Equipe, Long> {
    boolean existsByNomEquipe(String nomEquipe);
    List<Equipe> findByProjetsId(Long projetId);

    @Query("""
    SELECT e FROM Equipe e
    WHERE (
        :search IS NULL OR :search = ''
        OR LOWER(e.nomEquipe) LIKE LOWER(CONCAT('%', :search, '%'))
    )
    """)
    Page<Equipe> search(
            @Param("search") String search,
            Pageable pageable
    );
}
