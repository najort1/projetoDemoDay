package com.nuhcorre.nuhcorre.model.DTO;

public record RegistroUsuarioDTO(
        String email,
        String senha,
        String nome,
        String cpf,
        String dataNascimento,
        String sexo,
        String telefone
) {
}
