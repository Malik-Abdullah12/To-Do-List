let output = [];

const container = document.getElementById("todo-container");
const adddata = document.getElementById("add");
const inputfeild = document.getElementById("text1");

// Saving done now attaching remaining --------------------------------------------
// ------------------------------------------Tesing local storage fucntions :
// output = loadTodos();

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
}


// saveTodos(output)
// -------------------------------------------------Testing Enter key function

//   container.querySelector(".output-p, .output-new").forEach((value) => value.remove());
// output.forEach((task) => displaytodos(task));
function display_render() {
  container
    .querySelectorAll(".output-p, .output-new")
    .forEach((item) => item.remove());
  output.forEach((task) => displaytodos(task));
}
// ---------------------------------------------------------------
// --------------------------------Display Function :

function displaytodos(task) {
  let newnode = document.createElement("div");

  // newnode.className = task.completed ? "output-new" : "output-p";

  if (task.completed) {
    newnode.className = "output-new";
    newnode.innerHTML = `
    <div class="p-div"><p class="d">${task.title} (completed) </p></div>
    
    <button class="output-delete" data-id="${task.id}">Delete</button>
    <button class="output-undone" data-id="${task.id}" data-title="${task.title}">Undone</button>
    `;
  }


  // ---------------------------------------------------Testing : ----------------
  else if (task.editmode) {
    newnode.className = "output-p";
    newnode.innerHTML = ` 
     <div class="p-div"><p class="c"><input type="text"  id="new-text"  class="new-input" value="${task.title}" placeholder="Enter task" /></p></div>
     <button class="output-save" data-id="${task.id}">Save</button>
     <button class="output-cancel" data-id="${task.id}" data-title="${task.title}">Cancel</button>
     `;
  }

  // ---------------------------------------------------Testing : ----------------
  else {
    newnode.className = "output-p";
    newnode.innerHTML = `
        <div class="p-div"><p class="c">${task.title}</p></div>
        
         <button class="output-delete" data-id="${task.id}" >Delete</button>
        <button class="output-edit" data-id="${task.id}" data-title="${task.title}">Edit</button>
        <button class="output-done" data-id="${task.id}" data-title="${task.title}">Compeleted</button>
        `;
  }
  container.appendChild(newnode);
}

// ------------------------------------------------------ADD Functions

adddata.addEventListener("click", () => {
  let val = inputfeild.value.trim();
  if (val.length < 1) {
    alert("Task cannot be empty");
    return false;
  }

  let newtask = {
    id: Date.now(),
    title: val,
    completed: false,
    editmode: false,

    // value:true
  };

  output.push(newtask);
  saveTodos(output); // Testing functions of local storage :
  display_render();

  inputfeild.value = "";

  console.log(output);
});

inputfeild.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    adddata.click();
  }
});

// Functions of cancel , save , delete, update , done , used event delegation ------------------

container.addEventListener("click", (event) => {
  const id = parseInt(event.target.dataset.id);
  let taskobj = output.find((task) => task.id === id);

  if (event.target.classList.contains("output-delete")) {
    output = output.filter((task) => task.id !== id);

    saveTodos(output); // Testing functions of local storage :
    display_render();
    console.log(output);
  } else if (event.target.classList.contains("output-edit")) {
    taskobj.editmode = true;
    saveTodos(output);
    display_render();
  } else if (event.target.classList.contains("output-save")) {
    let newtext = event.target.parentElement
      .querySelector(".new-input")
      .value.trim();

    if (newtext < 1) {
      alert("task cannot be empty ");
      return;
    }
    taskobj.title = newtext;
    taskobj.editmode = false;
    saveTodos(output);
    display_render();
  } else if (event.target.classList.contains("output-cancel")) {
    taskobj.editmode = false;
    saveTodos(output);
    display_render();
  }

  // Testing --------------------------------------------
  else if (event.target.classList.contains("output-done")) {
    taskobj.completed = true;
    saveTodos(output);
    display_render();
    
  }

  else if (event.target.classList.contains("output-undone")){
      taskobj.completed= false;
      saveTodos(output)
      display_render()
    }


});

document.addEventListener("DOMContentLoaded", () => {
  output = loadTodos();
  // console.log(loadTodos())

  display_render();
});
















