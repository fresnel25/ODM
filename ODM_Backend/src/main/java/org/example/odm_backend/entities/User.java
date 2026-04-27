package org.example.odm_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.odm_backend.enums.Role;
import org.example.odm_backend.enums.TypePersonel;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "cku_users")
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString @Builder
public class User {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(name = "role")
        @Enumerated(EnumType.STRING)
        private Role role;

        @Column(name = "name")
        private String name;

        @Column(name = "first_name")
        private String firstName;

        @Column(name = "email")
        private String email;

        @Column(name = "passwd")
        private String passwd;

        @Column(name = "adresse_agent_1")
        private String adresseAgent1;

        @Column(name = "residence_admin_2")
        private String residenceAdmin2;

        @Column(name = "personnel_type")
        @Enumerated(EnumType.STRING)
        private TypePersonel personnelType;

        @Column(name = "intitule")
        private String intitule;

        @Column(name = "grade")
        private String grade;

        @ManyToOne
        @JoinColumn(name = "equipe_id")
        private Equipe equipe;

        @Column(name = "im_vehicule")
        private String imVehicule;

        @Column(name = "pf_vehicule")
        private Integer pfVehicule;

        @Column(name = "signature_name")
        private String signatureName;

        @Column(name = "login_cas")
        private String loginCas;

        @Column(name = "carte_sncf")
        private String carteSncf;

        @Column(name = "matricule")
        private Integer matricule;

        @Column(name = "date_naissance")
        private LocalDate dateNaissance;

        @Column(name = "actif")
        private Boolean actif;

        @Column(name = "AD_entite")
        private String adEntite;

        @Column(name = "permis_conduire_valide")
        private Boolean permisConduireValide;

        @CreatedDate
        @Column(nullable = false, updatable = false)
        private LocalDateTime createdAt;

        @LastModifiedDate
        private LocalDateTime updatedAt;

}
