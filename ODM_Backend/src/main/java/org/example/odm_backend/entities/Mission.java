package org.example.odm_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.odm_backend.enums.Etat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cku_missions")
@NoArgsConstructor @AllArgsConstructor @Getter @Setter @ToString
public class Mission {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToMany(fetch = FetchType.LAZY)
        private List<Transport> transports = new ArrayList<>();

        @ManyToOne
        @JoinColumn(name = "motif_id")
        private Motif motif;

        @Column(name = "complement_motif")
        private String complementMotif;

        @Column(name = "lieu")
        private String lieu;

        @Column(name = "date_d")
        private LocalDateTime dateD;

        @Column(name = "date_r")
        private LocalDateTime dateR;

        @Column(name = "sans_frais")
        private Boolean sansFrais;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @Column(name = "etat")
        @Enumerated(EnumType.STRING)
        private Etat etat;

        @Column(name = "nb_nuite")
        private Integer nbNuite;

        @Column(name = "nb_repas")
        private Integer nbRepas;

        @ManyToOne
        @JoinColumn(name = "projet_id")
        private Projet projet;

        @Column(name = "billet_agence")
        private Boolean billetAgence;

        @Column(name = "commentaire_transport")
        private String commentaireTransport;

        @Column(name = "AD_entite_demandante")
        private String adEntiteDemandante;

        @Column(name = "AD_aller_trajet")
        private String adAllerTrajet;

        @Column(name = "AD_aller_pays")
        private String adAllerPays;

        @Column(name = "AD_retour_trajet")
        private String adRetourTrajet;

        @Column(name = "AD_retour_pays")
        private String adRetourPays;

        @Column(name = "date_pec")
        private LocalDateTime datePec;



}
