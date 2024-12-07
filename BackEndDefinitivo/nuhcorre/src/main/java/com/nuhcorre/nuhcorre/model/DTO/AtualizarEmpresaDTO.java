package com.nuhcorre.nuhcorre.model.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.List;
@JsonInclude(JsonInclude.Include.NON_NULL)
public record AtualizarEmpresaDTO(
        @JsonProperty("nome")
        String nome,
        @JsonProperty("telefone")
        String telefone,
        @JsonProperty("descricao")
        String descricao,
        @JsonProperty("categoria")
        String categoria

) {

}
