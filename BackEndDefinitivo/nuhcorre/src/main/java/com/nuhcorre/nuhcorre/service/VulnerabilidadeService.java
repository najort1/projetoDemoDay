package com.nuhcorre.nuhcorre.service;


import com.nuhcorre.nuhcorre.enums.VulnerabilidadeEnum;
import com.nuhcorre.nuhcorre.model.DTO.VulnerabilidadeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class VulnerabilidadeService {

    public List<VulnerabilidadeDTO> retornarTodasVulnerabilidades(){

        return Stream.of(VulnerabilidadeEnum.values())
                .map(v -> new VulnerabilidadeDTO(v.name(), v.getDescricao()))
                .collect(Collectors.toList());



    }


}
