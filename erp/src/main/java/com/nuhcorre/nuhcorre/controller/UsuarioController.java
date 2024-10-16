package com.nuhcorre.nuhcorre.controller;

import com.nuhcorre.nuhcorre.model.Usuario;
import com.nuhcorre.nuhcorre.service.UsuarioService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController

@RequiredArgsConstructor
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping()
    public ResponseEntity<List<Usuario>> findAll() {
        List<Usuario> usuarioList = usuarioService.findAll();
        return ResponseEntity.ok().body(usuarioList);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Usuario> update(@PathVariable Long id, @Valid @RequestBody Usuario usuario) {
        final Usuario up = usuarioService.update(id, usuario);
        return ResponseEntity.ok().body(up);
    }


    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Usuario> find(@PathVariable Long id) {
        Usuario usuario = usuarioService.findById(id);
        return ResponseEntity.ok().body(usuario);
    }

    @GetMapping(value = "/{id}/avatar/{idAvatar}")
    public ResponseEntity<Usuario> setAvatar(@PathVariable Long id, @PathVariable Long idAvatar) {
        return ResponseEntity.ok().body(usuarioService.setAvatar(id, idAvatar));
    }

    @PostMapping
    public ResponseEntity<Usuario> insert(@RequestBody Usuario usuario) {
        final Usuario save = usuarioService.insert(usuario);
        return ResponseEntity.ok().body(save);
    }

}
