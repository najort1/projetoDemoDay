package com.nuhcorre.nuhcorre.model.DTO;

public record AtualizarEnderecoDTO(
        String cep,
        String cidade,
        String estado,
        String rua,
        String numero,
        Boolean principal
) {
}
