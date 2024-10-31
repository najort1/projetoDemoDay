package com.nuhcorre.nuhcorre.model;

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
@Table(name = "usuario")
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotEmpty(message = "O campo email é obrigatório")
    @Column(unique = true)
    private String email;

    @NotEmpty(message = "O campo senha é obrigatório")
    private String senha;

    @NotEmpty(message = "O campo nome é obrigatório")
    private String nome;

    @NotEmpty(message = "O campo cpf é obrigatório")
    @Column(unique = true)
    private String cpf;

    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    @NotEmpty(message = "O campo telefone é obrigatório")
    private String telefone;

    @ManyToMany(mappedBy = "usuarios")
    private List<Vaga> vagas;

    @OneToOne
    @JoinColumn(name = "endereco_id")
    private Endereco endereco;

    @ManyToMany
    @JoinTable(
            name = "usuario_vulnerabilidade",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "vulnerabilidade_id")
    )
    private List<Vulnerabilidade> vulnerabilidades;

    @OneToMany(mappedBy = "usuario")
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
        return true;
    }
}