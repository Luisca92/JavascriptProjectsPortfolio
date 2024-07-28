// We'll begin by declaring variables that we'll use to interact with our HTML elements.
// In this setup, we’re:
//     Selecting the form, input, and list elements from our HTML using their IDs.
//     Storing these elements in variables for easy access in our JavaScript code.

const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')
const todoList = document.getElementById('todo-list')

// We need to handle the event when a user adds a new task. 
// In this function, we’re:
//     Preventing the default form submission behavior, which refreshes the page.
//     Checking if the input field is empty and alerting the user if it is.
//     Preparing to add the new task (which we will handle in the next steps).
//     Clearing the input field after adding a task.

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const newTask = todoInput.value;

    if (newTask === '') {
        alert('Please enter a task!');
        return;
    }
    todoInput.value = ''; // Clear the input field after adding a task. 
    addTask(newTask)
}) 

// Now, let's write a function that will create and display a new task in the list:
// In this function, we’re:
//     Creating a new <li> element for the task.
//     Setting its text content to the task passed to the function.
//     Appending the new list item to our todo-list element.

// We need to modify our addTask function to include additional features like checkboxes and delete buttons for each task. 
// In this enhanced function, we’re:
//     Creating a span element to hold the task text.
//     Adding a checkbox input to each task to mark it as complete.
//     Including a delete button to remove tasks.

function createCheckbox() {
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    return checkBox;
}

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    return deleteButton;
}

function createEditButton() {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    return editButton;
}

function addTask(task) {
    // Create a new list item element
    const listItem = document.createElement('li');
    // Create a new span element to hold the task text
    const taskText = document.createElement('span');
    // Set the text content of the span to the task text
    taskText.textContent = task;
    // Append the task text span to the list item
    listItem.appendChild(taskText);

    // Create a checkbox element using a helper function createCheckbox()
    const checkBox = createCheckbox();
    // Add an event listener to the checkbox for change events
    checkBox.addEventListener('change', function() {
        // When the checkbox is checked, add a line-through decoration to the task text
        taskText.style.textDecoration = this.checked ? 'line-through' : 'none';
        saveTasksToLocalStorage(); // Save tasks to local storage after checkbox change
    });
    // Append the checkbox to the list item
    listItem.appendChild(checkBox);

    // Create a delete button element using a helper function createDeleteButton()
    const deleteButton = createDeleteButton();
    // Add an event listener to the delete button for click events
    deleteButton.addEventListener('click', function() {
        // When the delete button is clicked, remove the list item from the todo list
        todoList.removeChild(listItem);
        saveTasksToLocalStorage(); // Save tasks to local storage after deletion
    });
    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Declare editButton variable
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';

    // Adding an event listener to the edit button to toggle the editing state
    editButton.addEventListener('click', function() {
        toggleTaskEditState(listItem, taskText, editButton);
        saveTasksToLocalStorage(); // Save tasks to local storage after editing
    });

    // Append the edit button to the list item
    listItem.appendChild(editButton);

    // Append the list item to the todo list
    todoList.appendChild(listItem);

    saveTasksToLocalStorage(); // Save tasks to local storage after adding a new task
}


// We need to handle the task completion functionality. Let’s add an event listener to the checkbox:
// In this section, we’re:
//     Adding an event listener to the checkbox.
//     Using the change event to toggle the text decoration of the task.

checkBox.addEventListener('change', function() {
    if (this.checked) {
        taskText.style.textDecoration = 'line-through';
    } else {
        taskText.style.textDecoration = 'none'
    }
})

// Now, let’s add the functionality to delete tasks:
// In this code block, we’re:
//     Adding an event listener to the delete button.
//     Removing the task from the list when the button is clicked.

deleteButton.addEventListener('click', function(){
    todoList.removeChild(listItem)
})

// Next, let's add the functionality to edit tasks. This involves toggling between viewing and editing states:
// In this function, we're:
//     Checking if the task is in editing mode.
//         If it is, we save the edited task and switch back to view mode.
//         If it's not, we switch to edit mode by replacing the task text with an input field.

function toggleTaskEditState(taskText) {
    const isEditing = taskText.getAttribute('contenteditable') === 'true';

    if (isEditing) {
        taskText.setAttribute('contenteditable', 'false');
    } else {
        taskText.setAttribute('contenteditable', 'true');
        taskText.focus();
    }
}

// Our To-Do List app is shaping up nicely with core functionalities like adding, editing, marking as complete, and deleting tasks. 

// Now, if you feel like stretching yourself, let’s enhance it even further by exploring the possibility of storing tasks
// in the browser’s local storage.

// i. Using Local Storage to Save Tasks
// To enhance user experience, let’s save tasks to the browser’s local storage so they persist even after the browser is closed.

// 1. Saving Tasks to Local Storage:
// Modify your task manipulation functions (add, delete, mark complete, edit) to also update the local storage. 

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(task => {
        const taskText = task.querySelector('span').textContent;
        const isCompleted = task.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
    // Check if there are any tasks saved in local storage
    const savedTasksJSON = localStorage.getItem('tasks');
    if (!savedTasksJSON) {
        console.log('No tasks found in local storage');
        return;
    }

    // Parse the saved tasks from JSON
    const savedTasks = JSON.parse(savedTasksJSON);
    console.log('Tasks retrieved from local storage:', savedTasks);

    // Add each saved task to the list
    savedTasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            const listItems = document.querySelectorAll('#todo-list li');
            listItems.forEach(item => {
                const span = item.querySelector('span');
                if (span.textContent === task.text) {
                    const checkBox = item.querySelector('input[type="checkbox"]');
                    checkBox.checked = true;
                    span.style.textDecoration = 'line-through';
                }
            });
        }
    });
});



