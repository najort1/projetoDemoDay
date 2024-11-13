package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.Vaga;
import com.nuhcorre.nuhcorre.repository.VagaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VagaService {
    private final VagaRepository vagaRepository;

    public Vaga salvarVaga(Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    public Vaga buscarVagaPorId(Long id) {
        return vagaRepository.findById(id).orElse(null);
    }

    public void deletarVagaPorId(Long id) {
        vagaRepository.deleteById(id);
    }

    public Vaga atualizarVaga(Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    public Iterable<Vaga> buscarTodasVagas() {
        return vagaRepository.findAll();
    }

    public Iterable<Vaga> buscarVagasPorTitulo(String titulo) {
        return vagaRepository.findByTituloContaining(titulo);
    }

    public Iterable<Vaga> buscarVagasPorDescricao(String descricao) {
        return vagaRepository.findByDescricaoContaining(descricao);
    }


    public Iterable<Vaga> buscarVagasPorCnpjEmpresa(String cnpj) {
        return vagaRepository.findByEmpresaCnpj(cnpj);
    }

    public Optional<Vaga> buscarVagaPorTituloEEmpresa(String titulo, String empresaId) {
        return vagaRepository.findByTituloAndEmpresaCnpj(titulo, empresaId);
    }
}