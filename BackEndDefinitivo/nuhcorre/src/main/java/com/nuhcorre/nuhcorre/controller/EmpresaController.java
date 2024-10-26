package com.nuhcorre.nuhcorre.controller;


import com.nuhcorre.nuhcorre.model.DTO.EmpresaLoginDTO;
import com.nuhcorre.nuhcorre.model.DTO.EmpresaRespostaLoginDTO;
import com.nuhcorre.nuhcorre.model.DTO.RegistroEmpresaDTO;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.service.AuthenticationService;
import com.nuhcorre.nuhcorre.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<EmpresaRespostaLoginDTO> loginUsuario(@RequestBody EmpresaLoginDTO empresaLoginDTO, @PathVariable String tipoLogin) {
        System.out.println("Recebido no Postman:");
        System.out.println("empresaLoginDTO: " + empresaLoginDTO);
        System.out.println("tipoLogin: " + tipoLogin);
        System.out.println("empresaLoginDTO.cnpj(): " + empresaLoginDTO.cnpj());
        System.out.println("empresaLoginDTO.email(): " + empresaLoginDTO.email());
        System.out.println("empresaLoginDTO.senha(): " + empresaLoginDTO.senha());

        Empresa empresa = authenticationService.loginEmpresa(empresaLoginDTO, tipoLogin);
        String token = jwtService.generateToken(empresa);
        return ResponseEntity.ok(new EmpresaRespostaLoginDTO(empresa.getNome(), empresa.getCnpj(), token));
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<EmpresaRespostaLoginDTO> cadastrarUsuario(@RequestBody RegistroEmpresaDTO registroEmpresaDTO) {
        Empresa empresa = authenticationService.cadastrarEmpresa(registroEmpresaDTO);
        String token = jwtService.generateToken(empresa);
        return ResponseEntity.ok(new EmpresaRespostaLoginDTO(empresa.getNome(), empresa.getCnpj(), token));
    }



}
