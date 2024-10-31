package com.nuhcorre.nuhcorre.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "vulnerabilidade")
public class Vulnerabilidade {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String nome;

        @ManyToMany(mappedBy = "vulnerabilidades")
        private List<Usuario> usuarios;
}