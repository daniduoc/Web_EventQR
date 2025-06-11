const API_INSCRIPCION = "/api/v1/inscripciones";
const API_USUARIOS = "/api/v1/usuarios";

const inscripcion = (() => {
  async function inscribir(eventoId) {
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
  }
  return {
    inscribir,
  };
})();

// document
//   .getElementById("inscripcionForm")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     const inscripcion = {
//       estudianteId: document.getElementById("estudiante").value,
//       eventoId: document.getElementById("evento").value,
//       fecha: document.getElementById("fecha").value,
//     };

//     fetch("http://localhost:8080/api/v1/inscripciones/registrar", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(inscripcion),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           return response.json().then((err) => {
//             throw new Error(err.message || "Error al crear la inscripcion");
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         document.getElementById(
//           "resultado"
//         ).innerHTML = `<p class="success">Inscripcion creada exitosamente: ${data.estudianteId} (ID: ${data.eventoId})</p>`;
//         document.getElementById("inscripcionForm").reset();
//       })
//       .catch((error) => {
//         document.getElementById(
//           "resultado"
//         ).innerHTML = `<p class="error">${error.message}</p>`;
//         console.error("Error:", error);
//       });
//   });
// const carrito = (() => {
//   const API_CARRITO = "/api/v1/carrito";
//   const API_PERFUMES = "http://localhost:8080/api/v1/perfumes";

//   async function listarCarrito() {
//     try {
//       const response = await fetch(API_CARRITO);
//       const perfumes = await response.json();
//       const TotalPerfumes = document.getElementById("totalCarrito");
//       const TotalPrecio = document.getElementById("precioTotal");
//       const listaCarrito = document.getElementById("listaCarrito");
//       listaCarrito.innerHTML = "";
//       TotalPerfumes.textContent = perfumes.length;

//       let total = 0;
//       perfumes.forEach((perfume) => {
//         total += perfume.precio;
//         listaCarrito.innerHTML += `
//                     <li class="list-group-item d-flex justify-content-between align-items-center">
//                         <span class="flex-grow-1">${perfume.nombre}</span>
//                         <span class="fw-bold mx-3">$${perfume.precio.toLocaleString()}</span>
//                         <button class="btn btn-sm" onclick="carrito.eliminarPerfume(${
//                           perfume.id
//                         })">
//                             🗑️
//                         </button>
//                     </li>
//                 `;
//       });
//       TotalPrecio.textContent = `$${total.toLocaleString()}`;
//     } catch (err) {
//       console.error("Error al cargar el carrito", err);
//     }
//   }

//   async function agregarAlCarrito(id) {
//     const response = await fetch(API_CARRITO);
//     const perfumes = await response.json();

//     let cantidad = 0;
//     perfumes.forEach((perfume) => {
//       if (perfume.id == id) cantidad += 1;
//     });

//     const stockResponse = await fetch(`${API_PERFUMES}/${id}`);
//     const perfume = await stockResponse.json();

//     if (cantidad >= perfume.stock) {
//       alert("No hay stock suficiente!");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_CARRITO}/agregar/${id}`, {
//         method: "POST",
//       });
//       const mensaje = await response.text();
//       alert(mensaje);
//       listarCarrito();
//     } catch (err) {
//       alert("No se pudo agregar el perfume al carrito");
//     }
//   }

//   async function eliminarPerfume(id) {
//     try {
//       const response = await fetch(`${API_CARRITO}/eliminar/${id}`, {
//         method: "DELETE",
//       });
//       const mensaje = await response.text();
//       alert(mensaje);
//       listarCarrito();
//     } catch (err) {
//       alert("No se pudo eliminar el perfume del carrito");
//     }
//   }

//   async function vaciarCarrito() {
//     const total = document.getElementById("totalCarrito").textContent;
//     if (parseInt(total) == 0) {
//       alert("El carrito está vacío.");
//       return;
//     }
//     if (confirm("¿Estás seguro de vaciar el carrito?")) {
//       try {
//         const response = await fetch(`${API_CARRITO}/vaciar`, {
//           method: "DELETE",
//         });
//         const mensaje = await response.text();
//         alert(mensaje);
//         listarCarrito();
//       } catch (err) {
//         console.error("Error al vaciar el carrito", err);
//       }
//     }
//   }

//   async function confirmarCompra() {
//     const total = document.getElementById("totalCarrito").textContent;
//     if (parseInt(total) == 0) {
//       alert("El carrito está vacío.");
//       return;
//     }
//     if (confirm(`¿Confirmar compra de ${total} perfumes?`)) {
//       try {
//         const response = await fetch(API_CARRITO);
//         const perfumes = await response.json();
//         perfumes.forEach((perfume) => {
//           let cantidad = 0;
//           perfumes.forEach((p) => {
//             if (p.id == perfume.id) cantidad += 1;
//           });
//           fetch(`${API_PERFUMES}/${perfume.id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               id: perfume.id,
//               isbn: perfume.isbn,
//               nombre: perfume.nombre,
//               marca: perfume.marca,
//               descripcion: perfume.descripcion,
//               precio: perfume.precio,
//               stock: perfume.stock - cantidad,
//               imagenUrl: perfume.imagenUrl,
//             }),
//           }).then((response) => response.json());
//         });
//         await fetch("/api/v1/notificaciones/crear", {
//           method: "POST",
//           headers: { "Content-Type": "application/x-www-form-urlencoded" },
//           body: `titulo=Compra realizada&mensaje=Has comprado ${total} perfumes. ¡Gracias por tu compra!`,
//         });

//         alert("¡Gracias por tu compra!");
//         await fetch(`${API_CARRITO}/vaciar`, { method: "DELETE" });
//         listarCarrito();
//         listarPerfumes();
//       } catch (err) {
//         console.error("Error al confirmar compra", err);
//       }
//     }
//   }

//   return {
//     listarCarrito,
//     agregarAlCarrito,
//     eliminarPerfume,
//     vaciarCarrito,
//     confirmarCompra,
//   };
// })();
