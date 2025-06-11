const API_EVENTOS = "http://localhost:8080/api/v1/eventos";

function listarEventos() {
  fetch(API_EVENTOS)
    .then((response) => response.json())
    .then((eventos) => {
      const container = document.getElementById("events-grid");
      container.innerHTML = "";
      eventos.forEach((evento) => {
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
                    <span class="tag tag-academic">${evento.escuela}</span>
                    <h3 class="event-title">${evento.nombre}</h3>
                    <p class="event-price"><strong>Precio:</strong> $${
                      evento.precio
                    }</p>
                    <p class="event-description">${evento.descripcion}</p>
                    <div class="event-meta">
                        <span class="event-location">
                            <i class="fas fa-map-marker-alt"></i> ${
                              evento.ubicacion
                            }
                        </span>
                        <span><i class="fas fa-users"></i> ${
                          evento.capacidad - evento.cupos
                        }/${evento.capacidad}</span>
                    </div>
                    <div class="event-actions">
                        <button class="btn btn-primary" onclick="inscripcion.inscribir(${
                          evento.id
                        })">Inscribirme</button>
                        <button class="btn btn-outline">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
      });
    });
}
listarEventos();
