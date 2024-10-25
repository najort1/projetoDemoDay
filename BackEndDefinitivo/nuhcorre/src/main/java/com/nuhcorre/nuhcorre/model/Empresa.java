package com.nuhcorre.nuhcorre.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "empresa")
public class Empresa implements UserDetails {

    @Id
    @Column(unique = true)
    @NotBlank(message = "O campo cnpj é obrigatório")
    private String cnpj;

    @NotBlank(message = "O campo nome é obrigatório")
    private String nome;
    private String cidade;
    private String estado;
    private String endereco;
    @NotBlank(message = "O campo telefone é obrigatório")
    private String telefone;
    @NotBlank(message = "O campo email é obrigatório")
    @Column(unique = true)
    private String email;
    @NotBlank(message = "O campo senha é obrigatório")
    private String senha;
    private String descricao;
    private String categoria;
    private String instagram;
    private String facebook;
    private String linkedin;
    private String site;
    private String logo;
    private String banner;
    private String dataCadastro;

    private boolean ativo;
    private boolean verificado;
    private boolean premium;

    private int qtdAvaliacoes;
    private double mediaAvaliacoes;
    private int qtdAvaliacoesPositivas;
    private int qtdAvaliacoesNegativas;
    private int qtdAvaliacoesNeutras;

    @OneToMany(mappedBy = "empresa")
    private List<Vaga> vagas;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Retornar as autoridades da empresa, se houver
        return null;
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.ativo;
    }

    @PrePersist
    public void prePersist() {
        this.dataCadastro = LocalDate.now().toString();
    }

}