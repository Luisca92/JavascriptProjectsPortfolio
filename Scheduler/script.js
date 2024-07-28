const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", () => {
    const task = taskInput.value;
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    if (task.trim() === "" || deadline === "") {
        alert("Please select an upcoming date for the deadline.")
        return; // Don't add task if task or deadline is empty.
    }
    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select an upcoming date for the deadline.");
        return; // Don't add task if deadline not in the future! 
    }
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.style.border = "2px solid #ed80b0"; // Set border color to ed80b0
    taskItem.style.backgroundColor = "#fff"; // Set initial background color to white
    taskItem.style.margin = "0"; // Remove default margin
    taskItem.style.position = "relative"; // Set position to relative
    taskItem.innerHTML = `
    <button class="remove-task">X</button>
    <p>${task}</p>
    <p>Priority: ${priority}</p>
    <p>Deadline: ${deadline}</p>
    <button class="mark-done">Mark Done</button>
    `;
    taskList.appendChild(taskItem);

    taskInput.value = "";
    priorityInput.value = "Top";
    deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "black";
        taskItem.style.color = "white";
        event.target.textContent = "Completed";
        event.target.classList.remove("mark-done");
        event.target.classList.add("done");

        // Cross out task priority and deadline
        const taskPriority = taskItem.querySelector("p:nth-of-type(2)");
        const taskDeadline = taskItem.querySelector("p:nth-of-type(3)");
        taskPriority.style.textDecoration = "line-through";
        taskDeadline.style.textDecoration = "line-through";
    } else if (event.target.classList.contains("done")) {
        const taskItem = event.target.parentElement;
        taskItem.style.backgroundColor = "#fff";
        taskItem.style.color = "black";
        event.target.textContent = "Mark Done";
        event.target.classList.remove("done");
        event.target.classList.add("mark-done");

        // Remove text decoration
        const taskPriority = taskItem.querySelector("p:nth-of-type(2)");
        const taskDeadline = taskItem.querySelector("p:nth-of-type(3)");
        taskPriority.style.textDecoration = "none";
        taskDeadline.style.textDecoration = "none";
    } else if (event.target.classList.contains("remove-task")) {
        const taskItem = event.target.parentElement;
        taskItem.remove(); // Remove the task item from the DOM
    }
});
