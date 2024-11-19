package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.VagaDados;
import com.nuhcorre.nuhcorre.repository.VagaDadosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class VagaDadosService {

    private final VagaDadosRepository vagaDadosRepository;

    public boolean registrarVisualizacao(long vagaId, long usuarioId) {

        if(!vagaDadosRepository.existsByVagaIdAndUsuarioId(vagaId, usuarioId).isPresent()) {
            System.out.println("Registrando visualização");
            VagaDados vagaDados = new VagaDados();
            vagaDados.setVagaId(vagaId);
            vagaDados.setUsuarioId(usuarioId);
            vagaDados.setVisualizacoes(1);
            vagaDadosRepository.save(vagaDados);
            return true;
        }else{
            return false;
        }
    }
}