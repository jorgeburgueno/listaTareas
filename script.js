'use strict';
//seleccion de elementos

const nuevaTarea = document.querySelector('.nueva-tarea');
const btnCrearTarea = document.querySelector('.btn-crear');
const btnCerrarVentana = document.querySelector('.btn-cerrar');
const formTarea = document.querySelector('.form-tarea');

const display = document.querySelector('.display');
// Manejo de abrir y cerrar ventana de creacion de tareas

btnCrearTarea.addEventListener("click", () => {
    nuevaTarea.style.display = "block";    
});

btnCerrarVentana.addEventListener("click", () => {
    nuevaTarea.style.display = "none";    
});

//Logica de creacion de tareas

const tareas = []; 

formTarea.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const tarea = {
        name: document.querySelector("#name").value,
        date: document.querySelector("#fecha_limite").value,
        description: document.querySelector("#descripcion").value
    };
    tareas.push(tarea);
    formTarea.reset();
    nuevaTarea.style.display = "none";
    console.log(tareas); 

    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.textContent = `${tarea.name}  ${tarea.date}  ${tarea.description}`;
    display.appendChild(newTask);        
        
});

//Mostrar tareas en display





