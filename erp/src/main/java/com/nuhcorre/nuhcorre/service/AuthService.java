package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.exception.DataIntegrityException;
import com.nuhcorre.nuhcorre.model.DAO.UsuarioSecurityDAO;
import com.nuhcorre.nuhcorre.model.DTO.LoginRequestDto;
import com.nuhcorre.nuhcorre.model.Usuario;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nuhcorre.nuhcorre.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioService usuarioService;


    public Boolean login(LoginRequestDto request, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
            UsuarioSecurityDAO usuarioSecurityDAO = new UsuarioSecurityDAO(user.getId(), user.getEmail(), user.getSenha(), user.getAtivo());
            var jwt = jwtService.generateToken(usuarioSecurityDAO);
            response.setHeader("Authorization", jwt);
            response.addHeader("access-control-expose-headers", "Authorization");

            return true;
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityException("Usuário ou senha inválidos");
        }
    }


}
