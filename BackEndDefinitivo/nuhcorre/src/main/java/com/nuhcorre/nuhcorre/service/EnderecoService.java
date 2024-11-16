package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.repository.EnderecoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    public Endereco findById(Long id) {
        return enderecoRepository.findById(id).orElse(null);
    }

    public Endereco cadastrarEndereco(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public void deletarEndereco(Endereco endereco) {
        enderecoRepository.delete(endereco);
    }

    public void deletarPorId(Long id) {
        enderecoRepository.deleteById(id);
    }

    public Optional<Endereco> findEnderecoPrincipalByUsuario(Usuario usuario) {
        return enderecoRepository.findByPrincipalIsTrueAndUsuario(usuario);
    }

    public Optional<Endereco> findEnderecoPrincipalByEmpresa(Empresa empresa) {
        return enderecoRepository.findByPrincipalIsTrueAndEmpresa(empresa);
    }

    public Endereco atualizarEndereco(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    public List<Endereco> findAllByUsuario(Usuario usuario) {
        return enderecoRepository.findAllByUsuario(usuario);
    }

    public List<Endereco> findAllByEmpresa(Empresa empresa) {
        return enderecoRepository.findAllByEmpresa(empresa);
    }
}
