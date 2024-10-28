package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {

    Vaga findByTitulo(String titulo);
    Vaga findAllByEmpresaId(Long id);

}