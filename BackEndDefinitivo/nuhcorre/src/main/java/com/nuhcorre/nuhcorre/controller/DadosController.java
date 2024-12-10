package com.nuhcorre.nuhcorre.controller;


import com.nuhcorre.nuhcorre.model.DTO.*;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.Vulnerabilidade;
import com.nuhcorre.nuhcorre.model.details.EmpresaUserDetails;
import com.nuhcorre.nuhcorre.service.EmpresaService;
import com.nuhcorre.nuhcorre.service.UsuarioService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dados")
public class DadosController {

    private final UsuarioService usuarioService;
    private final EmpresaService empresaService;

    public DadosController(UsuarioService usuarioService, EmpresaService empresaService) {
        this.usuarioService = usuarioService;
        this.empresaService = empresaService;
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

    @Transactional
    @GetMapping("/empresa")
    public ResponseEntity<EmpresaDTO> getEmpresaLogada() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof EmpresaUserDetails) {
            String cnpj = ((EmpresaUserDetails) principal).getEmpresa().getCnpj();
            Empresa empresa = empresaService.findById(cnpj);
            if (empresa == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            EmpresaDTO empresaDTO = new EmpresaDTO(
                    empresa.getCnpj(),
                    empresa.getNome(),
                    empresa.getTelefone(),
                    empresa.getEmail(),
                    empresa.getDescricao(),
                    empresa.getCategoria(),
                    empresa.getDataCadastro(),
                    empresa.isAtivo(),
                    empresa.isVerificado(),
                    empresa.isPremium(),
                    empresa.getEnderecos().stream().map(endereco -> new EnderecoDTO(
                            endereco.getId(),
                            endereco.getCep(),
                            endereco.getCidade(),
                            endereco.getEstado(),
                            endereco.getRua(),
                            endereco.getNumero()
                    )).toList()
            );
            return ResponseEntity.ok(empresaDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/empresa/atualizar")
    public ResponseEntity<AtualizarEmpresaDTO> atualizarEmpresa(@RequestBody AtualizarEmpresaDTO empresaDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof EmpresaUserDetails) {
            Empresa empresa = ((EmpresaUserDetails) principal).getEmpresa();

            empresa.setNome(empresaDTO.nome());
            empresa.setTelefone(empresaDTO.telefone());
            empresa.setDescricao(empresaDTO.descricao());
            empresa.setCategoria(empresaDTO.categoria());


            empresaService.atualizarEmpresa(empresa);

            return ResponseEntity.ok(empresaDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/usuario")
    public ResponseEntity<UsuarioDTO> getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Long usuarioId=  usuario.getId();
            Usuario usuarioAtual = usuarioService.findById(usuarioId);

            UsuarioDTO usuarioDTO = new UsuarioDTO(
                    usuarioAtual.getId(),
                    usuarioAtual.getNome(),
                    usuarioAtual.getEmail(),
                    usuarioAtual.getCpf(),
                    usuarioAtual.getTelefone(),
                    usuarioAtual.getDataNascimento(),
                    usuarioAtual.getEnderecos().stream().map(endereco -> new EnderecoDTO(
                            endereco.getId(),
                            endereco.getCep(),
                            endereco.getCidade(),
                            endereco.getEstado(),
                            endereco.getRua(),
                            endereco.getNumero()
                    )).toList(),
                    usuarioAtual.getVulnerabilidades().stream().map(vulnerabilidade -> new VulnerabilidadeDTO(
                            vulnerabilidade.getNome(),
                            vulnerabilidade.getDescricao()
                    )).toList()
            );

            return ResponseEntity.ok(usuarioDTO);

        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/usuario/atualizar")
    public ResponseEntity<AtualizarUsuarioDTO> atualizarUsuario(@RequestBody AtualizarUsuarioDTO usuarioDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Long id = usuario.getId();

            usuarioService.atualizarUsuario(id, usuarioDTO);

            return ResponseEntity.ok(usuarioDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}