package com.nuhcorre.nuhcorre.model.DTO;

public record RespostaCadastroEnderecoDTO(
        Long id,
        String cep,
        String cidade,
        String estado,
        String rua,
        String numero
) {
}
