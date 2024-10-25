package com.nuhcorre.nuhcorre.controller;


import com.nuhcorre.nuhcorre.model.DTO.EmpresaLoginDTO;
import com.nuhcorre.nuhcorre.model.DTO.EmpresaRespostaLoginDTO;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.service.AuthenticationService;
import com.nuhcorre.nuhcorre.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/empresa")
public class EmpresaController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public EmpresaController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login/{tipoLogin}")
    public ResponseEntity<EmpresaRespostaLoginDTO> loginUsuario(EmpresaLoginDTO empresaLoginDTO, @PathVariable String tipoLogin) {
            Empresa empresa = authenticationService.loginEmpresa(empresaLoginDTO,tipoLogin);
            String token = jwtService.generateToken(empresa);
            return ResponseEntity.ok(new EmpresaRespostaLoginDTO(empresa.getNome(), empresa.getCnpj(), token));

    }



}
