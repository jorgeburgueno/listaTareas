import { isThisWeek, isToday, format, parseISO, compareAsc } from 'https://esm.sh/date-fns';

'use strict';


//seleccion de elementos

const nuevaTarea = document.querySelector('.nueva-tarea');
const editarTarea = document.querySelector('.editar-tarea');
const btnCrearTarea = document.querySelector('.btn-crear');
const btnCerrarVentana = document.querySelector('.btn-cerrar');
const formTarea = document.querySelector('.form-tarea');
const display = document.querySelector('.display');
const radio = document.querySelector(".fecha_pendiente");


// Manejo de abrir y cerrar ventana de creacion de tareas

btnCrearTarea.addEventListener("click", () => {
    
    nuevaTarea.style.display = 'flex';
      display.classList.add('blur');
    
});

btnCerrarVentana.addEventListener("click", () => {
    nuevaTarea.style.display = "none"; 
    display.classList.remove('blur');
      
});

display.addEventListener('click', (e) => {    
    if (e.target === display) {
        nuevaTarea.style.display = 'none';
      display.classList.remove('blur');
    }
  });

//Logica de creacion de tareas


const tareas = JSON.parse(localStorage.getItem("tareas")) || []; 



function addTask(tarea) {
    tareas.push(tarea);
    localStorage.setItem("tareas", JSON.stringify(tareas)); 
    renderTask(tarea);   
}

function renderTask(tarea){
    const newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.innerHTML = `<div class="task-info">
    <p class="task-name">${tarea.name}</p> 
    <p class="task-fecha">Fecha límite: ${tarea.date}</p>
    <p class="task-desc">${tarea.description}</p>
     </div>
     <div class="task-actions">
    <button class="btn-editar">EDITAR</button>
    <button class="btn-delete">🗑</button>
    </div>
`;
    display.appendChild(newTask);  

    //Esconde descripcion y la muestra al darle click
    const taskInfo = newTask.querySelector('.task-info');
    const desc = newTask.querySelector('.task-desc');

    desc.style.display = 'none';

    taskInfo.addEventListener('click', () => {
    desc.style.display = (desc.style.display === 'none') ? 'block' : 'none';
    });

    //Borrar tareas

    const btnDelete = newTask.querySelector(".btn-delete");      
    btnDelete.addEventListener('click', () => {    
        const index = tareas.findIndex(t => 
            t.name === tarea.name && 
            t.date === tarea.date && 
            t.description === tarea.description
        );

        if (index !== -1) {
        tareas.splice(index, 1);
        localStorage.setItem("tareas", JSON.stringify(tareas));
        }
        console.log(tareas);
        newTask.remove();    
    }); 

    // Editar tareas

    const btnEdit = newTask.querySelector(".btn-editar");
    btnEdit.addEventListener('click', () => {
        editarTarea.style.display = "block";

        const editForm = document.querySelector(".editar-tarea .form-tarea");

        document.querySelector('#edit-name').value = tarea.name;
        document.querySelector('#edit_fecha_limite').value = tarea.date;
        document.querySelector("#edit-descripcion").value = tarea.description; 
        
        const newEditForm = editForm.cloneNode(true);
        editForm.parentNode.replaceChild(newEditForm, editForm);

        newEditForm.addEventListener('submit', (event) => {                          
            event.preventDefault();
            
            
            
            const index = tareas.findIndex(t => 
                t.name === tarea.name && 
                t.date === tarea.date && 
                t.description === tarea.description
            );
            

            if (index !== -1) {
            tareas[index].name = document.querySelector("#edit-name").value;
            tareas[index].date = document.querySelector("#edit_fecha_limite").value;
            tareas[index].description = document.querySelector("#edit-descripcion").value;

            localStorage.setItem("tareas", JSON.stringify(tareas));

            display.innerHTML = "";
            loadTask();
            editarTarea.style.display = "none";
            }  
            });            
    });

}

function loadTask(){
    tareas.forEach(renderTask);
}

formTarea.addEventListener('submit', (event) => {
event.preventDefault();
    
    const tarea = {
        name: document.querySelector("#name").value,
        date: document.querySelector("#fecha_limite").value,
        description: document.querySelector("#descripcion").value
    };


    addTask(tarea);    
    formTarea.reset();
    nuevaTarea.style.display = "none";
    display.classList.remove('blur');
    console.log(tareas);     
    
    
});



// prohibe seleccionar fechas pasadas
const now = new Date();
const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

document.getElementById('fecha_limite').setAttribute('min', localISOTime);


//Organizar las tareas por fecha

function filtrarHoy(tareas) {
    return tareas.filter(tarea => isToday(parseISO(tarea.date)));
}

function filtrarSemana(tareas){
    return tareas.filter(tarea => isThisWeek(parseISO(tarea.date)));
}

function mostrarTodas(tareas){
    return tareas;
}

function manejoCambio(event) {
    const filtro = event.target.value;
    let tareasFiltradas;
    
    if (filtro === "hoy") {
        tareasFiltradas = filtrarHoy(tareas);
    } else if (filtro === "semana") {
        tareasFiltradas = filtrarSemana(tareas);
    } else {
        tareasFiltradas = mostrarTodas(tareas);
    }
    display.innerHTML = "";     
    tareasFiltradas.forEach(renderTask);
}

document.querySelector('.area-tareas').addEventListener('change', manejoCambio);




loadTask();






    





