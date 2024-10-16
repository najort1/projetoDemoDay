package com.nuhcorre.nuhcorre.repository;

import java.util.Optional;

import com.nuhcorre.nuhcorre.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByEmail(String email);
}