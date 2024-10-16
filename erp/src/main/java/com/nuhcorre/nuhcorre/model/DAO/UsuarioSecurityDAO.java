package com.nuhcorre.nuhcorre.model.DAO;


import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Data
public class UsuarioSecurityDAO implements UserDetails {

    private Long id;
    private String email;
    private String senha;
    private Boolean ativo;
    private Collection<? extends GrantedAuthority> authorities;


    public UsuarioSecurityDAO() {
    }

    public UsuarioSecurityDAO(Long id, String email, String senha, Boolean ativo) {
        super();

        this.id = id;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
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
