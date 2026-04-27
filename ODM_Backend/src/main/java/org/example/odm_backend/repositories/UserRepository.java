package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository <User, Long > {
}
