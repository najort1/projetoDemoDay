package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.DTO.AtualizarEnderecoDTO;
import com.nuhcorre.nuhcorre.model.DTO.CadastrarEnderecoDTO;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.model.details.EmpresaUserDetails;
import com.nuhcorre.nuhcorre.service.EmpresaService;
import com.nuhcorre.nuhcorre.service.EnderecoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/endereco")
public class EnderecoController {
    private final EnderecoService enderecoService;
    private final EmpresaService empresaService;

    public EnderecoController(EnderecoService enderecoService, EmpresaService empresaService) {
        this.enderecoService = enderecoService;
        this.empresaService = empresaService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarEndereco(@RequestBody CadastrarEnderecoDTO cadastrarEnderecoDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Endereco endereco = new Endereco();
            endereco.setRua(cadastrarEnderecoDTO.rua());
            endereco.setNumero(cadastrarEnderecoDTO.numero());
            endereco.setCidade(cadastrarEnderecoDTO.cidade());
            endereco.setEstado(cadastrarEnderecoDTO.estado());
            endereco.setCep(cadastrarEnderecoDTO.cep());
            endereco.setUsuario(usuario);
            enderecoService.cadastrarEndereco(endereco);
            return ResponseEntity.status(HttpStatus.CREATED).body("Endereço cadastrado com sucesso.");
        } else if (principal instanceof EmpresaUserDetails) {
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) principal;
            Empresa empresa = empresaUserDetails.getEmpresa();
            Endereco endereco = new Endereco();
            endereco.setRua(cadastrarEnderecoDTO.rua());
            endereco.setNumero(cadastrarEnderecoDTO.numero());
            endereco.setCidade(cadastrarEnderecoDTO.cidade());
            endereco.setEstado(cadastrarEnderecoDTO.estado());
            endereco.setCep(cadastrarEnderecoDTO.cep());
            endereco.setEmpresa(empresa);
            enderecoService.cadastrarEndereco(endereco);
            return ResponseEntity.status(HttpStatus.CREATED).body("Endereço cadastrado com sucesso.");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autorizado.");
    }

    @GetMapping("/capturar-todos")
    public ResponseEntity<?> capturarTodosEnderecos() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            return ResponseEntity.ok(enderecoService.findAllByUsuario(usuario));
        } else if (principal instanceof EmpresaUserDetails) {
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) principal;
            Empresa empresa = empresaUserDetails.getEmpresa();
            return ResponseEntity.ok(enderecoService.findAllByEmpresa(empresa));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autorizado.");
    }

    @GetMapping("/capturar/{id}")
    public ResponseEntity<?> capturarEnderecoPorId(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        System.out.println(principal);

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Endereco endereco = enderecoService.findById(id);
            if (endereco == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado.");
            }

            if(endereco.getUsuario().getId() == usuario.getId()){
                return ResponseEntity.ok(endereco);
            }

        }else if (principal instanceof EmpresaUserDetails) {
            System.out.println("Empresa buscando endereço por id");
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) principal;
            Empresa empresa = empresaUserDetails.getEmpresa();
            Endereco endereco = enderecoService.findById(id);
            if (endereco == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado.");
            }
            if (endereco.getEmpresa().getCnpj().trim().equals(empresa.getCnpj().trim())) {
                System.out.println("Empresa encontrou o endereço");
                return ResponseEntity.ok(endereco);
            }

            System.out.println("Empresa não encontrou o endereço");
            System.out.println("Empresa: " + empresa.getCnpj());
            System.out.println("Endereço: " + endereco.getEmpresa().getCnpj());

        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autorizado.");
    }

    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<?> deletarEndereco(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Endereco endereco = enderecoService.findById(id);
            if (endereco == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado.");
            }

            if(endereco.getUsuario().getId() == usuario.getId()){
                enderecoService.deletarEndereco(endereco);
                return ResponseEntity.ok("Endereço deletado com sucesso.");
            }

        }else if (principal instanceof EmpresaUserDetails) {
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) principal;
            Empresa empresa = empresaUserDetails.getEmpresa();
            Endereco endereco = enderecoService.findById(id);
            if (endereco == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado.");
            }
            if (endereco.getEmpresa().getCnpj().trim().equals(empresa.getCnpj().trim())) {
                enderecoService.deletarEndereco(endereco);
                return ResponseEntity.ok("Endereço deletado com sucesso.");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autorizado.");
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizarEndereco(@RequestBody AtualizarEnderecoDTO atualizarEnderecoDTO, @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;
            Endereco endereco = enderecoService.findById(id);
            if (endereco == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado.");
            }

            if (endereco.getUsuario().getId() == usuario.getId()) {
                endereco.setRua(atualizarEnderecoDTO.rua());
                endereco.setNumero(atualizarEnderecoDTO.numero());
                endereco.setCidade(atualizarEnderecoDTO.cidade());
                endereco.setEstado(atualizarEnderecoDTO.estado());
                endereco.setCep(atualizarEnderecoDTO.cep());
                enderecoService.atualizarEndereco(endereco);
                return ResponseEntity.ok("Endereço atualizado com sucesso.");
            }
        }else if (principal instanceof EmpresaUserDetails) {
            EmpresaUserDetails empresaUserDetails = (EmpresaUserDetails) principal;
            Empresa empresa = empresaUserDetails.getEmpresa();
            Endereco endereco = enderecoService.findById(id);
            if (endereco == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado.");
            }

            if (endereco.getEmpresa().getCnpj().trim().equals(empresa.getCnpj().trim())) {
                endereco.setRua(atualizarEnderecoDTO.rua());
                endereco.setNumero(atualizarEnderecoDTO.numero());
                endereco.setCidade(atualizarEnderecoDTO.cidade());
                endereco.setEstado(atualizarEnderecoDTO.estado());
                endereco.setCep(atualizarEnderecoDTO.cep());
                enderecoService.atualizarEndereco(endereco);
                return ResponseEntity.ok("Endereço atualizado com sucesso.");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autorizado.");

    }


}