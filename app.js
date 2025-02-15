// Get DOM elements for task management
const taskInput=document.getElementById("new-task"); // Input for adding new task
const addButton=document.getElementsByTagName("button")[0]; // First button to add a task
const incompleteTaskHolder=document.getElementById("incomplete-tasks");// List for incomplete tasks
const completedTasksHolder=document.getElementById("completed-tasks");// List for completed tasks


// Create a new task list item with the provided task string
const createNewTaskElement=function(taskString){

    const listItem=document.createElement("li");

    // Create and configure task elements
    const checkBox=document.createElement("input");
    const label=document.createElement("label");
    const editInput=document.createElement("input");
    const editButton=document.createElement("button");
    const deleteButton=document.createElement("button");
    const deleteButtonImg=document.createElement("img");


    label.innerText=taskString; // Set task label text
    label.className='task';

    // Set properties for each element
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.className="task";
    editButton.innerText="Edit"; 
    editButton.className="edit";
    deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';


    // Append elements to the list item
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    deleteButton.appendChild(deleteButtonImg);

    return listItem;
}



// Add a new task to the incomplete tasks list
const addTask=function(){
    if (!taskInput.value) return; // Prevent adding empty tasks

    const listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);  // Add task to incomplete tasks list
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value=""; // Clear input field after adding the task

}

// Edit an existing task (toggle between Edit/Save mode)
const editTask=function(){
    const listItem=this.parentNode;
    const editInput=listItem.querySelector('input[type=text]');
    const label=listItem.querySelector("label");
    const editBtn=listItem.querySelector(".edit");
    const containsClass=listItem.classList.contains("editMode");

    // Switch between Edit and Save
    if(containsClass){
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    listItem.classList.toggle("editMode");
};


// Delete a task from the list
const deleteTask=function(){
    const listItem=this.parentNode;
    const ul=listItem.parentNode;
    ul.removeChild(listItem); // Remove task from list

}


// Mark a task as completed
const taskCompleted=function(){
    console.log("Complete Task...");

    const listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


const taskIncomplete=function(){
    const listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem); // Move task back to incomplete list
    bindTaskEvents(listItem,taskCompleted); // Re-bind events for task to be marked completed
}



const ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);



const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    const checkBox=taskListItem.querySelector("input[type=checkbox]");
    const editButton=taskListItem.querySelector("button.edit");
    const deleteButton=taskListItem.querySelector("button.delete");


    // Attach event handlers to buttons
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

// Initialize events for tasks in incomplete tasks list
for (const i=0; i<incompleteTaskHolder.children.length;i++){

    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}






