package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.Imagem;
import com.nuhcorre.nuhcorre.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {

    Optional<Imagem> findByUsuario(Usuario usuario);

    Optional<Imagem> findByUsuarioId(long usuarioId);

    Optional<Imagem> findByEmpresaCnpj(String cnpj);
}