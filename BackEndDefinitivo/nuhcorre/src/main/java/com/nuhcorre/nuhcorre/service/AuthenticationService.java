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
        Usuario usuario;
        if(tipoLogin.equals("cpf")){
            usuario = usuarioRepository.findByCpf(usuarioLoginDTO.cpf())
                    .orElseThrow(() -> new RuntimeException("CPF ou senha inválidos"));
        } else {
            usuario = usuarioRepository.findByEmail(usuarioLoginDTO.email())
                    .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
        }

        if(!passwordEncoder.matches(usuarioLoginDTO.senha(), usuario.getSenha())){
            throw new RuntimeException("CPF ou senha inválidos");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                tipoLogin.equals("cpf") ? usuarioLoginDTO.cpf() : usuarioLoginDTO.email(),
                usuarioLoginDTO.senha()
        ));

        return usuario;
    }

    public Usuario cadastrarUsuario(RegistroUsuarioDTO registroUsuarioDTO) {
        if(usuarioRepository.findByEmail(registroUsuarioDTO.email()).isPresent()){
            throw new RuntimeException("Email já cadastrado");
        }

        if(usuarioRepository.findByCpf(registroUsuarioDTO.cpf()).isPresent()){
            throw new RuntimeException("CPF já cadastrado");
        }

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

        return usuarioRepository.save(usuario);



    }

    public Empresa cadastrarEmpresa(RegistroEmpresaDTO registroEmpresaDTO) {
        if(empresaRepository.findByEmail(registroEmpresaDTO.email()).isPresent()){
            throw new RuntimeException("Email já cadastrado");
        }

        if(empresaRepository.findByCnpj(registroEmpresaDTO.cnpj()).isPresent()){
            throw new RuntimeException("CNPJ já cadastrado");
        }

        Empresa empresa = new Empresa();

        empresa.setNome(registroEmpresaDTO.nome());
        empresa.setCnpj(registroEmpresaDTO.cnpj());
        empresa.setSenha(passwordEncoder.encode(registroEmpresaDTO.senha()));
        empresa.setTelefone(registroEmpresaDTO.telefone());
        empresa.setEmail(registroEmpresaDTO.email());
        return empresaRepository.save(empresa);
    }

    public Empresa loginEmpresa(EmpresaLoginDTO empresaLoginDTO, String tipoLogin) {
        Empresa empresa;
        if(tipoLogin.equals("cnpj")){
            empresa = empresaRepository.findByCnpj(empresaLoginDTO.cnpj())
                    .orElseThrow(() -> new RuntimeException("CNPJ ou senha inválidos"));
        } else {
            empresa = empresaRepository.findByEmail(empresaLoginDTO.email())
                    .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
        }

        if(!passwordEncoder.matches(empresaLoginDTO.senha(), empresa.getSenha())){
            throw new RuntimeException("CNPJ ou senha inválidos");
        }

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                tipoLogin.equals("cnpj") ? empresaLoginDTO.cnpj() : empresaLoginDTO.email(),
                empresaLoginDTO.senha()
        ));

        return empresa;
    }

}