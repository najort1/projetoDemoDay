package com.nuhcorre.nuhcorre.model.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record EmpresaDTO(
        @JsonProperty("cnpj")
        String cnpj,
        @JsonProperty("nome")
        String nome,
        @JsonProperty("telefone")
        String telefone,
        @JsonProperty("email")
        String email,
        @JsonProperty("descricao")
        String descricao,
        @JsonProperty("categoria")
        String categoria,
        @JsonProperty("dataCadastro")
        Date dataCadastro,
        @JsonProperty("ativo")
        boolean ativo,
        @JsonProperty("verificado")
        boolean verificado,
        @JsonProperty("premium")
        boolean premium,
        @JsonProperty("enderecos")
        List<EnderecoDTO> enderecos
) {
}