package com.example.demo.Model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Inscripcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private long id;

    private long eventoId;
    private long estudianteId;
    private LocalDateTime fecha;

    private String codigoQr;
    private boolean usado;
}
