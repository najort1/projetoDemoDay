package com.nuhcorre.nuhcorre.model.DTO;

import lombok.Data;

@Data
public class UsuarioLoginDTO {
    private String email;
    private String senha;

    public UsuarioLoginDTO() {
    }
}
