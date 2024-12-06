package com.nuhcorre.nuhcorre.model.DTO;

import java.util.Date;

public record VagaDTO(
        Long id,
        String titulo,
        String descricao,
        String requisitos,
        String beneficios,
        Double salario,
        String cargaHoraria,
        Date dataCadastro,
        Date dataExpiracao,
        boolean status
) {
}
