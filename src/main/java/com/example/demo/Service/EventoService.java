package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Evento;
import com.example.demo.Repository.EventoRepository;

@Service
public class EventoService {
    @Autowired
    private EventoRepository repo;

    public List<Evento> getEventos() {
        return repo.findAll(Sort.by(Sort.Direction.ASC, "fecha"));
    }

    public Evento registrar(Evento e){
        return repo.save(e);
    }

    public Evento aumentarCupos(Long id, int cant) {
        Evento evento = repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Evento no encontrado"));

        evento.setCupos(evento.getCupos() + cant);
        return repo.save(evento);
    }

}
