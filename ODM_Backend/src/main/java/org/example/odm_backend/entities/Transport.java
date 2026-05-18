package org.example.odm_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.example.odm_backend.enums.TypeTransport;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "cku_transports")
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor @AllArgsConstructor @Setter @Getter @Builder
@EqualsAndHashCode(of = "id")
@ToString(exclude = "mission")
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @Column(name = "type_transport")
    @Enumerated(EnumType.STRING)
    private TypeTransport typeTransport;

    @Column(name = "im_vehicule")
    private String imVehicule;

    @Column(name = "pf_vehicule")
    private Integer pfVehicule;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
