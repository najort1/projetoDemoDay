package com.nuhcorre.nuhcorre.model;

import com.nuhcorre.nuhcorre.model.Avaliacao;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.model.RedesSociais;
import com.nuhcorre.nuhcorre.model.Vaga;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

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
    private List<Vaga> vagas;

    @OneToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @OneToMany(mappedBy = "empresa")
    private List<RedesSociais> redesSociais;

    @OneToMany(mappedBy = "empresa")
    private List<Avaliacao> avaliacoes;

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