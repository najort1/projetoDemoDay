package com.nuhcorre.nuhcorre.model.DTO;

import com.nuhcorre.nuhcorre.model.Endereco;

import java.util.Date;

public record VagaRespostaDTO(
        Long id,
        String titulo,
        String descricao,
        String requisitos,
        String beneficios,
        Double salario,
        String cargaHoraria,
        Date dataCadastro,
        Date dataExpiracao,
        boolean status,
        Endereco endereco,
        EmpresaRespostaVagaDTO empresa,
        Integer candidaturas
) {
}
