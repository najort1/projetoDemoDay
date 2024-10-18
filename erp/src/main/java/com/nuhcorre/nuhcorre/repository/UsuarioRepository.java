package com.nuhcorre.nuhcorre.repository;

import com.nuhcorre.nuhcorre.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String username);

    @Query(value = "select id from usuario where email = ?1",nativeQuery = true)
    Long findIdByEmail(String email);

}
