// Variables
const presupuestoUsuario = prompt("Cual es tu presupuesto semanal?");
const formulario = document.getElementById("agregar-gasto");
let cantidadPresupuesto;

// Clases

// Clase de Presupuesto

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }
  // Método para ir restando del presupuesto actual
  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}

// Clase interfaz maneja todo lo del html

class Interfaz {
  insertarPresupuesto(cantidad) {
    const presupuestoSpan = document.querySelector("span#total");
    const restanteSpan = document.querySelector("span#restante");

    //Insertar al html
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }
  imprimirMensaje(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }
    divMensaje.appendChild(document.createTextNode(mensaje));

    // Insertar en el DOM
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    //Quitar el alert
    setTimeout(function () {
      document.querySelector(".primario .alert").remove();
      formulario.reset();
    }, 2000);
  }
  // Insertar datos a la lista
  agregarGastoListado(nombre, cantidad) {
    const gastoListado = document.querySelector("#gastos ul");

    // Crear un LI
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    // Insertar el gasto
    li.innerHTML = `
    ${nombre}
    <span class='badge badge-primary badge-pill'> ${cantidad}`;

    // Insertar al HTML
    gastoListado.appendChild(li);
  }
  // Comprueba el presupuesto restante
  presupuestoRestante(cantidad) {
    const restante = document.querySelector("span#restante");

    // Leemos el presupuesto restante
    const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(
      cantidad
    );
    restante.innerHTML = `${presupuestoRestanteUsuario}`;
  }
}

// Event Listeners

document.addEventListener("DOMContentLoaded", function () {
  if (presupuestoUsuario === null || presupuestoUsuario === "") {
    window.location.reload();
  } else {
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

    // Instancia interfaz
    const ui = new Interfaz();
    ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Enviado");

  //Leer del formulario
  const nombreGasto = document.querySelector("#gasto").value;
  const cantidadGasto = document.querySelector("#cantidad").value;

  //Instancias
  const ui = new Interfaz();

  //Comprobar si los campos estan vacios
  if (nombreGasto === "" || cantidadGasto === "") {
    // Mensaje

    ui.imprimirMensaje("Hubo un error", "error");
  } else {
    ui.imprimirMensaje("Correcto", "correcto");
    ui.agregarGastoListado(nombreGasto, cantidadGasto);
    ui.presupuestoRestante(cantidadGasto);
  }
});
