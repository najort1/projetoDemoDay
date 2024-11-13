package com.nuhcorre.nuhcorre.model.DTO;

public record RegistroEmpresaDTO(
        String cnpj,
        String nome,
        String telefone,
        String email,
        String senha
) {
}
