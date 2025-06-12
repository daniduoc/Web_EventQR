package com.example.demo.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Inscripcion;
import com.example.demo.Repository.InscripcionRepository;

@Service
public class InscripcionService {
    @Autowired
    private InscripcionRepository repo;

    public List<Inscripcion> getInscripciones() {
        return repo.findAll();
    }

    public Inscripcion registrar(Inscripcion i) {
        // Generar un UUID único para el QR
        String codigoQr = UUID.randomUUID().toString();
        i.setCodigoQr(codigoQr);

        // Inicializar como no usado
        i.setUsado(false);

        // Guardar en base de datos
        return repo.save(i);
    }

    public String deleteInscripcion(long id) {
        repo.deleteById(id);
        return "Inscripcion eliminada";
    }
    
    public Optional<Inscripcion> findByCodigoQR(String codigo) {
        return repo.findByCodigoQr(codigo);
    };

    public Inscripcion saveInscripcion(Inscripcion i) {
        return repo.save(i);
    }
}
