package com.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Inscripcion;
import com.example.demo.Service.InscripcionService;

@RestController
@RequestMapping("/api/v1/inscripciones")
@CrossOrigin
public class InscripcionController {
    @Autowired
    private InscripcionService serv;

    @GetMapping
    public List<Inscripcion> listarInscripciones() {
        return serv.getInscripciones();
    }

    @PostMapping("/registrar")
    public Inscripcion registrar(@RequestBody Inscripcion i) {
        return serv.registrar(i);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> eliminarInscripcion(@PathVariable long id) {
        serv.deleteInscripcion(id);
        return ResponseEntity.ok("Inscripcion eliminada");
    }

    @GetMapping("/verificar-codigo/{codigo}")
    public ResponseEntity<String> verificarCodigo(@PathVariable String codigo) {
        Optional<Inscripcion> inscripcionOpt = serv.findByCodigoQR(codigo);

        if (inscripcionOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("❌ Código no válido");
        }

        Inscripcion inscripcion = inscripcionOpt.get();

        if (inscripcion.isUsado()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("⚠️ Código ya fue usado");
        }

        // Marcar como usado si es necesario
        inscripcion.setUsado(true);
        serv.saveInscripcion(inscripcion);

        return ResponseEntity.ok("✔️ Código válido para entrada al evento con ID: " + inscripcion.getEventoId());
    }
}
