package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.Vaga;
import com.nuhcorre.nuhcorre.model.VagaDados;
import com.nuhcorre.nuhcorre.repository.VagaDadosRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VagaDadosService {

    private final VagaDadosRepository vagaDadosRepository;

    public boolean registrarVisualizacao(long vagaId, long usuarioId) {

        System.out.println("Verificando se já existe visualização" + vagaId + " " + usuarioId + " " + vagaDadosRepository.existsByVagaIdAndUsuarioId(vagaId, usuarioId));
        Optional<VagaDados> JaVisualizou = vagaDadosRepository.existsByVagaIdAndUsuarioId(vagaId, usuarioId);

        if (JaVisualizou.isPresent()) {
            System.out.println("Já visualizou");
            return false;
        }

        VagaDados vagaDados = new VagaDados();
        vagaDados.setVagaId(vagaId);
        vagaDados.setUsuarioId(usuarioId);
        vagaDados.setVisualizacoes(1);
        vagaDados.setTimestamp(new Date());
        vagaDadosRepository.save(vagaDados);
        return true;



    }

    public Map<Integer, Map<Integer, Long>> getVisualizacoesPorAnoEMes(long vagaId) {
        List<VagaDados> visualizacoes = vagaDadosRepository.findByVagaId(vagaId);

        return visualizacoes.stream()
                .collect(Collectors.groupingBy(
                        vagaDados -> vagaDados.getTimestamp().getYear() + 1900,
                        Collectors.groupingBy(
                                vagaDados -> vagaDados.getTimestamp().getMonth() + 1,
                                Collectors.counting()
                        )
                ));
    }


}