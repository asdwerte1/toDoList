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
    const xhhtp = new XMLHttpRequest();
    xhhtp.onload = function () {
        const response = JSON.parse(this.responseText);

        makeTaskBanners(response);
        checkNumberOfTasks();
    }

    xhhtp.open("GET", "getItems.php", true);
    xhhtp.send();
}

function makeTaskBanners(taskArray) {

    const container = document.getElementById("to-do-items");

    // Empty all tasks first to avoid duplication
    container.innerHTML = "";

    for (let index = 0; index < taskArray.length; index++) {

        const taskObject = taskArray[index];

        // Build HTML element for task info and add to container
        const newTask = document.createElement("div");
        const row = document.createElement("div");
        const col1 = document.createElement("div");
        const col2 = document.createElement("div");

        newTask.setAttribute("id", taskObject.id);
        row.setAttribute("class", "row");
        col1.setAttribute("class", "col-sm");
        col2.setAttribute("class", "col-sm");

        newTask.className = "task-container container-sm mt-3 pt-2";

        const newHeader = document.createElement("h2");
        newHeader.setAttribute("class", "kode-mono")
        const newText = document.createElement("p");
        newText.style.color = "black";
        const newPriority = document.createElement("p");
        newPriority.style.fontWeight = "bold";

        const taskTitle = taskObject.title;
        const taskDescription = taskObject.description;
        const taskPriority = taskObject.priority;

        newHeader.innerHTML = taskTitle;
        newText.innerHTML = taskDescription;

        switch (taskPriority) {
            case "l":
                newPriority.innerHTML = "Low";
                newPriority.style.color = "green";
                break;

            case "m":
                newPriority.innerHTML = "Medium";
                newPriority.style.color = "orange";
                break;

            case "h":
                newPriority.innerHTML = "High";
                newPriority.style.color = "red";
                break;

        }

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = "Mark Complete"
        completeBtn.setAttribute("type", "submit");
        completeBtn.setAttribute("class", "btn submit-btn mb-2");
        completeBtn.setAttribute("id", "button" + taskObject.id);
        completeBtn.addEventListener("click", () => removeTask(completeBtn.id));

        col1.appendChild(newText);
        col1.appendChild(newPriority);
        col2.appendChild(completeBtn);
        row.appendChild(col1);
        row.appendChild(col2);
        newTask.appendChild(newHeader);
        newTask.appendChild(row);

        col2.style.textAlign = "end";

        if (index + 1 == taskArray.length) { // Check for last item
            newTask.style.borderBottomLeftRadius = "30px";
            newTask.style.borderBottomRightRadius = "30px";
            newTask.id == "last";
        }

        container.appendChild(newTask);
    }
}

function removeTask(id) {

    const taskId = id.substr(6);
    const formData = new FormData();
    formData.append("id", taskId);

    const task = document.getElementById(taskId);
    const next_task = task.previousElementSibling;

    fetch("markComplete.php", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response not okay");
            }
        })
        .then(data => {
            task.remove();
            checkNumberOfTasks();
        })
        .catch(error => {
            console.error("Error removing task", error);
        });

    next_task.style.borderBottomLeftRadius = "30px";
    next_task.style.borderBottomRightRadius = "30px";
    next_task.id == "last";
}

// Function to check number of tasks on page --> change form state disabled/not disabled elements if = 10

function checkNumberOfTasks() {
    numberOfTasks = document.getElementsByClassName("task-container").length;

    const inputs = document.getElementsByTagName("input");
    const textarea = document.getElementById("description");
    const button = document.getElementById("addTaskBtn");

    if (numberOfTasks >= 10) {
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].setAttribute("disabled", "disabled");
        }
        textarea.setAttribute("disabled", "disabled");
        button.setAttribute("disabled", "disabled");
    } else {
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].removeAttribute("disabled");
        }
        textarea.removeAttribute("disabled");
        button.removeAttribute("disabled");
    }
}
// Add ability to sort tasks in different ways
