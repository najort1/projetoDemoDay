package com.nuhcorre.nuhcorre.model.DTO;

import java.util.Date;
import java.util.List;

public record EmpresaDTO(
        String cnpj,
        String nome,
        String telefone,
        String email,
        String descricao,
        String categoria,
        Date dataCadastro,
        boolean ativo,
        boolean verificado,
        boolean premium,
        List<EnderecoDTO> enderecos
) {
}