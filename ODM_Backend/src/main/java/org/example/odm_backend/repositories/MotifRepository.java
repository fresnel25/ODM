package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Motif;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MotifRepository extends JpaRepository<Motif, Long> {
}
