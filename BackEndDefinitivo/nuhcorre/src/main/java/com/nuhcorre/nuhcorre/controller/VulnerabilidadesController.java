package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.DTO.AtribuirVulnerabilidadeDTO;
import com.nuhcorre.nuhcorre.model.DTO.VulnerabilidadeDTO;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.Vulnerabilidade;
import com.nuhcorre.nuhcorre.model.details.EmpresaUserDetails;
import com.nuhcorre.nuhcorre.service.UsuarioService;
import com.nuhcorre.nuhcorre.service.VulnerabilidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/vulnerabilidades")
public class VulnerabilidadesController {

    private final VulnerabilidadeService vulnerabilidadeService;
    private final UsuarioService usuarioService;

    @Autowired
    public VulnerabilidadesController(VulnerabilidadeService vulnerabilidadeService, UsuarioService usuarioService) {
        this.vulnerabilidadeService = vulnerabilidadeService;
        this.usuarioService = usuarioService;
    }


    @GetMapping("/listar")
    public ResponseEntity<List<VulnerabilidadeDTO>> listarVulnerabilidades() {
        List<VulnerabilidadeDTO> vulnerabilidades = vulnerabilidadeService.retornarTodasVulnerabilidades();
        return ResponseEntity.ok(vulnerabilidades);
    }

    @PostMapping("/atribuir-vulnerabilidade")
    public ResponseEntity<?> atribuirVulnerabilidade(@RequestBody AtribuirVulnerabilidadeDTO vulnerabilidadeDTO) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Long id = usuario.getId();
            for (String vulnerabilidade : vulnerabilidadeDTO.vulnerabilidades()) {
                usuarioService.atribuirVulnerabilidade(id, vulnerabilidade);
            }
            return ResponseEntity.ok("Vulnerabilidades atribuídas com sucesso");
        } else if (principal instanceof EmpresaUserDetails) {
            return ResponseEntity.badRequest().body("Empresa não pode receber vulnerabilidade");
        } else {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }
    }

}
