package com.nuhcorre.nuhcorre.service;

import com.nuhcorre.nuhcorre.model.Empresa;
import com.nuhcorre.nuhcorre.repository.EmpresaRepository;
import jakarta.persistence.Entity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpresaService {

    private final EmpresaRepository empresaRepository;

    public Empresa findById(String id) {
        return empresaRepository.findById(id).orElse(null);
    }

    public List<Empresa> findAllByNomeContaining(String nome) {
        return empresaRepository.findAllByNomeContaining(nome);
    }

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }



}
