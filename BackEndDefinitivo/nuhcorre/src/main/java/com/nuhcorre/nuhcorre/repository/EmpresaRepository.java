package com.nuhcorre.nuhcorre.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nuhcorre.nuhcorre.model.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, String> {
    Optional<Empresa> findByCnpj(String cnpj);
    Optional<Empresa> findByEmail(String email);
    List<Empresa> findAllByNomeContaining(String nome);




}
