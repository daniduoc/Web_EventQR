package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Evento;
import com.example.demo.Repository.EventoRepository;

@Service
public class EventoService {
    @Autowired
    private EventoRepository repo;

    public List<Evento> getEventos() {
        return repo.findAll();
    }

    public Evento registrar(Evento e){
        return repo.save(e);
    }
}

    // @Autowired
    // private PerfumeRepository perfumeRepository;

    // public List<Perfume> getPerfumes() {
    //     return perfumeRepository.findAll();
    // }

    // public Perfume savePerfume(Perfume perfume) {
    //     return perfumeRepository.save(perfume);
    // }

    // public Optional<Perfume> getPerfumeId(int id) {
    //     return perfumeRepository.findById(id);
    // }
    
    // public Perfume updatePerfume(Perfume perfume) {
    //     return perfumeRepository.save(perfume);
    // }

    // public String deletePerfume(int id) {
    //     perfumeRepository.deleteById(id);
    //     return "Producto eliminado";
    // }

    // public long totalPerfumes() {
    //     return perfumeRepository.count();
    // }
