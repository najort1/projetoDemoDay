package com.nuhcorre.nuhcorre.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "redes_sociais")
public class RedesSociais {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String instagram;
        private String facebook;
        private String linkedin;
        private String site;

        @ManyToOne
        @JoinColumn(name = "usuario_id")
        private Usuario usuario;

        @ManyToOne
        @JoinColumn(name = "empresa_id")
        private Empresa empresa;
}