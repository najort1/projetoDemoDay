package com.nuhcorre.nuhcorre.model;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "vaga")
public class Vaga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String titulo;
    private String descricao;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String requisitos;
    private String beneficios;
    private Double salario;
    private String cargaHoraria;
    private String tipoContrato;

    @Temporal(TemporalType.DATE)
    private Date dataCadastro;

    @Temporal(TemporalType.DATE)
    private Date dataExpiracao;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private Empresa empresa;

    @ManyToMany
    @JoinTable(
            name = "vaga_usuario",
            joinColumns = @JoinColumn(name = "vaga_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    private List<Usuario> usuarios;
    @OneToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @PrePersist
    protected void onCreate() {
        dataCadastro = new Date();
    }

}