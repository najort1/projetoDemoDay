package com.nuhcorre.nuhcorre.model.DTO;

import java.util.Map;

public record VisualizacoesPorAnoEMesDTO(
        Map<Integer, Map<Integer, Long>> visualizacoes
) {
}
