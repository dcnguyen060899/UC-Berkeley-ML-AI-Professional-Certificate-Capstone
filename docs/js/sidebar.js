document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".floating-sidebar");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Sidebar";
    toggleButton.id = "toggle-button"; // Added ID to style the button
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        if (sidebar.style.display === "none") {
            sidebar.style.display = "block";
        } else {
            sidebar.style.display = "none";
        }
    });
});
