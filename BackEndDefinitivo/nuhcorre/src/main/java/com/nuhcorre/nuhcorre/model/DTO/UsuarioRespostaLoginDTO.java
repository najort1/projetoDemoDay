package com.nuhcorre.nuhcorre.model.DTO;

public record UsuarioRespostaLoginDTO(
        String token,
        String nome,
        String email,
        String cpf
) {
}
