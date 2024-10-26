package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.DTO.EmpresaLoginDTO;
import com.nuhcorre.nuhcorre.model.DTO.RegistroEmpresaDTO;
import com.nuhcorre.nuhcorre.model.DTO.RegistroUsuarioDTO;
import com.nuhcorre.nuhcorre.model.DTO.UsuarioLoginDTO;
import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.repository.EmpresaRepository;
import com.nuhcorre.nuhcorre.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmpresaRepository empresaRepository;

    public Usuario loginUsuario(UsuarioLoginDTO usuarioLoginDTO, String tipoLogin) {
        Usuario usuario = buscarUsuario(usuarioLoginDTO, tipoLogin);
        validarSenha(usuarioLoginDTO.senha(), usuario.getSenha());
        autenticarUsuario(usuarioLoginDTO, tipoLogin);
        return usuario;
    }

    public Usuario cadastrarUsuario(RegistroUsuarioDTO registroUsuarioDTO) {
        verificarEmailECPFExistentes(registroUsuarioDTO.email(), registroUsuarioDTO.cpf());
        Usuario usuario = criarUsuario(registroUsuarioDTO);
        return usuarioRepository.save(usuario);
    }

    public Empresa cadastrarEmpresa(RegistroEmpresaDTO registroEmpresaDTO) {
        verificarEmailECNPJExistentes(registroEmpresaDTO.email(), registroEmpresaDTO.cnpj());
        Empresa empresa = criarEmpresa(registroEmpresaDTO);
        return empresaRepository.save(empresa);
    }

    public Empresa loginEmpresa(EmpresaLoginDTO empresaLoginDTO, String tipoLogin) {
        Empresa empresa = buscarEmpresa(empresaLoginDTO, tipoLogin);

        if (!empresa.isAtivo()) {
            throw new RuntimeException("Empresa não está ativa");
        }

        validarSenha(empresaLoginDTO.senha(), empresa.getSenha());
        autenticarEmpresa(empresaLoginDTO, tipoLogin);
        return empresa;
    }

    private Usuario buscarUsuario(UsuarioLoginDTO usuarioLoginDTO, String tipoLogin) {
        Optional<Usuario> usuarioOpt = tipoLogin.equals("cpf") ?
                usuarioRepository.findByCpf(usuarioLoginDTO.cpf()) :
                usuarioRepository.findByEmail(usuarioLoginDTO.email());
        return usuarioOpt.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    private Empresa buscarEmpresa(EmpresaLoginDTO empresaLoginDTO, String tipoLogin) {
        Optional<Empresa> empresaOpt = tipoLogin.equals("cnpj") ?
                empresaRepository.findByCnpj(empresaLoginDTO.cnpj()) :
                empresaRepository.findByEmail(empresaLoginDTO.email());
        return empresaOpt.orElseThrow(() -> new RuntimeException("Empresa não encontrada"));
    }

    private void validarSenha(String senhaInformada, String senhaArmazenada) {
        if (!passwordEncoder.matches(senhaInformada, senhaArmazenada)) {
            throw new RuntimeException("Senha inválida");
        }
    }

    private void autenticarUsuario(UsuarioLoginDTO usuarioLoginDTO, String tipoLogin) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                tipoLogin.equals("cpf") ? usuarioLoginDTO.cpf() : usuarioLoginDTO.email(),
                usuarioLoginDTO.senha()
        ));
    }

    private void autenticarEmpresa(EmpresaLoginDTO empresaLoginDTO, String tipoLogin) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                tipoLogin.equals("cnpj") ? empresaLoginDTO.cnpj() : empresaLoginDTO.email(),
                empresaLoginDTO.senha()
        ));
    }

    private void verificarEmailECPFExistentes(String email, String cpf) {
        if (usuarioRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        if (usuarioRepository.findByCpf(cpf).isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }
    }

    private void verificarEmailECNPJExistentes(String email, String cnpj) {
        if (empresaRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        if (empresaRepository.findByCnpj(cnpj).isPresent()) {
            throw new RuntimeException("CNPJ já cadastrado");
        }
    }

    private Usuario criarUsuario(RegistroUsuarioDTO registroUsuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNome(registroUsuarioDTO.nome());
        usuario.setEmail(registroUsuarioDTO.email());
        usuario.setCpf(registroUsuarioDTO.cpf());
        usuario.setSenha(passwordEncoder.encode(registroUsuarioDTO.senha()));
        usuario.setDataNascimento(registroUsuarioDTO.dataNascimento());
        usuario.setSexo(registroUsuarioDTO.sexo());
        usuario.setEndereco(registroUsuarioDTO.endereco());
        usuario.setEscolaridade(registroUsuarioDTO.escolaridade());
        usuario.setVulnerabilidade(registroUsuarioDTO.vulnerabilidade());
        usuario.setTelefone(registroUsuarioDTO.telefone());
        return usuario;
    }

    private Empresa criarEmpresa(RegistroEmpresaDTO registroEmpresaDTO) {
        Empresa empresa = new Empresa();
        empresa.setNome(registroEmpresaDTO.nome());
        empresa.setCnpj(registroEmpresaDTO.cnpj());
        empresa.setSenha(passwordEncoder.encode(registroEmpresaDTO.senha()));
        empresa.setTelefone(registroEmpresaDTO.telefone());
        empresa.setEmail(registroEmpresaDTO.email());
        empresa.setAtivo(true);
        return empresa;
    }
}