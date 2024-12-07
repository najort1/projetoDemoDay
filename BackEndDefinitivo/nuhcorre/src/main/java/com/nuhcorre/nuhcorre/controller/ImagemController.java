package com.nuhcorre.nuhcorre.controller;

import org.springframework.beans.factory.annotation.Value;
import com.nuhcorre.nuhcorre.model.Imagem;
import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.model.details.EmpresaUserDetails;
import com.nuhcorre.nuhcorre.service.ImagemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/imagem")
public class ImagemController {

    private final ImagemService imagemService;
    @Value("${file.upload-dir}")
    private String uploadDir;

    public ImagemController(ImagemService imagemService) {
        this.imagemService = imagemService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImagem(@RequestParam("imagem") MultipartFile imagem) {
        String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();
        Path caminhoArquivo = Paths.get(uploadDir, nomeArquivo);

        try {
            // Garantir que o diretório exista
            File diretorio = new File(uploadDir);
            if (!diretorio.exists()) {
                diretorio.mkdirs(); // Cria o diretório se não existir
            }

            // Salvar informações no banco
            Imagem novaImagem = new Imagem();
            novaImagem.setCaminho(caminhoArquivo.toString());
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            Object principal = auth.getPrincipal();
            if (principal instanceof Usuario) {
                novaImagem.setUsuario((Usuario) principal);
                Optional<Imagem> imagemExiste = imagemService.encontrarPorUsuario(novaImagem.getUsuario());
                if(imagemExiste.isPresent()){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Imagem já cadastrada.");
                }

            } else if (principal instanceof EmpresaUserDetails) {
                novaImagem.setEmpresa(((EmpresaUserDetails) principal).getEmpresa());
                Optional<Imagem> imagemExisteEmpresa = imagemService.encontrarPorEmpresaId(novaImagem.getEmpresa().getCnpj());

                if(imagemExisteEmpresa.isPresent()){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Imagem já cadastrada.");
                }

            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
            }

            imagem.transferTo(caminhoArquivo.toFile());
            imagemService.salvarImagem(novaImagem);

            return ResponseEntity.ok("Imagem carregada com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem.");
        }
    }

    @DeleteMapping("/deletar")
    public ResponseEntity<String> deletarImagem() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        Imagem imagemExistente = null;

        if (principal instanceof Usuario) {
            Optional<Imagem> imagemOptional = imagemService.encontrarPorUsuario((Usuario) principal);
            if (imagemOptional.isPresent()) {
                imagemExistente = imagemOptional.get();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não encontrada para o usuário.");
            }
        } else if (principal instanceof EmpresaUserDetails) {
            Optional<Imagem> imagemOptional = imagemService.encontrarPorEmpresaId(((EmpresaUserDetails) principal).getEmpresa().getCnpj());
            if (imagemOptional.isPresent()) {
                imagemExistente = imagemOptional.get();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não encontrada para a empresa.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
        }

        File imagemAntiga = new File(imagemExistente.getCaminho());
        if (imagemAntiga.exists()) {
            imagemAntiga.delete();
        }

        imagemService.deletarImagem(imagemExistente);
        return ResponseEntity.ok("Imagem deletada com sucesso.");
    }


    @PutMapping("/atualizar")
    public ResponseEntity<String> atualizarImagem(@RequestParam("imagem") MultipartFile novaImagem) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        Imagem imagemExistente = null;

        if (principal instanceof Usuario) {
            Optional<Imagem> imagemOptional = imagemService.encontrarPorUsuario((Usuario) principal);
            if (imagemOptional.isPresent()) {
                imagemExistente = imagemOptional.get();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não encontrada para o usuário.");
            }
        } else if (principal instanceof EmpresaUserDetails) {
            Optional<Imagem> imagemOptional = imagemService.encontrarPorEmpresaId(((EmpresaUserDetails) principal).getEmpresa().getCnpj());
            if (imagemOptional.isPresent()) {
                imagemExistente = imagemOptional.get();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Imagem não encontrada para a empresa.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado.");
        }

        String nomeArquivo = UUID.randomUUID() + "_" + novaImagem.getOriginalFilename();
        Path caminhoArquivo = Paths.get(uploadDir, nomeArquivo);

        try {
            // Garantir que o diretório exista
            File diretorio = new File(uploadDir);
            if (!diretorio.exists()) {
                diretorio.mkdirs(); // Cria o diretório se não existir
            }

            // Deletar a imagem antiga
            File imagemAntiga = new File(imagemExistente.getCaminho());
            if (imagemAntiga.exists()) {
                imagemAntiga.delete();
            }

            // Salvar a nova imagem
            novaImagem.transferTo(caminhoArquivo.toFile());
            imagemExistente.setCaminho(caminhoArquivo.toString());
            imagemService.salvarImagem(imagemExistente);

            return ResponseEntity.ok("Imagem atualizada com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao atualizar a imagem.");
        }
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<byte[]> getImagemPorUsuarioId(@PathVariable Long id) {
        Optional<Imagem> imagemOptional = imagemService.encontrarPorUsuarioId(id);

        if (imagemOptional.isPresent()) {
            Imagem imagem = imagemOptional.get();
            Path caminhoArquivo = Paths.get(imagem.getCaminho());
            try {
                byte[] imagemBytes = Files.readAllBytes(caminhoArquivo);
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagemBytes);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/empresa/{id}")
    public ResponseEntity<byte[]> getImagemPorEmpresaId(@PathVariable String  id) {
        Optional<Imagem> imagemOptional = imagemService.encontrarPorEmpresaId(id);

        if (imagemOptional.isPresent()) {
            Imagem imagem = imagemOptional.get();
            Path caminhoArquivo = Paths.get(imagem.getCaminho());
            try {
                byte[] imagemBytes = Files.readAllBytes(caminhoArquivo);
                return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imagemBytes);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }




}
