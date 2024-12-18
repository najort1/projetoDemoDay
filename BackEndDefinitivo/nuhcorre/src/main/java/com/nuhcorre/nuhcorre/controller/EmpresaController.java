package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.DTO.*;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.repository.VagaRepository;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.service.AuthenticationService;
import com.nuhcorre.nuhcorre.service.JwtService;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/empresa")
public class EmpresaController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final VagaRepository vagaRepository;

    public EmpresaController(JwtService jwtService, AuthenticationService authenticationService, VagaRepository vagaRepository) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.vagaRepository = vagaRepository;
    }

    @PostMapping("/login/{tipoLogin}")
    public ResponseEntity<EmpresaRespostaLoginDTO> loginUsuario(@RequestBody EmpresaLoginDTO empresaLoginDTO, @PathVariable String tipoLogin) {
        return ResponseEntity.ok(gerarRespostaLogin(authenticationService.loginEmpresa(empresaLoginDTO, tipoLogin)));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<EmpresaRespostaLoginDTO> cadastrarUsuario(@RequestBody RegistroEmpresaDTO registroEmpresaDTO) {
        return ResponseEntity.ok(gerarRespostaLogin(authenticationService.cadastrarEmpresa(registroEmpresaDTO)));
    }


    private EmpresaRespostaLoginDTO gerarRespostaLogin(Empresa empresa) {
        String token = jwtService.generateToken(empresa);
        return new EmpresaRespostaLoginDTO(empresa.getNome(), empresa.getCnpj(), token);
    }
}
