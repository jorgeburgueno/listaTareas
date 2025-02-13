'use strict';


// Manejo de abrir y cerrar ventana de creacion de tareas
const nuevaTarea = document.querySelector('.nueva-tarea');
const btnCrearTarea = document.querySelector('.btn-crear');
const btnCerrarVentana = document.querySelector('.btn-cerrar');

btnCrearTarea.addEventListener("click", () => {
    nuevaTarea.style.display = "block";    
});

btnCerrarVentana.addEventListener("click", () => {
    nuevaTarea.style.display = "none";
    console.log("asd");
});


//
