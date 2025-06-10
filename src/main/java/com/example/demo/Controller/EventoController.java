package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Evento;
import com.example.demo.Service.EventoService;

@RestController
@RequestMapping("/api/v1/eventos")
@CrossOrigin
public class EventoController {
    @Autowired
    private EventoService serv;

    @PostMapping("/registrar")
    public Evento registrar(@RequestBody Evento e) {    
        return serv.registrar(e);
    }
}
