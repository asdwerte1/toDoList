function setUpFormSend() {
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.querySelector("form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form); // Collect form data for sending

            fetch("addItem.php", {
                method: "POST",
                body: formData
            });
        });
    });
}