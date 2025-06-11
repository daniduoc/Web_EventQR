package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Evento;
import com.example.demo.Service.EventoService;

@RestController
@RequestMapping("/api/v1/eventos")
@CrossOrigin
public class EventoController {
    @Autowired
    private EventoService serv;

    @GetMapping
    public List<Evento> listarEventos() {
        return serv.getEventos();
    }

    @PostMapping("/registrar")
    public Evento registrar(@RequestBody Evento e) {    
        return serv.registrar(e);
    }

    @PutMapping("/cupos")
    public ResponseEntity<Evento> actualizarCupos(
        @RequestParam Long id
    ) {
        Evento eventoActualizado = serv.disminuirCupos(id);
        return ResponseEntity.ok(eventoActualizado);
    }

}
