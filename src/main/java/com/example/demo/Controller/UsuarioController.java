package com.example.demo.Controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Usuario;
import com.example.demo.Service.UsuarioService;

@RestController
@RequestMapping("/api/v1/usuarios")
@CrossOrigin
public class UsuarioController {
    @Autowired
    private UsuarioService serv;

    @PostMapping("/registrar")
    public Map<String, String> registrar(@RequestBody Usuario u) {
        Map<String, String> response = new HashMap<>();
        try {
            serv.registrar(u);
            response.put("result", "OK");
        } catch (IllegalArgumentException e) {
            response.put("result", "Error");
            response.put("message", e.getMessage());
        }
        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Usuario u) {
        Optional<Usuario> user = serv.autenticar(u.getEmail(), u.getPassword());
        Map<String, String> response = new HashMap<>();
        if(user.isPresent()) {
            response.put("result","OK");
        } else {
            response.put("result","Error");
        }
        return response;
    }
    @GetMapping("/buscar")
    public ResponseEntity<Usuario> obtenerPorEmail(@RequestParam String email) {
        Usuario usuario = serv.obtenerPorEmail(email);
        return ResponseEntity.ok(usuario);
    }
}