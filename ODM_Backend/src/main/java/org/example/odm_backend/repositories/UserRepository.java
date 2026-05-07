package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.TypePersonel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository <User, Long > {

    boolean existsByEmail(String email);

    @Query("""
        SELECT u FROM User u
        LEFT JOIN u.equipe e
        WHERE (:firstName IS NULL OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')))
        AND (:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%')))
        AND (:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%')))
        AND (:personnelType IS NULL OR u.personnelType = :personnelType)
        AND (:equipeId IS NULL OR e.id = :equipeId)
        AND (:grade IS NULL OR u.grade = :grade)
    """)

    Page<User> searchUsers(
            @Param("firstName") String firstName,
            @Param("name") String name,
            @Param("email") String email,
            @Param("personnelType") TypePersonel personnelType,
            @Param("equipeId") Long equipeId,
            @Param("grade") String grade,
            Pageable pageable
    );
}
