package com.nuhcorre.nuhcorre.service;


import com.nuhcorre.nuhcorre.model.Imagem;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.repository.ImagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImagemService {

    @Autowired
    private final ImagemRepository imagemRepository;

    public Imagem salvarImagem(Imagem imagem) {
        return imagemRepository.save(imagem);
    }

    public Optional<Imagem> encontrarPorUsuario(Usuario usuario) {
        return imagemRepository.findByUsuario(usuario);
    }

    public Optional<Imagem> encontrarPorUsuarioId(Long id) {
        return imagemRepository.findByUsuarioId(id);
    }


    public Optional<Imagem> encontrarPorEmpresaId(String id) {
        return imagemRepository.findByEmpresaCnpj(id);
    }

    public void deletarImagem(Imagem imagemAntiga) {
        imagemRepository.delete(imagemAntiga);
    }
}
