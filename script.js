'use strict';
//seleccion de elementos

const nuevaTarea = document.querySelector('.nueva-tarea');
const editarTarea = document.querySelector('.editar-tarea');
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
    formTarea.reset();   
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
    newTask.innerHTML = `
    <strong>${tarea.name}</strong> 
    <p>Fecha límite: ${tarea.date}</p>
    <p>${tarea.description}</p>
    <button class="btn-editar">EDITAR</button>
    <button class="btn-delete">ELIMINAR</button>
`;
    display.appendChild(newTask);  

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
    console.log(tareas);     
    
    
});

loadTask();





    





