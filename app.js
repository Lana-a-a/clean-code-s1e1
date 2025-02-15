// Get DOM elements for task management
var taskInput=document.getElementById("new-task"); // Input for adding new task
var addButton=document.getElementsByTagName("button")[0]; // First button to add a task
var incompleteTaskHolder=document.getElementById("incomplete-tasks");// List for incomplete tasks
var completedTasksHolder=document.getElementById("completed-tasks");// List for completed tasks


// Create a new task list item with the provided task string
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    // Create and configure task elements
    var checkBox=document.createElement("input");
    var label=document.createElement("label");
    var editInput=document.createElement("input");
    var editButton=document.createElement("button");
    var deleteButton=document.createElement("button");
    var deleteButtonImg=document.createElement("img");


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
var addTask=function(){
    if (!taskInput.value) return; // Prevent adding empty tasks

    var listItem=createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);  // Add task to incomplete tasks list
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value=""; // Clear input field after adding the task

}

// Edit an existing task (toggle between Edit/Save mode)
var editTask=function(){
    var listItem=this.parentNode;
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".edit");
    var containsClass=listItem.classList.contains("editMode");

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
var deleteTask=function(){
    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    ul.removeChild(listItem); // Remove task from list

}


// Mark a task as completed
var taskCompleted=function(){
    console.log("Complete Task...");

    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem); // Move task back to incomplete list
    bindTaskEvents(listItem,taskCompleted); // Re-bind events for task to be marked completed
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);



var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector("button.edit");
    var deleteButton=taskListItem.querySelector("button.delete");


    // Attach event handlers to buttons
    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

// Initialize events for tasks in incomplete tasks list
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}






