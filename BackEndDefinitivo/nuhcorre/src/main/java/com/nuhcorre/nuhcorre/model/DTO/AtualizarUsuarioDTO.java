package com.nuhcorre.nuhcorre.model.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)

public record AtualizarUsuarioDTO(
        @JsonProperty("cpf")
        String cpf,
        @JsonProperty("telefone")
        String telefone,
        @JsonProperty("vulnerabilidades")
        List<VulnerabilidadeDTO> vulnerabilidades

) {
}
