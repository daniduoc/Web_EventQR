package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Inscripcion;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long>{
    
}
