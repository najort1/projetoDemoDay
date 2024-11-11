package com.nuhcorre.nuhcorre.model.details;

import com.nuhcorre.nuhcorre.model.Empresa;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class EmpresaUserDetails implements UserDetails {
    private final Empresa empresa;

    public EmpresaUserDetails(Empresa empresa) {
        this.empresa = empresa;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null; // Adicione as autoridades conforme necessário
    }

    @Override
    public String getPassword() {
        return empresa.getSenha();
    }

    @Override
    public String getUsername() {
        return empresa.getEmail();
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
        return empresa.isAtivo();
    }
}