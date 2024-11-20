package com.nuhcorre.nuhcorre.model;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "VagaDados")
public class VagaDados {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JoinColumn(name = "vaga_id")
    private long vagaId;

    @JoinColumn(name = "usuario_id")
    private long usuarioId;

    private Date timestamp;

    private int visualizacoes;

    @PrePersist
    protected void onCreate() {
        timestamp = new Date();
    }

}