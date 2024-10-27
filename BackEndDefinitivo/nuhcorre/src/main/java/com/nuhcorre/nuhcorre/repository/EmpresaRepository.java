package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmpresaRepository extends JpaRepository<Empresa, String> {
    Optional<Empresa> findByCnpj(String cnpj);
    Optional<Empresa> findByEmail(String email);


    List<Empresa> findAllByCategoria(String categoria);
    List<Empresa> findAllByNomeContaining(String nome);




}
