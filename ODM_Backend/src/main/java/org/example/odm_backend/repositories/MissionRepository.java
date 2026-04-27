package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Mission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MissionRepository extends JpaRepository <Mission, Long> {
}
