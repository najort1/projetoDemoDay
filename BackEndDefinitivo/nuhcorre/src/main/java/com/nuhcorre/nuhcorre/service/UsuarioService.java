package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.enums.VulnerabilidadeEnum;
import com.nuhcorre.nuhcorre.model.DTO.AtualizarUsuarioDTO;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.Vulnerabilidade;
import com.nuhcorre.nuhcorre.repository.UsuarioRepository;
import com.nuhcorre.nuhcorre.repository.VulnerabilidadeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private VulnerabilidadeRepository vulnerabilidadeRepository;

    public Usuario findById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    private Vulnerabilidade convertEnumToVulnerabilidade(VulnerabilidadeEnum vulnerabilidadeEnum) {
        Vulnerabilidade vulnerabilidade = new Vulnerabilidade();
        vulnerabilidade.setNome(vulnerabilidadeEnum.name());
        vulnerabilidade.setDescricao(vulnerabilidadeEnum.getDescricao());
        return vulnerabilidade;
    }

    public Usuario removerVulnerabilidade(Long id, String vulnerabilidade) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }

        VulnerabilidadeEnum vulnerabilidadeEnum = VulnerabilidadeEnum.valueOf(vulnerabilidade);
        if (vulnerabilidadeEnum == null) {
            throw new IllegalArgumentException("Vulnerabilidade não encontrada");
        }

        if (usuario.getVulnerabilidades() == null) {
            throw new IllegalArgumentException("Usuário não possui vulnerabilidades");
        }

        Vulnerabilidade vulnerabilidadeObj = convertEnumToVulnerabilidade(vulnerabilidadeEnum);
        usuario.getVulnerabilidades().remove(vulnerabilidadeObj);
        usuarioRepository.save(usuario);
        return usuario;
    }

    public Usuario atribuirVulnerabilidade(Long id, String vulnerabilidade) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }

        VulnerabilidadeEnum vulnerabilidadeEnum = VulnerabilidadeEnum.valueOf(vulnerabilidade);
        if (vulnerabilidadeEnum == null) {
            throw new IllegalArgumentException("Vulnerabilidade não encontrada");
        }

        if (usuario.getVulnerabilidades() == null) {
            usuario.setVulnerabilidades(new ArrayList<>());
        }

        // Verifica se o usuário já possui a vulnerabilidade
        if (usuario.getVulnerabilidades().stream().anyMatch(v -> v.getNome().equals(vulnerabilidadeEnum.name()))) {
            throw new IllegalArgumentException("Usuário já possui essa vulnerabilidade");
        }

        Vulnerabilidade vulnerabilidadeObj = convertEnumToVulnerabilidade(vulnerabilidadeEnum);
        vulnerabilidadeRepository.save(vulnerabilidadeObj); // Salve a instância de Vulnerabilidade
        usuario.getVulnerabilidades().add(vulnerabilidadeObj);
        usuarioRepository.save(usuario);
        return usuario;
    }

    public Usuario atualizarUsuario(Long id, AtualizarUsuarioDTO atualizarUsuarioDTO) {
        Usuario usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            throw new IllegalArgumentException("Usuário não encontrado");
        }
        if (atualizarUsuarioDTO.vulnerabilidades() != null) {
            List<Vulnerabilidade> vulnerabilidades = atualizarUsuarioDTO.vulnerabilidades().stream().map(vulnerabilidadeDTO -> {
                Vulnerabilidade vulnerabilidade = new Vulnerabilidade();
                vulnerabilidade.setNome(vulnerabilidadeDTO.nome());
                vulnerabilidade.setDescricao(vulnerabilidadeDTO.descricao());
                return vulnerabilidadeRepository.save(vulnerabilidade); // Salva a instância de Vulnerabilidade
            }).collect(Collectors.toList());
            usuario.setVulnerabilidades(vulnerabilidades);
        }

        if (atualizarUsuarioDTO.telefone() != null) {
            usuario.setTelefone(atualizarUsuarioDTO.telefone());
        }

        if (atualizarUsuarioDTO.cpf() != null) {
            usuario.setCpf(atualizarUsuarioDTO.cpf());
        }

        usuarioRepository.save(usuario);
        return usuario;
    }

}
