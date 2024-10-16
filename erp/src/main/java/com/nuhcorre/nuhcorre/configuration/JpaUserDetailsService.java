package com.nuhcorre.nuhcorre.configuration;

import com.nuhcorre.nuhcorre.model.DAO.UsuarioSecurityDAO;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class JpaUserDetailsService implements UserDetailsService {
    private final UsuarioRepository usuarioRepository;

    @Override
    public UsuarioSecurityDAO loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Bad credentials"));
        return new UsuarioSecurityDAO(usuario.getId(), usuario.getEmail(), usuario.getSenha(), usuario.getAtivo());
    }


    public static UsuarioSecurityDAO getAuthenticated() {
        return (UsuarioSecurityDAO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
