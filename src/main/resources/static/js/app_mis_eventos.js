async function listarEventosInscritos() {
  const eventosResponse = await fetch(API_EVENTOS);
  const eventos = await eventosResponse.json();

  const inscripcionesResponse = await fetch(API_INSCRIPCIONES);
  const inscripciones = await inscripcionesResponse.json();

  const userResponse = await fetch(
    `${API_USUARIOS}/buscar?email=${encodeURIComponent(
      localStorage.getItem("email")
    )}`
  );
  const estudiante = await userResponse.json();

  const eventosInscritos = eventos.filter((evento) =>
    inscripciones.some(
      (insc) =>
        insc.eventoId === evento.id && insc.estudianteId === estudiante.id
    )
  );

  console.log(eventosInscritos);

  const container = document.getElementById("events-grid");
  container.innerHTML = "";
  if (eventosInscritos.length === 0) {
    container.innerHTML = `<h1 class="page-title">No tienes eventos inscritos.</h1>`;
    return;
  }

  eventosInscritos.forEach((evento) => {
    const inscripcion = inscripciones.find(
      (insc) =>
        insc.eventoId === evento.id && insc.estudianteId === estudiante.id
    );

    const inscripcionId = inscripcion?.id;
    const inscripcionQr = inscripcion?.codigoQr;

    container.innerHTML += `
    <div class="event-card">
      <div class="event-image">
        <img src="${evento.imgUrl}" alt="${evento.nombre}">
      </div>
      <div class="event-details">
        <span class="event-date">${((d) =>
          `${d.getDate()} ${d
            .toLocaleString("es-ES", { month: "short" })
            .toUpperCase()} ${d.getFullYear()} 22:00`)(
          new Date(evento.fecha)
        )}</span>
        <span class="tag tag-${evento.escuela}">${evento.escuela}</span>
        <h3 class="event-title">${evento.nombre}</h3>
        <p class="event-price"><strong>Precio:</strong> $${evento.precio}</p>
        <p class="event-description">${evento.descripcion}</p>
        <div class="event-meta">
          <span class="event-location">
            <i class="fas fa-map-marker-alt"></i> ${evento.ubicacion}
          </span>
          <span><i class="fas fa-users"></i> ${
            evento.capacidad - evento.cupos
          }/${evento.capacidad}</span>
        </div>
        <div class="event-actions">
          <button class="btn btn-primary" onclick="inscripcion.eliminar(${inscripcionId}, ${
      evento.id
    })">Cancelar</button>
          <button class="btn btn-outline" onclick="inscripcion.mostrarQR('${inscripcionQr}')">Ver QR</button>
        </div>
      </div>
    </div>
  `;
  });
}

listarEventosInscritos();
