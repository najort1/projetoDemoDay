package com.nuhcorre.nuhcorre.model;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
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
@Table(name = "empresa")
public class Empresa implements UserDetails {
    @Id
    @Column(unique = true)
    private String cnpj;

    private String nome;
    private String telefone;
    private String email;
    private String senha;
    private String descricao;
    private String categoria;

    @Temporal(TemporalType.DATE)
    private Date dataCadastro;

    private boolean ativo;
    private boolean verificado;
    private boolean premium;

    @OneToMany(mappedBy = "empresa")
    @JsonManagedReference
    private List<Vaga> vagas;

    @OneToMany(mappedBy = "empresa")
    @JsonManagedReference
    private List<Endereco> enderecos;

    @OneToMany(mappedBy = "empresa")
    @JsonBackReference
    private List<RedesSociais> redesSociais;

    @OneToMany(mappedBy = "empresa")
    @JsonBackReference
    private List<Avaliacao> avaliacoes;

    // Empresa.java
    @OneToOne(mappedBy = "empresa")
    private Imagem imagem;

    @PrePersist
    public void prePersist() {
        setDataCadastro(new Date());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
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
        return ativo;
    }
}