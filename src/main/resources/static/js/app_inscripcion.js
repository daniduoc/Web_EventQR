const inscripcion = (() => {
  async function inscribir(eventoId) {
    if (!confirm("¿Estás seguro que quieres inscribirte?")) {
      return;
    }

    try {
      // 1. Obtener datos del usuario
      const userResponse = await fetch(
        `${API_USUARIOS}/buscar?email=${encodeURIComponent(
          localStorage.getItem("email")
        )}`
      );

      if (!userResponse.ok) {
        throw new Error("No se pudo obtener información del usuario");
      }

      const user = await userResponse.json();

      // 2. Crear objeto de inscripción
      const inscripcion = {
        estudianteId: user.id,
        eventoId: eventoId,
        fecha: new Date().toISOString(),
      };

      // 3. Registrar la inscripción
      const response = await fetch(`${API_INSCRIPCIONES}/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inscripcion),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "No se pudo completar la inscripción");
      }

      // 4. Actualizar cupos en el servidor (pero no necesitamos la respuesta)
      await fetch(
        `http://localhost:8080/api/v1/eventos/cupos?id=${eventoId}&cant=-1`,
        { method: "PUT" }
      );

      // 5. Obtener los datos actuales del HTML y actualizarlos
      const cuposElement = document.getElementById(`cupos-${eventoId}`);
      if (cuposElement) {
        const textoActual = cuposElement.textContent.trim();
        const [ocupadosStr, capacidadStr] = textoActual
          .split("/")
          .map((s) => s.trim());

        const ocupados = parseInt(ocupadosStr.match(/\d+/)[0]);
        const capacidad = parseInt(capacidadStr);

        // Actualizar el elemento sumando 1 a los ocupados
        cuposElement.innerHTML = `<i class="fas fa-users"></i> ${
          ocupados + 1
        }/${capacidad}`;
      }

      // 6. Actualizar el botón de inscripción
      const botonInscripcion = document.querySelector(
        `button[onclick*="inscribir(${eventoId})"]`
      );
      if (botonInscripcion) {
        botonInscripcion.disabled = true;
        botonInscripcion.textContent = "Ya inscrito";
        botonInscripcion.className = "btn btn-disabled";
        botonInscripcion.onclick = null;
      }

      // 7. Mostrar QR (si aplica)
      const nuevaInscripcion = await response.json();
      if (nuevaInscripcion.codigoQr) {
        mostrarQR(nuevaInscripcion.codigoQr);
      }
    } catch (error) {
      console.error("Error en la inscripción:", error);
      alert("Error: " + error.message);
    }
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
        throw new Error("Error al cancelar la inscripción");
      }

      // 2. Actualizar cupos en el servidor
      const resCupos = await fetch(
        `http://localhost:8080/api/v1/eventos/cupos?id=${eventoId}&cant=1`,
        { method: "PUT" }
      );

      if (!resCupos.ok) {
        console.warn(
          "Inscripción cancelada, pero no se actualizaron cupos en servidor"
        );
      }

      // 3. Eliminar el evento de la vista sin recargar todo
      const eventCard = document.querySelector(
        `.event-card:has(button[onclick*="inscripcion.eliminar(${inscripcionId}, ${eventoId})"])`
      );

      if (eventCard) {
        // Animación de desvanecimiento antes de eliminar
        eventCard.style.transition = "opacity 0.3s ease";
        eventCard.style.opacity = "0";

        setTimeout(() => {
          eventCard.remove();

          // Verificar si no quedan más eventos
          const container = document.getElementById("events-grid");
          if (container.children.length === 0) {
            container.innerHTML = `<h1 class="page-title">No tienes eventos inscritos.</h1>`;
          }
        }, 300);
      }

      // 4. Mostrar notificación toast (opcional)
      mostrarNotificacion("Inscripción cancelada correctamente", "success");
    } catch (error) {
      console.error("Error al cancelar:", error);
      mostrarNotificacion(
        error.message || "Ocurrió un error inesperado",
        "error"
      );
    }
  }

  // Función auxiliar para mostrar notificaciones (opcional)
  function mostrarNotificacion(mensaje, tipo = "info") {
    const toast = document.createElement("div");
    toast.className = `toast-notification toast-${tipo}`;
    toast.textContent = mensaje;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }, 100);
  }

  return {
    inscribir,
    eliminar,
    mostrarQR,
  };
})();
