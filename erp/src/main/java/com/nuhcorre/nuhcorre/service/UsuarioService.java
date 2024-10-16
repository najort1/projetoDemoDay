package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.configuration.JpaUserDetailsService;
import com.nuhcorre.nuhcorre.controller.UsuarioController;
import com.nuhcorre.nuhcorre.exception.DataIntegrityException;
import com.nuhcorre.nuhcorre.exception.ObjectNotFoundException;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private static Logger logger = LoggerFactory.getLogger(UsuarioController.class);


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario findUsuarioAuthenticated() {
        return usuarioRepository.findById(JpaUserDetailsService.getAuthenticated().getId()).orElseThrow(() -> new ObjectNotFoundException("authenticated"));
    }

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id.toString()));
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll(Sort.by("nome"));
    }

    @Transactional
    public Usuario insert(Usuario usuario) throws DataIntegrityException{
        usuario.setId(null);
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        Optional<Usuario> usuarioEncontrado = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioEncontrado.isPresent()){
            throw new DataIntegrityException("Usuário já cadastrado.");
        }
        Usuario save = usuarioRepository.save(usuario);
        logger.info("ID: (" + save.getId() + ") | " + save.getNome() + "(" + save.getId() + ") | [REGISTROU USUÁRIO]");
        return save;
    }

    public Usuario update(Long id, Usuario usuario) {
        Usuario usuarioFind = findById(id);
        usuario.setId(id);
        if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            usuario.setSenha(usuarioFind.getSenha());
        } else {
            usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        }

        Usuario save = usuarioRepository.save(usuario);
        usuario = findUsuarioAuthenticated();
        logger.info("ID: (" + save.getId() + ") | " + usuario.getNome() + "(" + usuario.getId() + ") | [ATUALIZOU USUÁRIO]");
        return save;
    }

    public void delete(Long id) {

        try {
            usuarioRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataIntegrityException(id.toString());
        }

        Usuario usuario = findUsuarioAuthenticated();
        logger.info("ID: (" + id + ") | " + usuario.getNome() + "(" + usuario.getId() + ") | [DELETOU USUÁRIO]");
    }

    public Long findIdByEmail(String email){
        return usuarioRepository.findIdByEmail(email);
    }

    public Usuario findByEmail(String email){
        return usuarioRepository.findByEmail(email).orElseThrow(() -> new ObjectNotFoundException(email));
    }

    public Usuario setAvatar(Long id, Long idAvatar) {
        Usuario usuario = findById(id);
        return usuarioRepository.save(usuario);
    }
}
