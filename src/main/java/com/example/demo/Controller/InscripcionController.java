package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Inscripcion;
import com.example.demo.Service.InscripcionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/v1/inscripciones")
@CrossOrigin
public class InscripcionController {
    @Autowired
    private InscripcionService serv;

    @PostMapping("/registrar")
    public Inscripcion registrar(@RequestBody Inscripcion i) {
        return serv.registrar(i);
    }
    
}
