package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }


}
