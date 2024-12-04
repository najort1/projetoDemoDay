package com.nuhcorre.nuhcorre.model.DTO;

public record EnderecoDTO(
        Long id,
        String cep,
        String cidade,
        String estado,
        String rua,
        String numero

) {
}
