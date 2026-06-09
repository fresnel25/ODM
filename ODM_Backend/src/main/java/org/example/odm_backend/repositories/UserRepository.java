package org.example.odm_backend.repositories;

import org.example.odm_backend.entities.Equipe;
import org.example.odm_backend.entities.User;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.enums.TypePersonel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository <User, Long > {

    List<User> findByRole(Role role);
    boolean existsByEquipeId(Long equipeId);

    List<User> findByRoleAndEquipe_Id(Role role, Long equipeId);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByLoginCas(String loginCas);

    @Query("""
    SELECT u FROM User u
    LEFT JOIN u.equipe e
    WHERE (
        :search IS NULL OR :search = ''
        OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(u.name) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(u.grade) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(e.nomEquipe) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(CAST(u.personnelType AS string)) LIKE LOWER(CONCAT('%', :search, '%'))
        OR LOWER(CAST(u.role AS string)) LIKE LOWER(CONCAT('%', :search, '%'))
    )
""")
    Page<User> searchUsers(
            @Param("search") String search,
            Pageable pageable
    );
}
