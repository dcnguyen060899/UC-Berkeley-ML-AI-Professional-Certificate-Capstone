document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".floating-sidebar");
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Sidebar";
    toggleButton.style.position = "fixed";
    toggleButton.style.top = "10px";
    toggleButton.style.left = "10px";
    toggleButton.style.zIndex = "1000"; /* Ensure the button is on top */
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener("click", function () {
        if (sidebar.style.display === "none") {
            sidebar.style.display = "block";
        } else {
            sidebar.style.display = "none";
        }
    });
});
