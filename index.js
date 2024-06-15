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
        completeBtn.setAttribute("id", "button"+taskObject.id);
        completeBtn.addEventListener("click", () => removeTask(completeBtn.id));

        col1.appendChild(newText);
        col1.appendChild(newPriority);
        col2.appendChild(completeBtn);
        row.appendChild(col1);
        row.appendChild(col2);
        newTask.appendChild(newHeader);
        newTask.appendChild(row);

        col2.style.textAlign = "end";

        if (index + 1 == taskArray.length) {
            newTask.style.borderBottomLeftRadius = "30px";
            newTask.style.borderBottomRightRadius = "30px";
        }

        container.appendChild(newTask);
    }
}

function removeTask(id) {
    console.log("HERE");
    console.log(id);
}

// Function to check number of tasks on page --> change form state disabled/not disabled elements if = 10

// Function to allow tasks to be marked complete - remove from page and change in database

// Add ability to sort tasks in different ways