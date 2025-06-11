package com.example.demo.Model;

import java.time.LocalDateTime;

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
    private String escuela;
    private String ubicacion;
    private int precio;
    private int cupos;
    private int capacidad;
    private String imgUrl;

    private Long organizadorId;
}
