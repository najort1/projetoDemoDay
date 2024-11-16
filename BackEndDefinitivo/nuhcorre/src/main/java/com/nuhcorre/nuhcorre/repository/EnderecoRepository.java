package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    Optional<Endereco> findById(long id);

    Optional<Endereco> findByPrincipalIsTrueAndUsuario(Usuario usuario);
    Optional<Endereco> findByPrincipalIsTrueAndEmpresa(Empresa empresa);

    List<Endereco> findAllByUsuario(Usuario usuario);
    List<Endereco> findAllByEmpresa(Empresa empresa);
}
