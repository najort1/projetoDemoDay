package com.nuhcorre.nuhcorre.controller;


import com.nuhcorre.nuhcorre.model.DTO.RegistroUsuarioDTO;
import com.nuhcorre.nuhcorre.model.DTO.UsuarioLoginDTO;
import com.nuhcorre.nuhcorre.model.DTO.UsuarioRespostaLoginDTO;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.service.AuthenticationService;
import com.nuhcorre.nuhcorre.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<UsuarioRespostaLoginDTO> loginUsuario(@RequestBody UsuarioLoginDTO usuarioLoginDTO, @PathVariable String tipoLogin) {
        Usuario usuario = authenticationService.loginUsuario(usuarioLoginDTO, tipoLogin);
        String token = jwtService.generateToken(usuario);
        return ResponseEntity.ok(new UsuarioRespostaLoginDTO(token, usuario.getNome(), usuario.getEmail(), usuario.getCpf()));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioRespostaLoginDTO> cadastrarUsuario(@RequestBody RegistroUsuarioDTO registroUsuarioDTO) {
            Usuario usuario = authenticationService.cadastrarUsuario(registroUsuarioDTO);
            String token = jwtService.generateToken(usuario);
            return ResponseEntity.ok(new UsuarioRespostaLoginDTO(token, usuario.getNome(), usuario.getEmail(), usuario.getCpf()));
    }

}
