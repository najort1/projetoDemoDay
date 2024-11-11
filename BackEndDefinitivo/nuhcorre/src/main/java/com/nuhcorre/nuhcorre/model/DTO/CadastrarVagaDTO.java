package com.nuhcorre.nuhcorre.model.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
@JsonInclude(JsonInclude.Include.NON_NULL)

public record CadastrarVagaDTO(
        @JsonProperty("titulo")
        String titulo,
        @JsonProperty("descricao")
        String descricao,
        @JsonProperty("requisitos")
        String requisitos,
        @JsonProperty("beneficios")
        String beneficios,
        @JsonProperty("salario")
        Double salario,
        @JsonProperty("cargaHoraria")
        String cargaHoraria,
        @JsonProperty("dataExpiracao")
        Date dataExpiracao,
        @JsonProperty("empresaId")
        String empresaId,
        @JsonProperty("enderecoId")
        Long enderecoId
) {
}