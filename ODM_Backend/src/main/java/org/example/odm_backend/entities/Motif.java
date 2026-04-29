package org.example.odm_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "cku_motifs")
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@EqualsAndHashCode(of = "id")
public class Motif {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_motif")
    private String nomMotif;

    @Column(name = "est_dans_liste")
    private Boolean estDansListe;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
