async function listarEventos() {
  const container = document.getElementById("events-grid");

  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Cargando eventos...</p>
    </div>
  `;

  if (!localStorage.length) {
    container.innerHTML = `<h1 class="page-title">Debes iniciar sesión para ver los eventos</h1>`;
    return;
  }

  try {
    // Ejecutar las peticiones en paralelo
    const [eventosResponse, inscripcionesResponse, userResponse] =
      await Promise.all([
        fetch(API_EVENTOS),
        fetch(API_INSCRIPCIONES),
        fetch(
          `${API_USUARIOS}/buscar?email=${encodeURIComponent(
            localStorage.getItem("email")
          )}`
        ),
      ]);

    // Verificar respuestas
    if (!eventosResponse.ok || !inscripcionesResponse.ok || !userResponse.ok) {
      throw new Error("Error al obtener datos");
    }

    const [eventos, inscripciones, estudiante] = await Promise.all([
      eventosResponse.json(),
      inscripcionesResponse.json(),
      userResponse.json(),
    ]);

    renderizarEventos(eventos, inscripciones, estudiante, container);
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h1 class="page-title">Error al cargar los eventos</h1>
        <button onclick="listarEventos()" class="btn btn-retry">Reintentar</button>
      </div>
    `;
  }
}

function renderizarEventos(eventos, inscripciones, estudiante, container) {
  // Agrupar eventos por periodo
  const eventosAgrupados = agruparEventosPorPeriodo(eventos);

  // Usar DocumentFragment para mejor performance
  const fragment = document.createDocumentFragment();

  // Mostrar cada grupo
  for (const [periodo, eventosDelPeriodo] of Object.entries(eventosAgrupados)) {
    // Añadir título del período
    const periodoHeader = document.createElement("div");
    periodoHeader.className = "periodo-header";
    periodoHeader.innerHTML = `<h2>${periodo}</h2>`;
    fragment.appendChild(periodoHeader);

    // Añadir eventos de este período
    eventosDelPeriodo.forEach((evento) => {
      const estaInscrito = inscripciones.some(
        (insc) =>
          insc.eventoId === evento.id && insc.estudianteId === estudiante.id
      );

      const eventCard = document.createElement("div");
      eventCard.className = "event-card";
      eventCard.innerHTML = `
        <div class="event-image">
          <img src="${evento.imgUrl}" alt="${evento.nombre}" loading="lazy">
        </div>
        <div class="event-details">
          <span class="event-date">${formatearFecha(evento.fecha)}</span>
          <span class="tag tag-${evento.escuela}">${evento.escuela}</span>
          <h3 class="event-title">${evento.nombre}</h3>
          <p class="event-price"><strong>Precio:</strong> $${evento.precio}</p>
          <p class="event-description">${evento.descripcion}</p>
          <div class="event-meta">
            <span class="event-location">
              <i class="fas fa-map-marker-alt"></i> ${evento.ubicacion}
            </span>            
            <span id="cupos-${evento.id}"><i class="fas fa-users"></i> 
            ${evento.capacidad - evento.cupos}/${evento.capacidad}
            </span>
          </div>
          <div class="event-actions">
            ${
              estaInscrito
                ? `<button class="btn btn-disabled" disabled>Ya inscrito</button>`
                : `<button class="btn btn-primary" onclick="inscripcion.inscribir(${evento.id})">Inscribirme</button>`
            }
          </div>
        </div>
      `;
      fragment.appendChild(eventCard);
    });
  }

  // Limpiar y añadir todo de una vez
  container.innerHTML = "";
  container.appendChild(fragment);
}

// Función para agrupar eventos (optimizada)
function agruparEventosPorPeriodo(eventos) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);

  const finDeSemana = new Date(hoy);
  finDeSemana.setDate(hoy.getDate() + 7);

  const proximaSemana = new Date(finDeSemana);
  proximaSemana.setDate(finDeSemana.getDate() + 7);

  const grupos = {
    Hoy: (fecha) => fecha.getTime() === hoy.getTime(),
    Mañana: (fecha) => fecha.getTime() === mañana.getTime(),
    "Esta semana": (fecha) => fecha > hoy && fecha <= finDeSemana,
    "Próxima semana": (fecha) => fecha > finDeSemana && fecha <= proximaSemana,
    "Más adelante": (fecha) => fecha > proximaSemana,
  };

  const eventosAgrupados = {};

  eventos.forEach((evento) => {
    const fechaEvento = new Date(evento.fecha);
    fechaEvento.setHours(0, 0, 0, 0);

    for (const [nombre, condicion] of Object.entries(grupos)) {
      if (condicion(fechaEvento)) {
        eventosAgrupados[nombre] = eventosAgrupados[nombre] || [];
        eventosAgrupados[nombre].push(evento);
        break;
      }
    }
  });

  return eventosAgrupados;
}

// Función para formatear fechas (sin cambios)
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
