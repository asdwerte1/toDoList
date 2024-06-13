document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('taskForm');

    form.addEventListener('submit', function(event) {
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
    xhhtp.onload = function() {
        const response = JSON.parse(this.response);
        console.log(response);
    }

    xhhtp.open("GET", "getItems.php", true);
    xhhtp.send();
}

//function init() {
    // Used to call two above functions on the page loading event

//}
/*
function sendFormData(event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch("addItem.php", {
        method: "POST",
        body: formData
    });
}*/
// Function to create a task element - inputs task data


// Function to check number of tasks on page --> change form state disabled/not disabled elements if = 10

// Function to allow tasks to be marked complete - remove from page and change in database