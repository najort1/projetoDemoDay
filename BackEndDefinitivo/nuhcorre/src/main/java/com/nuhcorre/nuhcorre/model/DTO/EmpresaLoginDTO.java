package com.nuhcorre.nuhcorre.model.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record EmpresaLoginDTO(
        @JsonProperty("email")
        String email,

        @JsonProperty("senha")
        String senha,

        @JsonProperty("cnpj")
        String cnpj

){
}
