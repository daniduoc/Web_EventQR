package com.example.demo.Model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Evento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nombre;
    private String descripcion;
    private LocalDateTime fecha;
    private int precio;
    private int cupos;
    private String estado;

    private Long organizadorId;

    @ElementCollection
    private List<Long> estudiantesIds; 
}
