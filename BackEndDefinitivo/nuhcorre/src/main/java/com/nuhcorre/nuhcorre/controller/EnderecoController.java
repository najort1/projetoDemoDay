package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.service.EnderecoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/endereco")
public class EnderecoController {

    private final EnderecoService enderecoService;

    public EnderecoController(EnderecoService enderecoService) {
        this.enderecoService = enderecoService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> salvarEndereco(@RequestBody Endereco endereco) {
        return processarEndereco(endereco, "cadastrar");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarEndereco(@PathVariable Long id) {
        Endereco endereco = enderecoService.findById(id);
        if (endereco == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado");
        }

        enderecoService.deletarEndereco(endereco);
        return ResponseEntity.ok("Endereço deletado com sucesso");
    }

    @PostMapping("/atualizar")
    public ResponseEntity<?> atualizarEndereco(@RequestBody Endereco endereco) {
        return processarEndereco(endereco, "atualizar");
    }

    @GetMapping("/principal")
    public ResponseEntity<?> getEnderecoPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        Optional<Endereco> enderecoPrincipalOptional = obterEnderecoPrincipal(principal);
        if (enderecoPrincipalOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço principal não encontrado");
        }

        return ResponseEntity.ok(enderecoPrincipalOptional.get());
    }

    private ResponseEntity<?> processarEndereco(Endereco endereco, String acao) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario usuario) {
            endereco.setUsuario(usuario);
        } else if (principal instanceof Empresa empresa) {
            endereco.setEmpresa(empresa);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Usuário ou empresa não autenticado");
        }

        if ("cadastrar".equals(acao)) {
            return ResponseEntity.ok(enderecoService.cadastrarEndereco(endereco));
        } else {
            return ResponseEntity.ok(enderecoService.atualizarEndereco(endereco));
        }
    }

    private Optional<Endereco> obterEnderecoPrincipal(Object principal) {
        if (principal instanceof Usuario usuario) {
            return enderecoService.findEnderecoPrincipalByUsuario(usuario);
        } else if (principal instanceof Empresa empresa) {
            return enderecoService.findEnderecoPrincipalByEmpresa(empresa);
        }
        return Optional.empty();
    }
}
