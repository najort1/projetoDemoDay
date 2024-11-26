package com.nuhcorre.nuhcorre.model.DTO;

import com.nuhcorre.nuhcorre.model.Vaga;
import java.util.List;

public record RespostaVagasEmpresa(
        List<Vaga> vagas
) {
}