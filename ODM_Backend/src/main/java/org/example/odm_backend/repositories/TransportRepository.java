package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Transport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransportRepository extends JpaRepository<Transport, Long> {
}
