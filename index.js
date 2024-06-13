// TODO - Find a way to remove escape character (\) from text (e.g. from typing a ' into the form)

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taskForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(form);

        // AJAX request using fetch
        fetch('addItem.php', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {

                // Reset the form after successful submission
                form.reset();

                // Call the getTasks method to update list
                getTasks();
            })
            .catch(error => {
                // Handle error
                console.error('Error adding task:', error);
            });
    });
});

// NOTE - Use database task_id for task element ids do all unique and accessible in code uniquely

function getTasks() {
    console.log("FUNCTION CALLED");
    const xhhtp = new XMLHttpRequest();
    xhhtp.onload = function () {
        const response = JSON.parse(this.responseText);

        makeTaskBanners(response);
    }

    xhhtp.open("GET", "getItems.php", true);
    xhhtp.send();
}

function makeTaskBanners(taskArray) {

    console.log("Second function called");
    const container = document.getElementById("to-do-items");

    // Empty all tasks first to avoid duplication
    container.innerHTML = "";

    for (let index = 0; index < taskArray.length; index++) {

        const taskObject = taskArray[index];

        // Build HTML element for task info and add to container
        const newTask = document.createElement("div");

        newTask.setAttribute("id", taskObject.id);

        newTask.className = "task-container container-sm mt-3 pt-2";

        const newHeader = document.createElement("h2");
        const newText = document.createElement("p");
        const newPriority = document.createElement("p");

        const taskTitle = taskObject.title;
        const taskDescription = taskObject.description;
        const taskPriority = taskObject.priority;

        newHeader.innerHTML = taskTitle;
        newText.innerHTML = taskDescription;

        switch (taskPriority) {
            case "l":
                newPriority.innerHTML = "Low";
                break;
        
            case "m":
                newPriority.innerHTML = "Medium";
                break;

            case "h":
                newPriority.innerHTML = "High";
                break;
                
        }

        newTask.appendChild(newHeader);
        newTask.appendChild(newText);
        newTask.appendChild(newPriority);

        if (index + 1 == taskArray.length) {
            newTask.style.borderBottomLeftRadius = "30px";
            newTask.style.borderBottomRightRadius = "30px";
        }

        container.appendChild(newTask);
    }
}

// Function to check number of tasks on page --> change form state disabled/not disabled elements if = 10

// Function to allow tasks to be marked complete - remove from page and change in database

// Add ability to sort tasks in different ways