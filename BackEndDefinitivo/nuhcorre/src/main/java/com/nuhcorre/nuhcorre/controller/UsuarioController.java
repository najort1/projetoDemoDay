package com.nuhcorre.nuhcorre.controller;


import com.nuhcorre.nuhcorre.model.DTO.RegistroUsuarioDTO;
import com.nuhcorre.nuhcorre.model.DTO.UsuarioLoginDTO;
import com.nuhcorre.nuhcorre.model.DTO.UsuarioRespostaLoginDTO;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.service.AuthenticationService;
import com.nuhcorre.nuhcorre.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public UsuarioController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login/{tipoLogin}")
    public ResponseEntity<UsuarioRespostaLoginDTO> loginUsuario(UsuarioLoginDTO usuarioLoginDTO, @PathVariable String tipoLogin) {
        {
            Usuario usuario = authenticationService.loginUsuario(usuarioLoginDTO, tipoLogin);
            String token = jwtService.generateToken(usuario);
            return ResponseEntity.ok(new UsuarioRespostaLoginDTO(token, usuario.getNome(), usuario.getEmail(), usuario.getCpf()));
        }
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> cadastrarUsuario(RegistroUsuarioDTO registroUsuarioDTO) {
            Usuario usuario = authenticationService.cadastrarUsuario(registroUsuarioDTO);
            String token = jwtService.generateToken(usuario);
            return ResponseEntity.ok(usuario);
    }

}
