package com.nuhcorre.nuhcorre.model;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotEmpty(message = "O campo título é obrigatório")
    private String titulo;

    @NotEmpty(message = "O campo descrição é obrigatório")
    private String descricao;

    @Lob
    @Column(columnDefinition = "TEXT")
    @NotEmpty(message = "O campo requisitos é obrigatório")
    private String requisitos;

    @NotEmpty(message = "O campo benefícios é obrigatório")
    private String beneficios;

    @NotNull(message = "O campo salário é obrigatório")
    private Double salario;

    @NotEmpty(message = "O campo carga horária é obrigatório")
    private String cargaHoraria;

    @Temporal(TemporalType.DATE)
    private Date dataCadastro;

    @Temporal(TemporalType.DATE)
    @NotNull(message = "O campo data de expiração é obrigatório")
    private Date dataExpiracao;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    @JsonBackReference
    private Empresa empresa;

    @ManyToMany
    @JoinTable(
            name = "vaga_usuario",
            joinColumns = @JoinColumn(name = "vaga_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    @JsonManagedReference
    private List<Usuario> usuarios;

    @OneToMany(mappedBy = "vaga", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidatura> candidaturas;

    @ManyToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @PrePersist
    protected void onCreate() {
        if (dataExpiracao == null) {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MONTH, 1);
            dataExpiracao = calendar.getTime();
        }
        dataCadastro = new Date();
    }

    public void adicionarCandidato(Usuario usuario) {
        this.usuarios.add(usuario);
    }

}