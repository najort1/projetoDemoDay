package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.VagaDados;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VagaDadosRepository extends JpaRepository<VagaDados, Long> {
    Optional<VagaDados> findByVagaIdAndUsuarioId(long vagaId, long usuarioId);
    Optional<VagaDados> existsByVagaIdAndUsuarioId(long vagaId, long usuarioId);
}