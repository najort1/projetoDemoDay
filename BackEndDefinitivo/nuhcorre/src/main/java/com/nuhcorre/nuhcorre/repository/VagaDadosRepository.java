package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.VagaDados;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VagaDadosRepository extends JpaRepository<VagaDados, Long> {
    boolean existsByVagaIdAndUsuarioId(long vagaId, long usuarioId);

    void deleteByVagaIdAndUsuarioId(long vagaId, long usuarioId);

    List<VagaDados> findByVagaId(long vagaId);

    List<VagaDados> findByVagaIdAndTimestampBetween(long vagaId, Date inicio, Date fim);
}