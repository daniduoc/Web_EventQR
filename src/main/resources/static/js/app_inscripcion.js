const inscripcion = (() => {
  async function inscribir(eventoId) {
    if (!confirm("¿Estás seguro que quieres inscribirte?")) {
      return;
    }

    const userResponse = await fetch(
      `${API_USUARIOS}/buscar?email=${encodeURIComponent(
        localStorage.getItem("email")
      )}`
    );
    const user = await userResponse.json();

    const inscripcion = {
      estudianteId: user.id,
      eventoId: eventoId,
      fecha: new Date().toISOString(),
    };

    const response = await fetch(`${API_INSCRIPCIONES}/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inscripcion),
    });

    if (!response.ok) {
      const err = await response.json();
      alert("Error: " + (err.message || "No se pudo inscribir"));
      return;
    }

    const resCupos = await fetch(
      `http://localhost:8080/api/v1/eventos/cupos?id=${eventoId}&cant=-1`,
      { method: "PUT" }
    );

    const nuevaInscripcion = await response.json();

    // Ahora genera el QR con nuevaInscripcion.codigoQr
    mostrarQR(nuevaInscripcion.codigoQr);

    // Actualiza la lista de eventos o lo que necesites
    listarEventos();
  }

  // Función para mostrar el QR (puedes usar la librería que prefieras)
  async function mostrarQR(codigo) {
    console.log(codigo);
    const qrModal = document.getElementById("qrModal");
    const qrContainer = document.getElementById("qrcode");

    // Limpiar contenido anterior
    qrContainer.innerHTML = "";

    // Crear nuevo código QR
    new QRCode(qrContainer, {
      text: codigo,
      width: 256,
      height: 256,
    });

    // Mostrar el modal
    qrModal.style.display = "flex";
  }

  async function eliminar(inscripcionId, eventoId) {
    if (!confirm(`¿Estás seguro de que quieres cancelar tu inscripción?`)) {
      return;
    }

    try {
      // 1. Eliminar inscripción
      const resEliminar = await fetch(`${API_INSCRIPCIONES}/${inscripcionId}`, {
        method: "DELETE",
      });

      if (!resEliminar.ok) {
        alert("Error al cancelar la inscripción.");
        return;
      }

      // 2. Actualizar cupos
      const resCupos = await fetch(
        `http://localhost:8080/api/v1/eventos/cupos?id=${eventoId}&cant=1`,
        { method: "PUT" }
      );

      if (!resCupos.ok) {
        alert(
          "Inscripción cancelada, pero hubo un error al actualizar los cupos."
        );
        return;
      }

      alert("Inscripción cancelada correctamente.");
      listarEventosInscritos();
    } catch (error) {
      console.error("Error al cancelar:", error);
      alert("Ocurrió un error inesperado.");
    }
  }

  return {
    inscribir,
    eliminar,
    mostrarQR,
  };
})();
