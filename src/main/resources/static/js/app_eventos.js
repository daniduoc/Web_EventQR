async function listarEventos() {
  if (localStorage.length === 0) {
    document.getElementById(
      "events-grid"
    ).innerHTML = `<h1 class="page-title">Debes iniciar sesión para ver los eventos</h1>`;
    return;
  }

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

  // Agrupar eventos por periodo
  const eventosAgrupados = agruparEventosPorPeriodo(eventos);

  const container = document.getElementById("events-grid");
  container.innerHTML = "";

  // Mostrar cada grupo
  for (const [periodo, eventosDelPeriodo] of Object.entries(eventosAgrupados)) {
    // Añadir título del período
    container.innerHTML += `
      <div class="periodo-header">
        <h2>${periodo}</h2>
      </div>
    `;

    // Añadir eventos de este período
    eventosDelPeriodo.forEach((evento) => {
      const estaInscrito = inscripciones.some(
        (insc) =>
          insc.eventoId === evento.id && insc.estudianteId === estudiante.id
      );

      container.innerHTML += `
        <div class="event-card">
          <div class="event-image">
            <img src="${evento.imgUrl}" alt="${evento.nombre}">
          </div>
          <div class="event-details">
            <span class="event-date">${formatearFecha(evento.fecha)}</span>
            <span class="tag tag-${evento.escuela}">${evento.escuela}</span>
            <h3 class="event-title">${evento.nombre}</h3>
            <p class="event-price"><strong>Precio:</strong> $${
              evento.precio
            }</p>
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
              ${
                estaInscrito
                  ? `<button class="btn btn-disabled" disabled>Ya inscrito</button>`
                  : `<button class="btn btn-primary" onclick="inscripcion.inscribir(${evento.id})">Inscribirme</button>`
              }
            </div>
          </div>
        </div>
      `;
    });
  }
}

// Función para agrupar eventos
function agruparEventosPorPeriodo(eventos) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);

  const finDeSemana = new Date(hoy);
  finDeSemana.setDate(hoy.getDate() + 7);

  const eventosAgrupados = {
    Hoy: [],
    Mañana: [],
    "Esta semana": [],
    "Próxima semana": [],
    "Más adelante": [],
  };

  eventos.forEach((evento) => {
    const fechaEvento = new Date(evento.fecha);
    fechaEvento.setHours(0, 0, 0, 0);

    if (fechaEvento.getTime() === hoy.getTime()) {
      eventosAgrupados["Hoy"].push(evento);
    } else if (fechaEvento.getTime() === mañana.getTime()) {
      eventosAgrupados["Mañana"].push(evento);
    } else if (fechaEvento > hoy && fechaEvento <= finDeSemana) {
      eventosAgrupados["Esta semana"].push(evento);
    } else if (
      fechaEvento > finDeSemana &&
      fechaEvento <= new Date(finDeSemana.getTime() + 7 * 24 * 60 * 60 * 1000)
    ) {
      eventosAgrupados["Próxima semana"].push(evento);
    } else {
      eventosAgrupados["Más adelante"].push(evento);
    }
  });

  // Eliminar grupos vacíos
  Object.keys(eventosAgrupados).forEach((key) => {
    if (eventosAgrupados[key].length === 0) {
      delete eventosAgrupados[key];
    }
  });

  return eventosAgrupados;
}

// Función mejorada para formatear fechas
function formatearFecha(fechaString) {
  const fecha = new Date(fechaString);
  const opciones = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return fecha
    .toLocaleDateString("es-ES", opciones)
    .replace(/ de /g, " ")
    .toUpperCase();
}

listarEventos();
