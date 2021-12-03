class Tasks{
    constructor(task, status){
        this.task=task;
        this.status=status;
    }
}


//Elementos del DOM
const taskInput = document.querySelector("#taskInput");
const formulario = document.querySelector("form");
const divInput = document.querySelector(".divInput");
// divInput.innerHTML=``;
const taskInputCheck = document.createElement("div");


function addTask(taskInputFunct){
    let task = String(taskInputFunct);
    let status = true;
    tasksA.unshift(new Tasks(task, status));
    addLS(tasksA);
}

function showTask(){
    const listado = document.body.querySelector(".taskList");
    listado.innerHTML="";
    tasksA.forEach( i => {
        const taskItemList = document.createElement("label");
        taskItemList.className="col-12 mt-1 rounded list-group-item  btn-outline-dark ";
        taskItemList.textContent = `${i.task}`;
        // console.log(i.task);
        listado.appendChild(taskItemList);
     })
}

//ADD LS
function addLS(tasksAO){
    const xToJSON = JSON.stringify(tasksAO);
    localStorage.setItem("task1", xToJSON);
}

//GET LS
function getLS(){
    const JSONtoX = JSON.parse(localStorage.getItem("task1"))
    const tasks = [];
    
    for (const obj of JSONtoX){
        tasks.push(new Tasks(obj));
    }
}

const taskLS = localStorage.getItem("task1");

// ARRAY
let tasksA;

if (taskLS === null) {
	tasksA = [];
} else {
	tasksA = JSON.parse(taskLS);
    showTask();
}


//Control de que la tarea cargada no supera 70 caracteres
const btnAgregar = 'submit';
formulario.addEventListener(btnAgregar, formSubmit);

function formSubmit(e) {
	e.preventDefault();

	if (taskInput.value.length > 70 || taskInput.value.length < 3) {
		taskInput.classList.add('is-invalid');
		taskInput.classList.remove('is-valid');
        taskInputCheck.className="invalid-feedback quitar";
        taskInputCheck.textContent="La tarea no contiene de 3 a 70 caracteres.";
        divInput.appendChild(taskInputCheck);
        // console.log("Tarea Demasiado Larga");
	}else {
		taskInput.classList.remove('is-invalid');
		taskInput.classList.add('is-valid');
        taskInputCheck.className="valid-feedback quitar";
        taskInputCheck.textContent="La tarea se agrego correctamente.";
        divInput.appendChild(taskInputCheck);
        addTask(taskInput.value);
        // console.log("Tarea agregada");
        showTask();
	}
}

