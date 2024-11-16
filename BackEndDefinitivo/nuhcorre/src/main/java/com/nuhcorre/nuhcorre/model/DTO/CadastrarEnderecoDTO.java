package com.nuhcorre.nuhcorre.model.DTO;

public record CadastrarEnderecoDTO(
        String cep,
        String cidade,
        String estado,
        String rua,
        String numero
) {
}
