package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.DTO.CadastrarVagaDTO;
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

import java.util.Optional;

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
            Optional<Vaga> vagaExistente = vagaService.buscarVagaPorTituloEEmpresa(vagaDTO.titulo(), vagaDTO.empresaId());
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

            Empresa empresa = empresaService.findById(vagaDTO.empresaId());
            if (empresa == null) {
                return ResponseEntity.badRequest().body("Empresa não encontrada");
            }
            vaga.setEmpresa(empresa);

            Endereco endereco = enderecoService.findById(vagaDTO.enderecoId());
            vaga.setEndereco(endereco);

            return ResponseEntity.ok(vagaService.salvarVaga(vaga));
        }
        return ResponseEntity.badRequest().body("Acesso negado");
    }

    @PostMapping("/atualizar")
    public ResponseEntity<?> atualizarVaga(@RequestBody Vaga vaga) {
        if (validaEmpresa()) {
            return ResponseEntity.ok(vagaService.atualizarVaga(vaga));
        }

        return ResponseEntity.badRequest().body("Acesso negado");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarVaga(@PathVariable Long id) {
        if (validaEmpresa()) {
            vagaService.deletarVagaPorId(id);
            return ResponseEntity.ok("Vaga deletada com sucesso");
        }

        return ResponseEntity.badRequest().body("Acesso negado");
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<?> buscarVagaPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vagaService.buscarVagaPorId(id));
    }

    @GetMapping("/buscar/todas")
    public ResponseEntity<?> buscarTodasVagas() {
        return ResponseEntity.ok(vagaService.buscarTodasVagas());
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
}