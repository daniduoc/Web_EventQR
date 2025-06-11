package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Usuario;
import com.example.demo.Repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository repo;

    public Usuario registrar(Usuario u){
        if (!u.getEmail().toLowerCase().endsWith("@duocuc.cl")) {
            throw new IllegalArgumentException("El correo debe terminar en @duocuc.cl");
        }

        if (repo.findByEmail(u.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado");
        }

        return repo.save(u);
    }
        
    public Optional<Usuario> autenticar(String email, String password){
        return repo.findByEmail(email).filter(u -> u.getPassword().equals(password));
    }

    public Usuario obtenerPorEmail(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }
}
