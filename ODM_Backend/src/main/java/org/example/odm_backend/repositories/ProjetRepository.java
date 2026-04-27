package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, Long> {
}
