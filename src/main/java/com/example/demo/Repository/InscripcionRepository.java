package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Inscripcion;

public interface InscripcionRepository extends JpaRepository<Inscripcion, Long>{
    Optional<Inscripcion> findByCodigoQr(String codigoQr);
}
