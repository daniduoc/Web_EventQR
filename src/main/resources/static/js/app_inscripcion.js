const API_INSCRIPCION = "/api/v1/inscripciones";
const API_USUARIOS = "/api/v1/usuarios";

const inscripcion = (() => {
  async function inscribir(eventoId) {
    if (!confirm(`¿Estás seguro que quieres inscribirte?`)) {
      return;
    }

    const userResponse = await fetch(
      `${API_USUARIOS}/buscar?email=${encodeURIComponent(
        localStorage.getItem("email")
      )}`
    );
    if (!userResponse.ok) {
      console.error("No se pudo obtener el usuario");
      return;
    }
    const user = await userResponse.json();

    const inscripcion = {
      estudianteId: user.id,
      eventoId: eventoId,
      fecha: new Date().toISOString(),
    };
    console.log(inscripcion);

    fetch(`${API_INSCRIPCION}/registrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inscripcion),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Error al crear la inscripcion");
          });
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    await fetch(`/api/v1/eventos/cupos?id=${eventoId}`, {
      method: "PUT",
    });

    listarEventos();
  }
  return {
    inscribir,
  };
})();
