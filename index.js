function sendForm() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form); // Collect form data for sending

        fetch("addItem.php", {
            method: "POST",
            body: formData
        });

        form.reset();
    });
}

// NOTE - Use database task_id for task element ids do all unique and accessible in code uniquely

// Function to create task elements on page by fetching from database
    // use ajax to access database (maybe also use php)
    // loop through database and access all incomplete tasks
    // fetch data into JS

// Function to create a task element - inputs task data


// Function to check number of tasks on page --> change form state disabled/not disabled elements if = 10

// Function to allow tasks to be marked complete - remove from page and change in database