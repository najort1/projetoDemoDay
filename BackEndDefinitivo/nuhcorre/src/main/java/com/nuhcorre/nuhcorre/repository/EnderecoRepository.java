package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    Optional<Endereco> findById(long id);

}
