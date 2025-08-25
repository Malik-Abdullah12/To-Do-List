let objectIdCounter = 1;
let output = [];

const container = document.getElementById("todo-container");
const adddata = document.getElementById("add");
const inputfeild = document.getElementById("text1");

adddata.addEventListener("click", () => {
  let val = inputfeild.value.trim();
  if (val.length < 1) {
    alert("Task cannot be empty");
    return false;
  }

  let newtask = {
    id: objectIdCounter,
    title: val,
    // value:true
  };
  objectIdCounter++;

  output.push(newtask);
  //    count++
  //   create()

  let newnode = document.createElement("div");
  // let  newbutton = document.createElement("button");
  //   newbutton.className = "output-delete";
  //   newnode.appendChild(newbutton);
  //   newbutton.innerText = "Delete";

  newnode.className = "output-p";
  //   newnode.id = "c"
  newnode.innerHTML = `
        <div class="p-div"><p class="c">${newtask.title}</p></div>
        
         <button class="output-delete" data-id="${newtask.id}" >Delete</button>
        <button class="output-edit" data-id="${newtask.id}" data-title="${newtask.title}">Edit</button>
        <button class="output-done" data-id="${newtask.id}" data-title="${newtask.title}">Compeleted</button>
        `;
// Testing Done button ---------------
  
container.appendChild(newnode);

  inputfeild.value = "";

  //     newbutton.addEventListener("click", () => {
  //     newnode.remove();

  //     output = output.filter(task => task.id !== newtask.id);
  //     // let cleanarr = output.indexOf(newtask.title);
  //     // if (cleanarr > -1) {
  //     //   output.splice(cleanarr, 1);
  //     // }
  //     console.log("After delete : ",output);

  //   });

  console.log(output);
});

// document.addEventListener("click" , (e) =>{
//     if(e.target.document.getElementById("head")){
//         console.log(`CLicked ${document.getElementById("head")}`)
//     }
// })

container.addEventListener("click", (event) => {
  if (event.target.classList.contains("output-delete")) {
    let valueconverter = parseInt(event.target.dataset.id);

    event.target.parentElement.remove();

    output = output.filter((task) => task.id !== valueconverter);

    console.log(output);
  } else if (event.target.classList.contains("output-edit")) {
    let task1 = parseInt(event.target.dataset.id);
    let parentdiv = event.target.parentElement;

    let maintext = event.target.dataset.title;

    let textdata = parentdiv.querySelector(".c").innerHTML;
    parentdiv.innerHTML = ` 
    <div class="p-div"><p class="c"><input type="text" class="new-input" value="${textdata}" placeholder="Enter task" /></p></div>
    <button class="output-save" data-id="${task1}">Save</button>
    <button class="output-cancel" data-id="${task1}" data-title="${maintext}">Cancel</button>
    `;
    // let  newinput = document.createElement("input");
    // container.appendChild(newinput)
    // let gettingchild = container.children
    // gettingchild.appendChild(newinput)
    // let newval = gettingchild[3]

    // newval.remove(children)
    // console.log(newval)  //.childNodes[1]

    // console.log(`clicked ${event.target}`)
    // console.log(parentdiv)
    // console.log(textcontent)
  } else if (event.target.classList.contains("output-save")) {
    let task2 = parseInt(event.target.dataset.id);
    let parentdiv = event.target.parentElement;

    let textdata2 = parentdiv.querySelector(".new-input").value;

    parentdiv.innerHTML = `
    <div class="p-div"><p class="c">${textdata2}</p></div>
    
    <button class="output-delete" data-id="${task2}">Delete</button>
    <button class="output-edit" data-id="${task2}" data-title="${textdata2}">Edit</button>
    <button class="output-done" data-id="${task2}" data-title="${textdata2}">Compeleted</button>
    `;
    // Testing Done button ---------------

    let taskObj = output.find((task) => task.id === task2);
    if (taskObj) {
      taskObj.title = textdata2;
    }

    console.log(output);
  } else if (event.target.classList.contains("output-cancel")) {
    let task3 = parseInt(event.target.dataset.id);
    let parentdiv = event.target.parentElement;
    
    // let textdata = parentdiv.querySelector(".p-div").innerHTML

    let maintext = event.target.dataset.title;
    
    parentdiv.innerHTML = `
    <div class="p-div"><p class="c">${maintext}</p></div>
    
    <button class="output-delete" data-id="${task3}">Delete</button>
    <button class="output-edit" data-id="${task3}" data-title="${maintext}">Edit</button>
    <button class="output-done" data-id="${task3}" data-title="${maintext}">Compeleted</button>     
    `;
    // Testing done button 
  
    // console.log(textdata)
}

// Testing --------------------------------------------
else if (event.target.classList.contains("output-done")){
    let task4 = parseInt(event.target.dataset.id);
    let parentdiv = event.target.parentElement;
    
    let maintext = event.target.dataset.title;
    // let parentvalue = parentdiv.querySelector("output-p")
    parentdiv.className = "output-new"
    
    parentdiv.innerHTML = `
    <div class="p-div"><p class="d">${maintext} </p></div>
    
    <button class="output-delete" data-id="${task4}">Delete</button>
    `;
  }

});










