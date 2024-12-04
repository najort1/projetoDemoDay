package com.nuhcorre.nuhcorre.model.DTO;

import java.util.Date;
import java.util.List;

public record UsuarioDTO(
        long id,
        String nome,
        String email,
        String cpf,
        String telefone,
        Date dataNascimento,
        List<EnderecoDTO> enderecos,
        List<VulnerabilidadeDTO> vulnerabilidades

        ) {
}
