async function listarEventosInscritos() {
  const container = document.getElementById("events-grid");

  // Mostrar spinner de carga
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Cargando tus eventos inscritos...</p>
    </div>
  `;

  if (!localStorage.length) {
    container.innerHTML = `<h1 class="page-title">Debes iniciar sesión para ver los eventos</h1>`;
    return;
  }

  try {
    // Ejecutar todas las peticiones en paralelo
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

    // Verificar que todas las respuestas sean OK
    if (!eventosResponse.ok || !inscripcionesResponse.ok || !userResponse.ok) {
      throw new Error("Error al cargar los datos");
    }

    const [eventos, inscripciones, estudiante] = await Promise.all([
      eventosResponse.json(),
      inscripcionesResponse.json(),
      userResponse.json(),
    ]);

    // Filtrar eventos inscritos
    const eventosInscritos = eventos.filter((evento) =>
      inscripciones.some(
        (insc) =>
          insc.eventoId === evento.id && insc.estudianteId === estudiante.id
      )
    );

    // Mostrar resultados
    renderizarEventosInscritos(
      eventosInscritos,
      inscripciones,
      estudiante,
      container
    );
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h1 class="page-title">Error al cargar los eventos</h1>
        <button onclick="listarEventosInscritos()" class="btn btn-retry">Reintentar</button>
      </div>
    `;
  }
}

function renderizarEventosInscritos(
  eventosInscritos,
  inscripciones,
  estudiante,
  container
) {
  // Limpiar contenedor
  container.innerHTML = "";

  // Mostrar mensaje si no hay eventos
  if (eventosInscritos.length === 0) {
    container.innerHTML = `<h1 class="page-title">No tienes eventos inscritos.</h1>`;
    return;
  }

  // Usar DocumentFragment para mejor rendimiento
  const fragment = document.createDocumentFragment();

  // Función para formatear fecha
  const formatFecha = (fechaStr) => {
    const d = new Date(fechaStr);
    return `${d.getDate()} ${d
      .toLocaleString("es-ES", { month: "short" })
      .toUpperCase()} ${d.getFullYear()} 22:00`;
  };

  // Crear cards para cada evento
  eventosInscritos.forEach((evento) => {
    const inscripcion = inscripciones.find(
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
        <span class="event-date">${formatFecha(evento.fecha)}</span>
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
          <button class="btn btn-primary" onclick="inscripcion.eliminar(${
            inscripcion.id
          }, ${evento.id})">
            Cancelar
          </button>
          <button class="btn btn-outline" onclick="inscripcion.mostrarQR('${
            inscripcion.codigoQr
          }')">
            Ver QR
          </button>
        </div>
      </div>
    `;

    fragment.appendChild(eventCard);
  });

  container.appendChild(fragment);
}

listarEventosInscritos();
