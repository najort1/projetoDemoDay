package com.nuhcorre.nuhcorre.controller;


import com.nuhcorre.nuhcorre.model.DTO.EnderecoDTO;
import com.nuhcorre.nuhcorre.model.DTO.UsuarioDTO;
import com.nuhcorre.nuhcorre.model.DTO.VulnerabilidadeDTO;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dados")
public class DadosController {

    private final UsuarioService usuarioService;

    public DadosController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/informacoes/{id}")
    public ResponseEntity<UsuarioDTO> getUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        UsuarioDTO usuarioDTO = new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getCpf(),
                usuario.getTelefone(),
                usuario.getDataNascimento(),
                usuario.getEnderecos().stream().map(endereco -> new EnderecoDTO(
                        endereco.getId(),
                        endereco.getCep(),
                        endereco.getCidade(),
                        endereco.getEstado(),
                        endereco.getRua(),
                        endereco.getNumero()
                )).toList(),
                usuario.getVulnerabilidades().stream().map(vulnerabilidade -> new VulnerabilidadeDTO(
                        vulnerabilidade.getNome(),
                        vulnerabilidade.getDescricao()
                )).toList()
        );
        return ResponseEntity.ok(usuarioDTO);
    }

}
