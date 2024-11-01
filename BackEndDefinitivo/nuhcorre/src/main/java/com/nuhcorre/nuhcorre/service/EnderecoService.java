package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.Endereco;
import com.nuhcorre.nuhcorre.repository.EnderecoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EnderecoService {

    private final EnderecoRepository enderecoRepository;

    public Endereco findById(Long id) {
        return enderecoRepository.findById(id).orElse(null);
    }

}
