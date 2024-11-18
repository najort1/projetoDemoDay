package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.DTO.CadastrarVagaDTO;
import com.nuhcorre.nuhcorre.model.DTO.EmpresaRespostaVagaDTO;
import com.nuhcorre.nuhcorre.model.DTO.VagaRespostaDTO;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.Vaga;
import com.nuhcorre.nuhcorre.model.details.EmpresaUserDetails;
import com.nuhcorre.nuhcorre.service.EmpresaService;
import com.nuhcorre.nuhcorre.service.EnderecoService;
import com.nuhcorre.nuhcorre.service.VagaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vaga")
public class VagaController {
    private final VagaService vagaService;
    private final EmpresaService empresaService;
    private final EnderecoService enderecoService;

    public VagaController(VagaService vagaService, EmpresaService empresaService, EnderecoService enderecoService) {
        this.vagaService = vagaService;
        this.empresaService = empresaService;
        this.enderecoService = enderecoService;
    }

    public Boolean validaEmpresa() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof EmpresaUserDetails) {
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) principal;
            return empresaUserDetails.isEnabled();
        }

        return false;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarVaga(@RequestBody CadastrarVagaDTO vagaDTO) {
        if (validaEmpresa()) {

            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            String cnpj = empresaUserDetails.getEmpresa().getCnpj();


            Optional<Vaga> vagaExistente = vagaService.buscarVagaPorTituloEEmpresa(vagaDTO.titulo(), cnpj);
            if (vagaExistente.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Vaga já existe com os mesmos valores únicos.");
            }
            Vaga vaga = new Vaga();
            vaga.setTitulo(vagaDTO.titulo());
            vaga.setDescricao(vagaDTO.descricao());
            vaga.setRequisitos(vagaDTO.requisitos());
            vaga.setBeneficios(vagaDTO.beneficios());
            vaga.setSalario(vagaDTO.salario());
            vaga.setCargaHoraria(vagaDTO.cargaHoraria());
            vaga.setDataExpiracao(vagaDTO.dataExpiracao());
            vaga.setStatus(vagaDTO.status());

            Empresa empresa = empresaService.findById(cnpj);
            if (empresa == null) {
                return ResponseEntity.badRequest().body("Empresa não encontrada");
            }
            vaga.setEmpresa(empresa);

            Endereco endereco = enderecoService.findById(vagaDTO.enderecoId());

            if (endereco == null) {
                return ResponseEntity.badRequest().body("Endereço não encontrado");
            }

            vaga.setEndereco(endereco);

            return ResponseEntity.ok(vagaService.salvarVaga(vaga));
        }
        return ResponseEntity.badRequest().body("Acesso negado");
    }

    @PostMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarVaga(@RequestBody CadastrarVagaDTO cadastrarVagaDTO, @PathVariable Long id) {
        if (validaEmpresa()) {


            Vaga vaga = vagaService.buscarVagaPorId(id);
            if (vaga == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaga não encontrada");
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) authentication.getPrincipal();
            Empresa empresaAutenticada = empresaUserDetails.getEmpresa();

            Empresa empresaVaga = vaga.getEmpresa();
            if (empresaVaga != null && !empresaVaga.getCnpj().equals(empresaAutenticada.getCnpj())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado");
            }

            vaga.setTitulo(cadastrarVagaDTO.titulo());
            vaga.setDescricao(cadastrarVagaDTO.descricao());
            vaga.setRequisitos(cadastrarVagaDTO.requisitos());
            vaga.setBeneficios(cadastrarVagaDTO.beneficios());
            vaga.setSalario(cadastrarVagaDTO.salario());
            vaga.setCargaHoraria(cadastrarVagaDTO.cargaHoraria());
            vaga.setDataExpiracao(cadastrarVagaDTO.dataExpiracao());
            vaga.setStatus(cadastrarVagaDTO.status());

            Empresa empresa = empresaService.findById(empresaAutenticada.getCnpj());
            if (empresa == null) {
                return ResponseEntity.badRequest().body("Empresa não encontrada");
            }
            vaga.setEmpresa(empresa);

            Endereco endereco = enderecoService.findById(cadastrarVagaDTO.enderecoId());

            if (endereco == null) {
                return ResponseEntity.badRequest().body("Endereço não encontrado");
            }

            vaga.setEndereco(endereco);

            return ResponseEntity.ok(vagaService.salvarVaga(vaga));

        }

        return ResponseEntity.badRequest().body("Acesso negado");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarVaga(@PathVariable Long id) {
        if (validaEmpresa()) {
            Vaga vaga = vagaService.buscarVagaPorId(id);
            if (vaga == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Vaga não encontrada");
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) authentication.getPrincipal();
            Empresa empresaAutenticada = empresaUserDetails.getEmpresa();

            Empresa empresaVaga = vaga.getEmpresa();
            if (empresaVaga != null && !empresaVaga.getCnpj().equals(empresaAutenticada.getCnpj())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Acesso negado");
            }

            vagaService.deletarVagaPorId(id);
            return ResponseEntity.ok("Vaga deletada com sucesso");
        }

        return ResponseEntity.badRequest().body("Acesso negado");
    }

    @GetMapping("/buscar/todas")
    public ResponseEntity<?> buscarTodasVagas() {
        List<Vaga> vagas = (List<Vaga>) vagaService.buscarTodasVagas();
        List<VagaRespostaDTO> vagasDTO = vagas.stream().map(vaga -> {
            Empresa empresa = vaga.getEmpresa();
            EmpresaRespostaVagaDTO empresaRespostaVagaDTO = null;
            if (empresa != null) {
                empresaRespostaVagaDTO = new EmpresaRespostaVagaDTO(
                        empresa.getCnpj(),
                        empresa.getNome(),
                        empresa.getEmail(),
                        empresa.getTelefone()
                );
            }
            return new VagaRespostaDTO(
                    vaga.getId(),
                    vaga.getTitulo(),
                    vaga.getDescricao(),
                    vaga.getRequisitos(),
                    vaga.getBeneficios(),
                    vaga.getSalario(),
                    vaga.getCargaHoraria(),
                    vaga.getDataCadastro(),
                    vaga.getDataExpiracao(),
                    vaga.isStatus(),
                    vaga.getEndereco(),
                    empresaRespostaVagaDTO
            );
        }).collect(Collectors.toList());
        return ResponseEntity.ok(vagasDTO);
    }

    @GetMapping("/buscar/titulo/{titulo}")
    public ResponseEntity<?> buscarVagasPorTitulo(@PathVariable String titulo) {
        return ResponseEntity.ok(vagaService.buscarVagasPorTitulo(titulo));
    }

    @GetMapping("/buscar/descricao/{descricao}")
    public ResponseEntity<?> buscarVagasPorDescricao(@PathVariable String descricao) {
        return ResponseEntity.ok(vagaService.buscarVagasPorDescricao(descricao));
    }

    @GetMapping("/buscar/cnpj/{cnpj}")
    public ResponseEntity<?> buscarVagasPorCnpjEmpresa(@PathVariable String cnpj) {
        return ResponseEntity.ok(vagaService.buscarVagasPorCnpjEmpresa(cnpj));
    }

    @PostMapping("/{vagaId}/candidatar")
    public ResponseEntity<?> candidatarUsuario(@PathVariable Long vagaId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Object principal = authentication.getPrincipal();

            if (!(principal instanceof Usuario)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
            }

            Usuario usuario = (Usuario) principal;
            Long usuarioId = usuario.getId();


            Vaga vaga = vagaService.candidatarUsuarioAVaga(vagaId, usuarioId);
            return ResponseEntity.ok(vaga);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}