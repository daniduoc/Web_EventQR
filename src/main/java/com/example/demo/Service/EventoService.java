package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Evento;
import com.example.demo.Repository.EventoRepository;

@Service
public class EventoService {
    @Autowired
    private EventoRepository repo;

    public Evento registrar(Evento e){
        return repo.save(e);
    }
}
