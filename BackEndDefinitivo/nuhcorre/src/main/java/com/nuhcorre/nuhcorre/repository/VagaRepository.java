package com.nuhcorre.nuhcorre.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nuhcorre.nuhcorre.model.Vaga;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {
    List<Vaga> findByTituloContaining(String titulo);
    List<Vaga> findByDescricaoContaining(String descricao);
    List<Vaga> findByEmpresaCnpj(String cnpj); // Corrigido para usar cnpj
    Optional<Vaga> findByTituloAndEmpresaCnpj(String titulo, String empresaId);
}