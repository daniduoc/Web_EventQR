package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping
    public List<Evento> listarEventos() {
        return serv.getEventos();
    }

    @PostMapping("/registrar")
    public Evento registrar(@RequestBody Evento e) {    
        return serv.registrar(e);
    }
}

    // @Autowired
    // private PerfumeService perfumeService;

    // @GetMapping
    // public List<Perfume> listarPerfumes() {
    //     return perfumeService.getPerfumes();
    // }

    // @PostMapping
    // public Perfume agregarPerfume(@RequestBody Perfume perfume) {
    //     return perfumeService.savePerfume(perfume);
    // }

    // @GetMapping("{id}")
    // public ResponseEntity<Perfume> buscarPerfume(@PathVariable int id) {
    //     return perfumeService.getPerfumeId(id)
    //             .map(ResponseEntity::ok)
    //             .orElse(ResponseEntity.notFound().build());
    // }

    // @PutMapping("{id}")
    // public ResponseEntity<Perfume> actualizarPerfume(
    //         @PathVariable int id,
    //         @RequestBody Perfume perfume) {
        
    //     if (!perfumeService.getPerfumeId(id).isPresent()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     perfume.setId(id); 
    //     return ResponseEntity.ok(perfumeService.updatePerfume(perfume));
    // }

    // @DeleteMapping("{id}")
    // public ResponseEntity<String> eliminarPerfume(@PathVariable int id) {
    //     if (!perfumeService.getPerfumeId(id).isPresent()) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     perfumeService.deletePerfume(id);
    //     return ResponseEntity.ok("Perfume eliminado correctamente");
    // }

    // @GetMapping("/total")
    // public ResponseEntity<Long> totalPerfumes() {
    //     return ResponseEntity.ok(perfumeService.totalPerfumes());
    // }
