package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipeRepository extends JpaRepository <Equipe, Long> {
}
