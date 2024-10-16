package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.DTO.LoginRequestDto;
import com.nuhcorre.nuhcorre.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController

@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/authenticate")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto usuario, HttpServletResponse response) {

        Boolean usuarioValido = authService.login(usuario,response);

        if (usuarioValido) {
            return ResponseEntity.ok("Usuário logado com sucesso!");
        } else {
            return ResponseEntity.status(401).body("Usuário ou senha inválidos!");
        }

    }

}