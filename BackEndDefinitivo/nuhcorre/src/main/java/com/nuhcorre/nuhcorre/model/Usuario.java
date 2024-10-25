package com.nuhcorre.nuhcorre.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
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

    @NotEmpty(message = "O campo data de nascimento é obrigatório")
    private String dataNascimento;

    @NotEmpty(message = "O campo sexo é obrigatório")
    private String sexo;

    @NotEmpty(message = "O campo endereco é obrigatório")
    private String endereco;

    private String cidade;
    private String estado;

    @NotEmpty(message = "O campo escolaridade é obrigatório")
    private String escolaridade;

    @NotEmpty(message = "O campo vulnerabilidade é obrigatório")
    private String vulnerabilidade;

    @NotEmpty(message = "O campo telefone é obrigatório")
    private String telefone;

    @ManyToMany(mappedBy = "usuarios")
    private List<Vaga> vagas;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Retornar as autoridades do usuário, se houver
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
        return true;
    }
}