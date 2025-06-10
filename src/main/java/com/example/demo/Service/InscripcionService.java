package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Inscripcion;
import com.example.demo.Repository.InscripcionRepository;

@Service
public class InscripcionService {
    @Autowired
    private InscripcionRepository repo;

    public Inscripcion registrar(Inscripcion i){
        return repo.save(i);
    }
}
