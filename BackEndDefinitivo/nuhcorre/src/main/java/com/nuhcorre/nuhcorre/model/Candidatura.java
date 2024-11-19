package com.nuhcorre.nuhcorre.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "candidatura")
public class Candidatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "vaga_id")
    private Vaga vaga;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCandidatura;

    @PrePersist
    protected void onCreate() {
        dataCandidatura = new Date();
    }
}